import { serve } from "https://deno.land/std@0.224.0/http/server.ts"

const PSI_BASE = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const SOCIAL_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: 'Instagram', pattern: /instagram\.com/i },
  { name: 'LinkedIn',  pattern: /linkedin\.com/i },
  { name: 'Facebook',  pattern: /facebook\.com/i },
  { name: 'Twitter',   pattern: /twitter\.com|x\.com/i },
  { name: 'YouTube',   pattern: /youtube\.com/i },
  { name: 'TikTok',    pattern: /tiktok\.com/i },
  { name: 'WhatsApp',  pattern: /whatsapp\.com|wa\.me/i },
  { name: 'Telegram',  pattern: /t\.me\//i },
]

const SCHEMA_REQUIRED: Record<string, string[]> = {
  LocalBusiness:  ["name", "address", "telephone"],
  Organization:   ["name", "url"],
  WebSite:        ["name", "url"],
  Article:        ["headline", "author", "datePublished"],
  BlogPosting:    ["headline", "author", "datePublished"],
  Product:        ["name", "offers"],
  FAQPage:        ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  HowTo:          ["name", "step"],
}

const SEO_RECOMMENDED_SCHEMAS = ["BreadcrumbList", "Organization", "WebSite", "FAQPage"]

const BOT_UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  })
}

async function fetchHtml(url: string, timeoutMs: number): Promise<{ html: string; finalUrl: string; ok: boolean }> {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": BOT_UA, "Accept": "text/html" },
      redirect: "follow",
    })
    clearTimeout(tid)
    return { html: await res.text(), finalUrl: res.url, ok: res.ok }
  } catch {
    clearTimeout(tid)
    return { html: "", finalUrl: url, ok: false }
  }
}

