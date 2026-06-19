# 🚀 Configuración SEO - IoranaSEO

## Resumen de Optimizaciones Implementadas

### 1. ✅ Meta Tags & Open Graph

**Archivos:** `src/app/layout.tsx`

```
✓ Title dinámico por página
✓ Description optimizada
✓ Keywords relevantes
✓ Open Graph (Facebook, LinkedIn)
✓ Twitter Cards
✓ Canonical URLs
✓ Alternates para idiomas
```

**Ejemplo en página:**

```typescript
export const metadata: Metadata = {
  title: "IoranaSEO - Agencia de Marketing Digital",
  description: "Expertos en SEO, Google Ads, Facebook Ads...",
  openGraph: {
    type: "website",
    locale: "es_ES",
    // ...
  },
};
```

---

### 2. ✅ Sitemap & Robots.txt

**Archivos creados:**

- `public/sitemap.xml` - 21 URLs indexadas
- `public/robots.xml` - Configuración de crawlers

**Sitemap incluye:**

- Página principal (prioridad 1.0)
- 14 páginas de servicios (prioridad 0.8)
- Páginas de contacto y planes (prioridad 0.7)
- Cambios frecuencia y última modificación

**Robots.txt:**

- Permite acceso a buscadores
- Bloquea admin y API
- Especifica sitemap
- Diferentes reglas para Googlebot y Bingbot

---

### 3. ✅ Structured Data (Schema.org)

**Incluido en layout.tsx:**

#### Organization Schema

```json
{
  "@type": "Organization",
  "name": "IoranaSEO",
  "url": "https://iorana.dev",
  "logo": "https://iorana.dev/logo.png",
  "contact": {
    "@type": "ContactPoint",
    "email": "honatuya@gmail.com"
  }
}
```

#### Website Schema

```json
{
  "@type": "WebSite",
  "url": "https://iorana.dev",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://iorana.dev/search?q={search_term_string}"
  }
}
```

**Uso en componentes:**

```typescript
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";

// En componentes
<script type="application/ld+json">
  {JSON.stringify(generateBreadcrumbSchema(items))}
</script>
```

---

### 4. ✅ Seguridad & Headers

**Next.js Headers:**

```
X-DNS-Prefetch-Control: on
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

### 5. ✅ Performance SEO

**Optimizaciones implementadas:**

```javascript
// Image optimization
images: {
  formats: ["image/avif", "image/webp"],
  remotePatterns: [...]
}

// Webpack code splitting
splitChunks: {
  chunks: "all",
  cacheGroups: { vendor, common }
}

// Compression
compress: true
swcMinify: true
```

**Preconnect & DNS Prefetch:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://supabase.co" />
```

---

### 6. ✅ Redirects SEO

**Implementados (301 permanentes):**

```
/services → /servicios
/contact → /contacto
```

---

## Checklist de SEO

### On-Page

- [x] Title tags únicos por página
- [x] Meta descriptions (140-160 caracteres)
- [x] H1 optimizado
- [x] Keywords relevantes
- [x] Internal linking
- [x] Alt text en imágenes
- [x] URL structure limpia
- [x] Mobile responsive

### Technical

- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Schema.org estructurado
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Favicon & Apple touch icon
- [x] SSL/HTTPS

### Performance

- [x] Image optimization
- [x] Code splitting
- [x] Minification
- [x] Gzip compression
- [x] DNS prefetch
- [x] Preconnect
- [x] Web vitals optimizados

### Off-Page

- [ ] Sitio indexado en Google Search Console
- [ ] Sitio indexado en Bing Webmaster Tools
- [ ] Backlinks de calidad
- [ ] Social signals

---

## Próximos Pasos

1. **Verificación en Google Search Console:**

   ```
   Añadir sitemap: https://iorana.dev/sitemap.xml
   Verificar propiedad del dominio
   ```

2. **Verificación en Bing Webmaster Tools:**

   ```
   Conectar sitio
   Añadir sitemap
   ```

3. **Actualizar Google Analytics:**
   - Implementar GA4
   - Configurar eventos de conversión

4. **Schema.org Adicional (cuando sea necesario):**
   - LocalBusiness schema
   - Service schema
   - Product schema
   - Review schema

5. **Content Optimization:**
   - Audit de keywords por página
   - Optimización de meta descriptions
   - Creación de contenido robusto

6. **Link Building:**
   - Guest posting
   - Citations
   - Backlinks estratégicos

---

## Utilidades SEO Disponibles

### En `src/lib/seo.ts`:

```typescript
// Generar meta tags
generateMetadata(seo: SEOMetadata)

// Schemas
generateOrganizationSchema()
generateBreadcrumbSchema(items)
generateServiceSchema(service)
```

### En `src/components/SEOHead.tsx`:

```typescript
<SEOHead
  title="Título de página"
  description="Descripción..."
  keywords={["keyword1", "keyword2"]}
  canonical="/ruta-pagina"
/>
```

---

## Validaciones Online

- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmaster
- Schema.org Validator: https://validator.schema.org
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev
- Mobile Friendly Test: https://search.google.com/test/mobile-friendly

---

**Última actualización:** 2026-06-19
**Status:** ✅ Implementado
**Versión:** 1.0
