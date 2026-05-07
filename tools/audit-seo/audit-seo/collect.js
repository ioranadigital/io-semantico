/**
 * collect.js — Recopila datos SEO usando crawl-mcp y puppeteer-mcp
 * y genera el informe Markdown automáticamente.
 *
 * Uso:
 *   node collect.js <url> [nombre-cliente] [--urls url1,url2,url3]
 *
 * Ejemplos:
 *   node collect.js https://www.ejemplo.com
 *   node collect.js https://www.ejemplo.com "Mi Cliente"
 *   node collect.js https://www.ejemplo.com "Mi Cliente" --urls /,/productos,/contacto
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Argumentos ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (!args[0]) {
  console.error("Uso: node collect.js <url> [nombre-cliente] [--urls /,/productos,/contacto]");
  process.exit(1);
}

const baseUrl = args[0].replace(/\/$/, "");
const clienteName = args[1] && !args[1].startsWith("--") ? args[1] : new URL(baseUrl).hostname;
const extraUrlsIdx = args.indexOf("--urls");
const extraPaths = extraUrlsIdx !== -1
  ? args[extraUrlsIdx + 1].split(",").map(p => p.startsWith("http") ? p : baseUrl + p)
  : [];

const today = new Date().toISOString().slice(0, 10);

// ── Helper: conectar a un MCP server via stdio ─────────────────────────────

async function connectMcp(command, args) {
  const transport = new StdioClientTransport({ command, args });
  const client = new Client({ name: "audit-seo", version: "1.0.0" });
  await client.connect(transport);
  return client;
}

async function callTool(client, toolName, params) {
  const result = await client.callTool({ name: toolName, arguments: params });
  const text = result.content?.find(c => c.type === "text")?.text ?? "{}";
  try { return JSON.parse(text); } catch { return text; }
}

// ── Helpers de formato ────────────────────────────────────────────────────────

function status(val, good, warn) {
  if (val === null || val === undefined) return "—";
  return val <= good ? "✅ Bueno" : val <= warn ? "⚠️ Mejorable" : "❌ Crítico";
}

function msToSec(ms) {
  return ms ? `${(ms / 1000).toFixed(1)}s` : "n/a";
}

function scoreFrom(value, goodThreshold, badThreshold, invert = false) {
  if (value === null || value === undefined) return 50;
  const norm = invert
    ? Math.max(0, Math.min(100, 100 - ((value - goodThreshold) / (badThreshold - goodThreshold)) * 100))
    : Math.max(0, Math.min(100, 100 - ((value - goodThreshold) / (badThreshold - goodThreshold)) * 100));
  return Math.round(norm);
}

// ── Recopilación con crawl-mcp ────────────────────────────────────────────────

async function runCrawl(siteUrl, extraUrls) {
  console.log("  Conectando a crawl-mcp...");
  const MCP_CRAWL = process.env.MCP_CRAWL_PATH ?? "E:\\mcp\\crawl-mcp\\dist\\index.js";
  const client = await connectMcp("node", [MCP_CRAWL]);

  console.log(`  Crawleando ${siteUrl} ...`);
  const crawl = await callTool(client, "crawl_site", { startUrl: siteUrl, maxPages: 30, maxDepth: 3 });

  // Auditar URLs extra si se especificaron
  const extraAudits = [];
  for (const url of extraUrls) {
    if (!crawl.pages?.find(p => p.url === url)) {
      console.log(`  Auditando URL extra: ${url}`);
      const audit = await callTool(client, "audit_url", { url });
      extraAudits.push(audit);
    }
  }

  await client.close();
  return { crawl, extraAudits };
}

// ── Recopilación con puppeteer-mcp ────────────────────────────────────────────

async function runPerformance(urls) {
  console.log("  Conectando a puppeteer-mcp...");
  const MCP_PUPPETEER = process.env.MCP_PUPPETEER_PATH ?? "E:\\mcp\\puppeteer-mcp\\dist\\index.js";
  const client = await connectMcp("node", [MCP_PUPPETEER]);

  const results = [];
  for (const url of urls) {
    console.log(`  Midiendo rendimiento de ${url} ...`);
    try {
      const perf = await callTool(client, "audit_performance", { url, device: "mobile" });
      results.push({ url, raw: perf });
    } catch (e) {
      console.warn(`  ⚠️  Error en ${url}: ${e.message}`);
    }
  }

  await client.close();
  return results;
}

// ── Parsear texto de rendimiento del puppeteer-mcp ───────────────────────────

function parsePerfText(raw) {
  if (typeof raw !== "string") return {};
  const num = (label) => {
    const m = raw.match(new RegExp(`${label}[^\\d]*(\\d+)`));
    return m ? parseInt(m[1]) : null;
  };
  return {
    lcp: num("LCP"),
    fcp: num("FCP"),
    ttfb: num("TTFB"),
    cls: (() => { const m = raw.match(/CLS[^\d]*([\d.]+)/); return m ? parseFloat(m[1]) : null; })(),
    loadTime: num("networkidle"),
    domInteractive: num("DOM Interactive"),
  };
}

// ── Construir secciones de la plantilla ──────────────────────────────────────

function buildMetaTagsRows(pages) {
  const titleRows = pages.slice(0, 10).map(p => {
    const len = p.title?.length ?? 0;
    const state = !p.title ? "❌ Falta" : len < 30 ? "⚠️ Corto" : len > 65 ? "⚠️ Largo" : "✅ OK";
    return `| ${p.url} | ${p.title ?? "—"} | ${len || "—"} | ${state} |`;
  }).join("\n");

  const descRows = pages.slice(0, 10).map(p => {
    const len = p.metaDescription?.length ?? 0;
    const state = !p.metaDescription ? "❌ Falta" : len < 70 ? "⚠️ Corta" : len > 160 ? "⚠️ Larga" : "✅ OK";
    return `| ${p.url} | ${p.metaDescription?.slice(0, 60) ?? "—"}${len > 60 ? "…" : ""} | ${len || "—"} | ${state} |`;
  }).join("\n");

  const h1Rows = pages.slice(0, 10).map(p => {
    const state = !p.h1 ? "❌ Falta" : p.h1Count > 1 ? "⚠️ Múltiples H1" : "✅ OK";
    return `| ${p.url} | ${p.h1 ?? "—"} | ${state} |`;
  }).join("\n");

  return { titleRows, descRows, h1Rows };
}

function buildErrorRows(pages, crawlErrors) {
  const errors4xx = pages.filter(p => p.status >= 400 && p.status < 500).slice(0, 15)
    .map(p => `| ${p.url} | ${p.status} | — |`).join("\n") || "| — | — | — |";

  const errors5xx = pages.filter(p => p.status >= 500).slice(0, 10)
    .map(p => `| ${p.url} | ${p.status} | Error interno |`).join("\n") || "| — | — | — |";

  const crawlErrRows = crawlErrors?.slice(0, 10)
    .map(e => `| ${e.url} | Error de crawl | Alto |`).join("\n") || "| — | — | — |";

  return { errors4xx, errors5xx, crawlErrRows };
}

function buildPerfRows(perfResults) {
  const rows = perfResults.map(({ url, raw }) => {
    const p = typeof raw === "string" ? parsePerfText(raw) : raw;
    return `| ${url} | ${p.ttfb ? p.ttfb + "ms" : "n/a"} | ${msToSec(p.fcp)} | ${msToSec(p.loadTime)} |`;
  }).join("\n");
  return rows || "| — | — | — | — |";
}

function buildRecommendations(summary, perfData) {
  const recs = [];

  // Errores 404
  if (summary.errors > 0)
    recs.push(`| 🔴 Alta | Errores técnicos | ${summary.errors} URL(s) con error de crawl | Revisar y corregir o redirigir | Alto |`);

  // Titles faltantes
  if (summary.missingTitle > 0)
    recs.push(`| 🔴 Alta | Meta tags | ${summary.missingTitle} página(s) sin title | Añadir title descriptivo (30-65 chars) | Alto |`);

  // Meta description faltante
  if (summary.missingMeta > 0)
    recs.push(`| 🟡 Media | Meta tags | ${summary.missingMeta} página(s) sin meta description | Redactar meta descriptions únicas | Medio |`);

  // H1 múltiple
  if (summary.multipleH1 > 0)
    recs.push(`| 🟡 Media | Meta tags | ${summary.multipleH1} página(s) con múltiples H1 | Dejar solo un H1 por página | Medio |`);

  // Imágenes sin alt
  if (summary.imgsWithoutAlt > 0)
    recs.push(`| 🟡 Media | Accesibilidad/SEO | ${summary.imgsWithoutAlt} imagen(es) sin atributo alt | Añadir alt descriptivos | Medio |`);

  // Velocidad crítica
  for (const { url, raw } of perfData) {
    const p = typeof raw === "string" ? parsePerfText(raw) : raw;
    if (p.lcp && p.lcp > 4000)
      recs.push(`| 🔴 Alta | Velocidad | LCP crítico en ${url} (${msToSec(p.lcp)}) | Optimizar imágenes y recursos bloqueantes | Alto |`);
    else if (p.lcp && p.lcp > 2500)
      recs.push(`| 🟡 Media | Velocidad | LCP mejorable en ${url} (${msToSec(p.lcp)}) | Revisar imágenes hero y CSS crítico | Medio |`);
  }

  if (recs.length === 0)
    recs.push("| 🟢 — | — | No se detectaron problemas críticos | Mantener monitoreo periódico | Bajo |");

  return recs.join("\n");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 Iniciando auditoría SEO de: ${baseUrl}`);
  console.log(`   Cliente: ${clienteName}\n`);

  // 1. Crawl
  console.log("📡 Fase 1 — Crawl y análisis de meta tags...");
  const { crawl, extraAudits } = await runCrawl(baseUrl, extraPaths);

  // Filtrar recursos no HTML (imágenes, PDFs, etc.) y deduplicar por URL normalizada
  const NON_HTML = /\.(jpg|jpeg|png|gif|webp|svg|ico|pdf|zip|mp4|mp3|woff2?|ttf|eot)(\?.*)?$/i;
  const seenUrls = new Set();
  const allPages = [...(crawl.pages ?? []), ...extraAudits].filter(p => {
    if (NON_HTML.test(p.url)) return false;
    const normalized = p.url.replace(/\/$/, "");
    if (seenUrls.has(normalized)) return false;
    seenUrls.add(normalized);
    return true;
  });
  console.log(`   ${allPages.length} páginas analizadas, ${crawl.errors?.length ?? 0} errores.\n`);

  // 2. Performance — homepage + URLs extra (máx 3 para no tardar mucho)
  const perfUrls = [baseUrl, ...extraPaths].slice(0, 3);
  console.log("⚡ Fase 2 — Auditoría de rendimiento...");
  const perfResults = await runPerformance(perfUrls);
  console.log(`   ${perfResults.length} URL(s) medidas.\n`);

  // 3. Construir datos
  console.log("📊 Fase 3 — Construyendo informe...");
  const summary = crawl.summary ?? {};
  const { titleRows, descRows, h1Rows } = buildMetaTagsRows(allPages);
  const { errors4xx, errors5xx, crawlErrRows } = buildErrorRows(allPages, crawl.errors);

  // Scores
  const perfHome = perfResults[0] ? (typeof perfResults[0].raw === "string"
    ? parsePerfText(perfResults[0].raw) : perfResults[0].raw) : {};
  const scoreTech = Math.max(0, 100 - (summary.errors ?? 0) * 5 - (summary.missingCanonical ?? 0) * 2);
  const scoreMeta = Math.max(0, 100 - (summary.missingTitle ?? 0) * 10 - (summary.missingMeta ?? 0) * 5 - (summary.multipleH1 ?? 0) * 5);
  const scoreVel = perfHome.lcp ? scoreFrom(perfHome.lcp, 2500, 4000) : 50;
  const scoreTotal = Math.round((scoreTech + scoreMeta + scoreVel) / 3);

  const stateEmoji = (s) => s >= 80 ? "✅ Bueno" : s >= 60 ? "⚠️ Mejorable" : "❌ Crítico";

  const hallazgos = [
    summary.errors > 0 ? `- **${summary.errors} error(es) de crawl** detectados en el sitio.` : null,
    summary.missingTitle > 0 ? `- **${summary.missingTitle} página(s) sin title** definido.` : null,
    summary.missingMeta > 0 ? `- **${summary.missingMeta} página(s) sin meta description**.` : null,
    summary.multipleH1 > 0 ? `- **${summary.multipleH1} página(s) con múltiples etiquetas H1**.` : null,
    summary.imgsWithoutAlt > 0 ? `- **${summary.imgsWithoutAlt} imagen(es) sin atributo alt**.` : null,
    perfHome.lcp > 2500 ? `- **LCP de ${msToSec(perfHome.lcp)}** en la home — por encima del umbral recomendado (2.5s).` : null,
  ].filter(Boolean).join("\n") || "- No se detectaron problemas críticos en esta auditoría.";

  const data = {
    cliente_nombre: clienteName,
    cliente_url: baseUrl,
    fecha: today,
    auditor: "Audit SEO",
    score_tecnico: scoreTech,
    estado_tecnico: stateEmoji(scoreTech),
    score_metatags: scoreMeta,
    estado_metatags: stateEmoji(scoreMeta),
    score_velocidad: scoreVel,
    estado_velocidad: stateEmoji(scoreVel),
    score_total: scoreTotal,
    estado_total: stateEmoji(scoreTotal),
    hallazgos_clave: hallazgos,
    errores_4xx: errors4xx,
    errores_5xx: errors5xx,
    redirecciones: "| — | — | — |",
    problemas_crawl: crawlErrRows,
    auditoria_titles: titleRows || "| — | — | — | — |",
    auditoria_descriptions: descRows || "| — | — | — | — |",
    auditoria_h1: h1Rows || "| — | — | — |",
    lcp: perfHome.lcp ? `${perfHome.lcp}ms` : "n/a",
    estado_lcp: status(perfHome.lcp, 2500, 4000),
    inp: "n/a",
    estado_inp: "—",
    cls: perfHome.cls ?? "n/a",
    estado_cls: perfHome.cls !== undefined ? (perfHome.cls <= 0.1 ? "✅ OK" : perfHome.cls <= 0.25 ? "⚠️ Mejorable" : "❌ Crítico") : "—",
    tiempos_carga: buildPerfRows(perfResults),
    recursos_lentos: "| — | — | — | — |",
    recomendaciones: buildRecommendations(summary, perfResults),
  };

  // 4. Guardar JSON
  const slug = clienteName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const dataDir = join(__dirname, "data");
  const dataFile = join(dataDir, `${slug}.json`);
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
  console.log(`   Datos guardados en: ${dataFile}`);

  // 5. Generar informe
  execSync(`node generate.js data/${slug}.json`, { cwd: __dirname, stdio: "inherit" });

  console.log("\n✅ Auditoría completada.\n");
}

main().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