async function handleRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders })
  if (req.method !== "POST") return jsonResponse({ error: "Only POST allowed" }, 405)

  try {
    const body = await req.json()
    const { url, strategy, fetchSocial, checkLinks, validateSchema, checkSecurityHeaders, maxLinks } = body

    // ── Modo: health check PSI (sin url) ──────────────────────────────────
    if (body.checkPSIHealth) {
      const PSI_KEY_CHECK = Deno.env.get("GOOGLE_PSI_KEY")
      if (!PSI_KEY_CHECK) return jsonResponse({ ok: false, reason: "GOOGLE_PSI_KEY no configurada en Supabase → Settings → Secrets" })
      const ctrl = new AbortController()
      const tid  = setTimeout(() => ctrl.abort(), 10000)
      try {
        const testUrl = `${PSI_BASE}?url=https%3A%2F%2Fwww.google.com&strategy=mobile&key=${PSI_KEY_CHECK}&category=performance`
        const res = await fetch(testUrl, { signal: ctrl.signal })
        clearTimeout(tid)
        if (res.ok) return jsonResponse({ ok: true })
        const err = await res.json().catch(() => ({}))
        const msg = (err as Record<string, Record<string, string>>)?.error?.message || `PSI error ${res.status}`
        return jsonResponse({ ok: false, reason: msg, status: res.status })
      } catch (e) {
        clearTimeout(tid)
        const isAbort = e instanceof Error && e.name === "AbortError"
        return jsonResponse({ ok: false, reason: isAbort ? "PSI API sin respuesta en 10s (posible bloqueo de red desde Supabase)" : String(e) })
      }
    }

    if (!url) return jsonResponse({ error: "Missing url" }, 400)

    // ── Modo: redes sociales ──────────────────────────────────────────────
    if (fetchSocial) {
      const { html } = await fetchHtml(url, 10000)
      const found: Record<string, boolean> = {}
      SOCIAL_PATTERNS.forEach(p => { if (p.pattern.test(html)) found[p.name] = true })
      return jsonResponse({ social: found })
    }

    // ── Modo: link checker ────────────────────────────────────────────────
    if (checkLinks) {
      const { html } = await fetchHtml(url, 15000)
      const baseUrl = new URL(url)
      const hrefRegex = /href=["']([^"'#]+)["']/gi
      const hrefs: string[] = []
      let m: RegExpExecArray | null
      while ((m = hrefRegex.exec(html)) !== null) {
        try {
          const abs = new URL(m[1], baseUrl).toString()
          if (abs.startsWith("http")) hrefs.push(abs)
        } catch { /* invalid url */ }
      }
      const unique = [...new Set(hrefs)].slice(0, maxLinks ?? 50)

      const checks = await Promise.allSettled(unique.map(async (linkUrl) => {
        const ctrl = new AbortController()
        const tid = setTimeout(() => ctrl.abort(), 8000)
        try {
          const res = await fetch(linkUrl, {
            method: "HEAD",
            signal: ctrl.signal,
            headers: { "User-Agent": BOT_UA },
            redirect: "follow",
          })
          clearTimeout(tid)
          return { url: linkUrl, status: res.status, finalUrl: res.url }
        } catch {
          clearTimeout(tid)
          return { url: linkUrl, status: 0, finalUrl: linkUrl }
        }
      }))

      const broken: string[] = [], redirects: string[] = [], ok: string[] = []
      checks.forEach((r, i) => {
        if (r.status !== "fulfilled") { broken.push(`${unique[i]} → error`); return }
        const { url: lu, status, finalUrl } = r.value
        if (status >= 400 || status === 0) broken.push(`${lu} → ${status || "timeout"}`)
        else if (status >= 300 && finalUrl !== lu) redirects.push(`${lu} → ${finalUrl}`)
        else ok.push(lu)
      })

      return jsonResponse({
        totalAnalyzed: unique.length,
        summary: { broken: broken.length, redirects: redirects.length, ok: ok.length },
        score: Math.round((ok.length / (unique.length || 1)) * 100),
        broken,
        redirects,
      })
    }

    // ── Modo: schema validator ────────────────────────────────────────────
    if (validateSchema) {
      const { html, ok } = await fetchHtml(url, 15000)
      if (!ok && !html) return jsonResponse({ error: "No se pudo acceder a la URL" }, 502)

      const schemaRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      const schemas: Record<string, unknown>[] = []
      const parseErrors: string[] = []
      let sm: RegExpExecArray | null, idx = 0
      while ((sm = schemaRegex.exec(html)) !== null) {
        try {
          const parsed = JSON.parse(sm[1].trim())
          const items = Array.isArray(parsed) ? parsed : [parsed]
          items.forEach(item => schemas.push(item as Record<string, unknown>))
        } catch { parseErrors.push(`Script JSON-LD #${++idx}: JSON inválido`) }
      }

      const analyzed = schemas.map(s => {
        const type = String(s["@type"] ?? "unknown")
        const required = SCHEMA_REQUIRED[type] ?? []
        const missing = required.filter(f => !s[f])
        return { type, hasContext: !!s["@context"], fields: Object.keys(s).filter(k => !k.startsWith("@")), missingRequired: missing, valid: missing.length === 0 && !!s["@context"] }
      })

      const typesFound = analyzed.map(s => s.type)
      const missingSeoRecommended = SEO_RECOMMENDED_SCHEMAS.filter(t => !typesFound.includes(t))
      const warnings = analyzed.filter(s => s.missingRequired.length > 0).map(s => `${s.type}: faltan ${s.missingRequired.join(", ")}`)

      return jsonResponse({
        totalSchemas: schemas.length,
        typesFound,
        schemas: analyzed,
        parseErrors,
        warnings,
        missingSeoRecommended,
        richResultsEligible: {
          breadcrumbs: typesFound.includes("BreadcrumbList"),
          faq: typesFound.includes("FAQPage"),
          howTo: typesFound.includes("HowTo"),
          article: typesFound.some(t => ["Article","BlogPosting","NewsArticle"].includes(t)),
          product: typesFound.includes("Product"),
        },
      })
    }

    // ── Modo: security headers ────────────────────────────────────────────
    if (checkSecurityHeaders) {
      let resHeaders: Headers
      let resUrl = url

      // Try HEAD first; fall back to GET if HEAD is blocked (405 / network error)
      const attempt = async (method: "HEAD" | "GET") => {
        const ctrl = new AbortController()
        const tid = setTimeout(() => ctrl.abort(), 15000)
        const r = await fetch(url, { method, signal: ctrl.signal, headers: { "User-Agent": BOT_UA }, redirect: "follow" })
        clearTimeout(tid)
        return r
      }

      try {
        const r = await attempt("HEAD")
        resHeaders = r.headers
        resUrl = r.url
      } catch {
        try {
          const r = await attempt("GET")
          resHeaders = r.headers
          resUrl = r.url
        } catch {
          return jsonResponse({ error: "No se pudo obtener cabeceras HTTP" }, 502)
        }
      }

      const h = (name: string) => resHeaders.get(name)
      const hsts = h("strict-transport-security")
      const csp  = h("content-security-policy")
      const xfo  = h("x-frame-options")
      const xcto = h("x-content-type-options")
      const rp   = h("referrer-policy")
      const pp   = h("permissions-policy")
      const cc   = h("cache-control")

      const headers: Record<string, { present: boolean; value: string | null; status: string; recommendation?: string }> = {
        "Strict-Transport-Security": { present: !!hsts, value: hsts, status: hsts ? "ok" : "crit", recommendation: !hsts ? "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload" : undefined },
        "Content-Security-Policy":   { present: !!csp,  value: csp ? "✓ configurado" : null, status: csp ? "ok" : "warn", recommendation: !csp ? "Implementar CSP para protección XSS" : undefined },
        "X-Frame-Options":           { present: !!xfo,  value: xfo, status: xfo ? "ok" : "warn", recommendation: !xfo ? "X-Frame-Options: SAMEORIGIN" : undefined },
        "X-Content-Type-Options":    { present: !!xcto, value: xcto, status: xcto === "nosniff" ? "ok" : "warn", recommendation: xcto !== "nosniff" ? "X-Content-Type-Options: nosniff" : undefined },
        "Referrer-Policy":           { present: !!rp,   value: rp, status: rp ? "ok" : "warn", recommendation: !rp ? "Referrer-Policy: strict-origin-when-cross-origin" : undefined },
        "Permissions-Policy":        { present: !!pp,   value: pp ? "✓ configurado" : null, status: pp ? "ok" : "warn", recommendation: !pp ? "Limitar acceso a APIs sensibles del navegador" : undefined },
        "Cache-Control":             { present: !!cc,   value: cc, status: cc ? "ok" : "warn", recommendation: !cc ? "Añadir Cache-Control con max-age para recursos estáticos" : undefined },
      }

      const vals = Object.values(headers)
      const okCount = vals.filter(v => v.status === "ok").length
      const critCount = vals.filter(v => v.status === "crit").length
      const score = Math.round((okCount / vals.length) * 100)

      return jsonResponse({
        isHttps: resUrl.startsWith("https://"),
        score,
        summary: { ok: okCount, warn: vals.filter(v => v.status === "warn").length, crit: critCount },
        headers,
        recommendations: vals.filter(v => v.recommendation).map(v => v.recommendation),
        verdict: score >= 80 ? "ok" : score >= 50 ? "warn" : "crit",
      })
    }

    // ── Modo: SEO Local / GBP / Map Pack ─────────────────────────────────
    if (body.checkLocalSEO) {
      const { businessName, location, keyword } = body as Record<string, string>

      const { html, ok: htmlOk } = await fetchHtml(url, 15000)

      // ── Extraer LocalBusiness schema ──────────────────────────────────
      const schemaRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      const LOCAL_TYPES = ["LocalBusiness","Restaurant","Hotel","Store","MedicalBusiness",
        "LegalService","HealthAndBeautyBusiness","FoodEstablishment","Dentist","Physician",
        "RealEstateAgent","AutoDealer","HomeAndConstructionBusiness","ProfessionalService"]
      let lbs: Record<string, unknown> | null = null
      let sm2: RegExpExecArray | null
      while ((sm2 = schemaRegex.exec(html)) !== null) {
        try {
          const parsed = JSON.parse(sm2[1].trim())
          const items  = Array.isArray(parsed) ? parsed : [parsed]
          for (const item of items) {
            const t = String((item as Record<string, unknown>)["@type"] ?? "")
            if (LOCAL_TYPES.some(lt => t.includes(lt))) { lbs = item as Record<string, unknown>; break }
          }
          if (lbs) break
        } catch { /* skip */ }
      }

      // ── NAP desde schema ──────────────────────────────────────────────
      let napName    = lbs?.["name"]      as string | null ?? null
      let napPhone   = (lbs?.["telephone"] ?? lbs?.["phone"]) as string | null ?? null
      let napUrl     = lbs?.["url"]       as string | null ?? null
      let napAddress: string | null = null
      const addr = lbs?.["address"] as Record<string, unknown> | null
      if (addr) {
        const parts = [addr["streetAddress"], addr["addressLocality"],
                       addr["addressRegion"],  addr["postalCode"]].filter(Boolean)
        napAddress = parts.join(", ")
      } else if (typeof lbs?.["address"] === "string") {
        napAddress = lbs["address"] as string
      }

      // ── Extraer teléfono del HTML si no está en schema ────────────────
      if (!napPhone && html) {
        const pMatch = html.match(/(?:tel:|tel\s*:\s*|tlf\.?\s*:?\s*|teléfono\s*:?\s*|phone\s*:?\s*)([+\d][\d\s\-().]{6,18}\d)/i)
        if (pMatch) napPhone = pMatch[1].replace(/\s+/g, " ").trim()
      }

      // ── Señales de presencia local en HTML ────────────────────────────
      const hasMapsEmbed  = /google\.com\/maps\/embed/i.test(html)
      const hasMapsLink   = /(?:maps\.google\.com|goo\.gl\/maps|g\.page|maps\.app\.goo\.gl)/i.test(html)
      const hasGBPWidget  = /place\.google\.com|google\.com\/maps\/place/i.test(html)
      const hasWaze       = /waze\.com\/ul|waze\.com\/livemap/i.test(html)
      const hasTripAdv    = /tripadvisor\./i.test(html)
      const hasYelp       = /yelp\.com\//i.test(html)
      const hasFoursquare = /foursquare\.com\//i.test(html)

      // ── AggregateRating ───────────────────────────────────────────────
      const ratSchema = lbs?.["aggregateRating"] as Record<string, unknown> | null ?? null
      const ratingVal   = ratSchema ? Number(ratSchema["ratingValue"]) : null
      const reviewCount = ratSchema ? Number(ratSchema["reviewCount"] ?? ratSchema["ratingCount"]) : null

      // ── openingHours ──────────────────────────────────────────────────
      const hasHours = !!(lbs?.["openingHours"] || lbs?.["openingHoursSpecification"])

      // ── Geo coordinates ───────────────────────────────────────────────
      const geo = lbs?.["geo"] as Record<string, unknown> | null ?? null
      const hasGeo = !!(geo?.["latitude"] && geo?.["longitude"])

      // ── Checklist items ───────────────────────────────────────────────
      const checklist = [
        { id: "schema-localbusiness", label: "Schema LocalBusiness JSON-LD",     status: lbs       ? "ok" : "crit", note: lbs ? `Tipo: ${lbs["@type"]}` : "No encontrado — crítico para SEO local" },
        { id: "nap-name",             label: "Nombre del negocio (NAP)",          status: napName   ? "ok" : "warn", note: napName || "No encontrado en schema" },
        { id: "nap-address",          label: "Dirección completa (NAP)",          status: napAddress ? "ok" : "crit", note: napAddress || "Sin dirección estructurada — afecta visibilidad local" },
        { id: "nap-phone",            label: "Teléfono (NAP)",                    status: napPhone  ? "ok" : "warn", note: napPhone || "No detectado en página ni en schema" },
        { id: "geo-coords",           label: "Coordenadas geo (latitude/longitude)", status: hasGeo  ? "ok" : "warn", note: hasGeo ? `lat: ${geo!["latitude"]}, lng: ${geo!["longitude"]}` : "Añade geo.latitude y geo.longitude al schema" },
        { id: "opening-hours",        label: "Horarios de apertura en schema",    status: hasHours  ? "ok" : "warn", note: hasHours ? "Horarios presentes" : "Sin openingHours — impacto en Knowledge Panel" },
        { id: "aggregate-rating",     label: "AggregateRating (Rich Snippet ⭐)", status: ratSchema ? "ok" : "warn", note: ratSchema ? `★ ${ratingVal} · ${reviewCount} reseñas` : "Sin rating → sin estrellas en SERP" },
        { id: "maps-embed",           label: "Google Maps embebido en página",    status: hasMapsEmbed ? "ok" : "warn",  note: hasMapsEmbed ? "Mapa embebido detectado" : "Embebe el mapa para mejor engagement local" },
        { id: "maps-link",            label: "Enlace a Google Business Profile",  status: (hasMapsLink || hasGBPWidget) ? "ok" : "warn", note: (hasMapsLink || hasGBPWidget) ? "Enlace a Maps/GBP detectado" : "Añade enlace al perfil GBP" },
        { id: "directorios",          label: "Presencia en directorios locales",  status: (hasTripAdv || hasYelp || hasFoursquare) ? "ok" : "warn", note: [hasTripAdv && "TripAdvisor", hasYelp && "Yelp", hasFoursquare && "Foursquare", hasWaze && "Waze"].filter(Boolean).join(", ") || "Sin menciones de directorios detectadas" },
      ]

      const okCount = checklist.filter(i => i.status === "ok").length
      const napScore = Math.round(([!!napName, !!napAddress, !!napPhone, !!napUrl].filter(Boolean).length / 4) * 100)
      const score    = Math.round((okCount / checklist.length) * 100)

      // ── SerpAPI: Map Pack ─────────────────────────────────────────────
      const SERP_KEY = Deno.env.get("SERPAPI_KEY")
      let mapPack: {
        available: boolean; serpApiEnabled: boolean; query?: string; position: number | null
        isInTopThree: boolean; totalResults: number
        results: Array<{ position: number; title: string; rating: number | null; reviews: number
          address: string; phone: string; website: string; category: string; isTarget: boolean; thumbnail?: string }>
      } = { available: false, serpApiEnabled: !!SERP_KEY, position: null, isInTopThree: false, totalResults: 0, results: [] }

      if (SERP_KEY && location) {
        try {
          const q     = keyword || businessName || napName || ""
          const serpQ = `https://serpapi.com/search.json?engine=google_local&q=${encodeURIComponent(q)}&location=${encodeURIComponent(location)}&api_key=${SERP_KEY}&hl=es&gl=es&num=20`
          const ctrl2 = new AbortController()
          const tid2  = setTimeout(() => ctrl2.abort(), 20000)
          const sRes  = await fetch(serpQ, { signal: ctrl2.signal })
          clearTimeout(tid2)
          if (sRes.ok) {
            const sData = await sRes.json() as Record<string, unknown>
            const localResults = (sData["local_results"] || []) as Record<string, unknown>[]
            const targetDomain = (() => { try { return new URL(url).hostname.replace("www.", "") } catch { return "" } })()

            const results = localResults.slice(0, 10).map((r, i) => {
              const rWebsite = String(r["website"] ?? "")
              const isTarget = rWebsite
                ? rWebsite.includes(targetDomain)
                : (businessName || napName || "")
                    ? String(r["title"] ?? "").toLowerCase().includes(
                        (businessName || napName || "").toLowerCase().slice(0, 8))
                    : false
              return {
                position: i + 1,
                title:    String(r["title"]   ?? ""),
                rating:   r["rating"]   ? Number(r["rating"])  : null,
                reviews:  r["reviews"]  ? Number(r["reviews"]) : 0,
                address:  String(r["address"] ?? ""),
                phone:    String(r["phone"]   ?? ""),
                website:  rWebsite,
                category: String(r["type"]    ?? ""),
                thumbnail: r["thumbnail"] as string | undefined,
                isTarget,
              }
            })

            const targetResult = results.find(r => r.isTarget)
            mapPack = {
              available: true, serpApiEnabled: true, query: q,
              position:      targetResult?.position ?? null,
              isInTopThree:  targetResult ? targetResult.position <= 3 : false,
              totalResults:  localResults.length,
              results,
            }
          }
        } catch { /* serpapi timeout / error → continue sin map pack */ }
      }

      // ── Recomendaciones ───────────────────────────────────────────────
      const recs: string[] = []
      if (!lbs)          recs.push("CRÍTICO: Implementa schema LocalBusiness con name, address, telephone, geo, openingHours y aggregateRating")
      else {
        if (!napAddress)  recs.push("Añade address completa al schema: streetAddress, addressLocality, addressRegion, postalCode, addressCountry")
        if (!hasGeo)      recs.push("Añade geo.latitude y geo.longitude al schema para mejor relevancia geográfica")
        if (!hasHours)    recs.push("Incluye openingHours o openingHoursSpecification para aparecer en el Knowledge Panel con horarios")
        if (!ratSchema)   recs.push("Implementa AggregateRating en el schema para mostrar estrellas (Rich Snippet) en los resultados orgánicos")
      }
      if (!hasMapsEmbed)          recs.push("Embebe Google Maps en la página de contacto/inicio — mejora engagement y señal de relevancia local")
      if (!hasMapsLink && !hasGBPWidget) recs.push("Añade enlace directo a tu perfil de Google Business Profile para coherencia de señales NAP")
      if (!napPhone)              recs.push("Muestra el teléfono visible en la página y en el schema para aumentar CTR en búsquedas locales")
      if (mapPack.available && !mapPack.isInTopThree)
        recs.push(`Posición ${mapPack.position ?? "?"} en Local Pack — prioriza completitud del perfil GBP, solicita reseñas y añade fotos`)
      if (!hasTripAdv && !hasYelp) recs.push("Registra el negocio en TripAdvisor, Yelp, Foursquare y Páginas Amarillas para fortalecer citas NAP")

      return jsonResponse({
        mode:           SERP_KEY && location ? "serpapi" : "html-extraction",
        serpApiEnabled: !!SERP_KEY,
        businessInfo:   { name: napName, address: napAddress, phone: napPhone, website: napUrl, category: lbs?.["@type"] as string ?? null, rating: ratingVal, reviewCount },
        napConsistency: { nameFound: !!napName, addressFound: !!napAddress, phoneFound: !!napPhone, websiteFound: !!napUrl, score: napScore },
        mapPack,
        schema:         { hasLocalBusiness: !!lbs, type: lbs?.["@type"] as string ?? null, hasGeo, hasHours, hasRating: !!ratSchema },
        checklist,
        score,
        recommendations: recs,
      })
    }

    // ── Modo: análisis PSI ────────────────────────────────────────────────
    if (!strategy) return jsonResponse({ error: "Missing strategy" }, 400)

    const PSI_KEY = Deno.env.get("GOOGLE_PSI_KEY")
    if (!PSI_KEY) return jsonResponse({ error: "Server misconfigured: missing API key" }, 500)

    const params = new URLSearchParams()
    params.append("url", url)
    params.append("strategy", strategy)
    params.append("key", PSI_KEY)
    params.append("category", "performance")
    params.append("category", "seo")
    params.append("category", "accessibility")
    params.append("category", "best-practices")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 45000)
    let response: Response
    try {
      response = await fetch(`${PSI_BASE}?${params.toString()}`, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      })
    } catch (fetchErr) {
      clearTimeout(timeoutId)
      const isAbort = fetchErr instanceof Error && fetchErr.name === "AbortError"
      return jsonResponse({ error: isAbort ? "Timeout PSI (45s): la URL analizada tarda demasiado en cargar. Intenta con otra URL o reintenta." : `Error de red: ${fetchErr instanceof Error ? fetchErr.message : "desconocido"}` }, 500)
    }
    clearTimeout(timeoutId)

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      const msg = (err as Record<string, Record<string, string>>)?.error?.message || `PSI API error ${response.status}`
      return jsonResponse({ error: msg, psiStatus: response.status }, response.status >= 500 ? 502 : 400)
    }

    return jsonResponse(await response.json())

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return jsonResponse({ error: message }, 500)
  }
}

serve(handleRequest)
