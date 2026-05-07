# Resumen Ejecutivo

## Información del Cliente

| Campo | Valor |
|-------|-------|
| Cliente | {{cliente_nombre}} |
| Sitio web | {{cliente_url}} |
| Fecha del informe | {{fecha}} |
| Auditado por | {{auditor}} |

## Puntuación SEO Global

| Categoría | Puntuación | Estado |
|-----------|-----------|--------|
| Errores técnicos | {{score_tecnico}}/100 | {{estado_tecnico}} |
| Meta tags | {{score_metatags}}/100 | {{estado_metatags}} |
| Velocidad de carga | {{score_velocidad}}/100 | {{estado_velocidad}} |
| **Total** | **{{score_total}}/100** | **{{estado_total}}** |

## Hallazgos Clave

{{hallazgos_clave}}

---

# Errores Técnicos

## Errores 4xx

| URL | Código | Encontrado en |
|-----|--------|--------------|
{{errores_4xx}}

## Errores 5xx

| URL | Código | Descripción |
|-----|--------|-------------|
{{errores_5xx}}

## Redirecciones

| URL origen | URL destino | Tipo |
|-----------|------------|------|
{{redirecciones}}

## Páginas con Problemas de Crawl

| URL | Problema | Impacto |
|-----|---------|---------|
{{problemas_crawl}}

---

# Meta Tags

## Títulos (Title)

| URL | Title actual | Longitud | Estado |
|-----|-------------|---------|--------|
{{auditoria_titles}}

## Descripciones (Meta Description)

| URL | Meta Description | Longitud | Estado |
|-----|----------------|---------|--------|
{{auditoria_descriptions}}

## Etiquetas H1

| URL | H1 encontrado | Estado |
|-----|--------------|--------|
{{auditoria_h1}}

---

# Velocidad de Carga

## Core Web Vitals

| Métrica | Valor | Umbral óptimo | Estado |
|---------|-------|--------------|--------|
| LCP (Largest Contentful Paint) | {{lcp}} | < 2.5s | {{estado_lcp}} |
| INP (Interaction to Next Paint) | {{inp}} | < 200ms | {{estado_inp}} |
| CLS (Cumulative Layout Shift) | {{cls}} | < 0.1 | {{estado_cls}} |

## Tiempo de Carga por Página

| URL | TTFB | FCP | Tiempo total |
|-----|------|-----|-------------|
{{tiempos_carga}}

## Recursos que Ralentizan la Carga

| Recurso | Tipo | Tamaño | Tiempo |
|---------|------|--------|--------|
{{recursos_lentos}}

---

# Recomendaciones Prioritarias

| Prioridad | Área | Problema detectado | Acción recomendada | Impacto estimado |
|:---------:|------|-------------------|-------------------|:----------------:|
{{recomendaciones}}
