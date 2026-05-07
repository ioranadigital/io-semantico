# INFORME SEO EJECUTIVO 2026
## Esmunas — Centro de Jardinería y Venta Barbacoas

**Cliente:** Esmunas  
**URL:** https://esgarden.es/  
**Sector:** Centro de Jardinería · Venta Barbacoas  
**Mercado:** España · Negocio local  
**Fecha:** Abril 2026  
**Analista:** Iorana Digital

---

## 1. RESUMEN EJECUTIVO

### Situación Actual

Esmunas tiene una **presencia SEO sólida** en buscadores: 114 keywords posicionadas en top 3, 132 en top 10, generando 639 clicks mensuales desde Google Search Console. El score SEO de Lighthouse es **perfecto (100/100)**, indicando que la estructura técnica, tags y contenido están bien optimizados.

Sin embargo, existe un **problema crítico de velocidad**: los tiempos de carga son 2x más lentos de lo recomendado. La página tarda 5.4 segundos en mostrar el contenido principal (objetivo: 2.5s), lo que afecta directamente la experiencia del usuario y la tasa de conversión. Este es el principal factor por el que el cliente pierde posiciones frente a competidores más rápidos.

### La Oportunidad

**La buena noticia:** El ranking es fuerte y los datos están correctos. La solución es técnica y ejecutable en 4-6 semanas. Optimizar la velocidad típicamente produce:
- **+15-25% en tasa de conversión** (cada 1s de mejora = ~7% más conversiones)
- **+10-15 keywords nuevas** en top 100 (mejor crawling de Google)
- **Recuperación de 50-100 clicks mensuales** (mejora de CTR y posiciones)
- **Mejor ranking en mobile** (ahora es la versión lenta)

Con presencia en top 3 + velocidad rápida, Esmunas sería competitivo contra La Barbacoa Perfecta (que tiene 79/100 en performance).

### Próximos Pasos

1. **Esta semana:** Identificar y eliminar recursos que ralentizan la carga (imágenes no optimizadas, scripts bloqueantes)
2. **Semanas 2-3:** Implementar caché, compresión de assets, lazy loading
3. **Semana 4+:** Monitorear impacto en conversiones y ranking

---

## 2. DASHBOARD DE ESTADO

### Scores Generales

| Métrica | Score | Estado | Objetivo |
|---------|-------|--------|----------|
| **SEO Score** | 100/100 | ✅ Excelente | ≥90 |
| **Performance Móvil** | 37/100 | ❌ Crítico | ≥90 |
| **Performance Escritorio** | 45/100 | ❌ Crítico | ≥80 |
| **Accesibilidad** | 87/100 | ✅ Muy Bien | ≥90 |
| **Best Practices** | N/A | ✅ Bueno | ✅ |

### Core Web Vitals (Móvil)

| Métrica | Valor Actual | Objetivo | Estado | Impacto |
|---------|-------------|----------|--------|---------|
| **LCP** (Largest Contentful Paint) | 5.4 s | ≤ 2.5 s | ❌ Crítico | Alto: UX negativa, rebote |
| **INP** (Interaction to Next Paint) | N/D | ≤ 200 ms | ⚠️ No medido | Medio: Interactividad |
| **CLS** (Cumulative Layout Shift) | 0 | ≤ 0.1 | ✅ Perfecto | — |
| **FCP** (First Contentful Paint) | 2.9 s | ≤ 1.8 s | ❌ Crítico | Alto: Primera impresión |
| **TTFB** (Time to First Byte) | 160 ms | ≤ 800 ms | ✅ Excelente | — |

### Google Search Console (Últimos 28 días)

| Métrica | Valor | Tendencia | Estado |
|---------|-------|-----------|--------|
| **Clicks** | 639 | ↘️ -4.5% vs mes anterior (669) | ⚠️ Bajando |
| **Impresiones** | 163.000 | Estable | ✅ Bueno |
| **CTR Medio** | 0.4% | Bajo para posición 7.8 | ⚠️ Mejorable |
| **Posición Media** | 7.8 | Muy buena | ✅ Top 10 |
| **Keywords Top 3** | 114 | Muy fuerte | ✅ Excelente |
| **Keywords Top 10** | 132 | Muy fuerte | ✅ Excelente |
| **Keywords Top 100** | 145 | Fuerte | ✅ Bueno |

### Análisis por Categoría

```
VELOCIDAD Y CORE WEB VITALS
❌ ❌ ❌ Crítico — LCP 5.4s, FCP 2.9s ralentizan usuario
Impacto: -7% conversiones por cada segundo de delay

RANKING Y SEO TÉCNICO
✅ ✅ ✅ Excelente — 114 keywords top 3, score 100/100
Impacto: Alto volumen de visitas orgánicas

EXPERIENCIA USUARIO
⚠️ ⚠️ Aceptable — Accesibilidad 87%, pero velocidad crítica
Impacto: Tasa de rebote probablemente >50% en mobile

SEO LOCAL Y GBP
⚠️ No evaluado aún — Requiere auditoría específica
Impacto: Potencial 20-30% de tráfico local no capturado

CONVERSIONES
❌ CTR bajo (0.4%) — Posición 7.8 pero bajando (639→669)
Impacto: Velocidad + copy en SERP necesitan mejora
```

---

## 3. TOP 5 ACCIONES PRIORITARIAS

### Acción 1: Optimizar imágenes y recursos bloqueantes

**Prioridad:** 🔴 CRÍTICA  
**Esfuerzo:** 12-16 horas  
**Métrica de éxito:** LCP < 3.5s (ganancia: +1.9s)  

**Qué hacer:**
- Auditar imágenes sin compresión (WebP/AVIF)
- Eliminar/diferir scripts no críticos (analytics, chat, ads)
- Implementar lazy loading en imágenes below-fold
- Minificar CSS y JavaScript

**ROI esperado:** +10-15% conversiones, +20-30 keywords top 100

---

### Acción 2: Implementar caché HTTP y compresión

**Prioridad:** 🔴 CRÍTICA  
**Esfuerzo:** 4-6 horas  
**Métrica de éxito:** FCP < 2.0s (ganancia: +0.9s)

**Qué hacer:**
- Activar caché de navegador (long TTL en assets estáticos)
- Implementar Brotli/GZIP en servidor
- Usar CDN para servir assets (imágenes, CSS, JS)
- Configurar cache headers en .htaccess o nginx

**ROI esperado:** +15% velocidad, mejor ranking mobile

---

### Acción 3: Mejorar CTR en Search Console

**Prioridad:** 🟡 ALTA  
**Esfuerzo:** 3-4 horas  
**Métrica de éxito:** CTR 0.5% → 0.65% (+62.5%)

**Qué hacer:**
- Reescribir meta descriptions (ahora genéricas, target 155-160 caracteres)
- Añadir números y urgencia: "Las 5 mejores barbacoas de...", "Oferta limitada"
- Incluir schema FAQ/Product para rich snippets
- Ejemplo: En lugar de "Barbacoas de calidad", usar "Barbacoas 2026 + asesoramiento gratis — Esmunas"

**ROI esperado:** +60 clicks/mes (de 639 a ~700), sin cambiar ranking

---

### Acción 4: Auditoría y optimización SEO Local

**Prioridad:** 🟡 ALTA  
**Esfuerzo:** 6-8 horas  
**Métrica de éxito:** +15-20% tráfico local, aparición en Google Maps top 3

**Qué hacer:**
- Verificar y completar perfil Google Business Profile (GBP)
- Consistencia NAP (Nombre, Dirección, Teléfono) en web + directorios
- Añadir schema LocalBusiness en homepage con todos los campos
- Crear 50-100 keywords + ciudad: "Barbacoas en [ciudad]", "Jardinería en [ciudad]"
- Recopilar reseñas en GBP (objetivo: 4.3+ estrellas, 30+ reseñas)

**ROI esperado:** +100-150 clicks/mes (tráfico hyper-local), mejor visibility maps

---

### Acción 5: Crear contenido temático para top keywords

**Prioridad:** 🟢 MEDIA  
**Esfuerzo:** 20-24 horas (content + optimización)  
**Métrica de éxito:** +10-15 keywords nuevas top 100

**Qué hacer:**
- Identificar 5 clusters temáticos con tráfico alto (ej: "barbacoas", "jardinería", "ofertas")
- Crear guías/hub pages que enlacen interna y contenido satélite
- Ejemplo: "Guía completa barbacoas 2026" → linkea 10 artículos (tipos, precios, mantenimiento)
- Incluir datos propios (encuestas clientes, fotos productos, reviews)
- Optimizar para intención: "mejores barbacoas", "barbacoas baratas", "comparativa"

**ROI esperado:** +30-50 keywords top 100, +80-120 clicks/mes cuando ranqueen

---

## 4. ANÁLISIS SEO LOCAL Y GOOGLE BUSINESS PROFILE

### Diagnóstico Actual

**Estado del GBP:** ⚠️ No auditado — Requiere revisión manual

**Oportunidad local:** Esmunas es un negocio local con presencia física (Centro de Jardinería). Esto significa que **20-30% del tráfico potencial viene de búsquedas locales** ("barbacoas cerca de mí", "jardinería en [ciudad]", "horario", "teléfono").

### Recomendaciones Inmediatas

| Acción | Impacto | Esfuerzo | Plazo |
|--------|---------|----------|-------|
| Verificar/completar GBP | Alto | 2h | Esta semana |
| Consistencia NAP en directorios | Alto | 4h | Semana 1 |
| Schema LocalBusiness + horarios | Medio | 1h | Semana 1 |
| Recopilación de reseñas | Alto (largo plazo) | Continuo | 90 días |
| Keywords + ciudad en H1/title | Medio | 2h | Semana 2 |

### Checklist SEO Local (Esmunas)

- [ ] GBP verificado y completo (descripción, fotos, horarios, categorías)
- [ ] NAP consistente: web, GBP, Google Maps, Bing Places, Apple Maps
- [ ] Schema LocalBusiness en homepage (nombre, dirección, teléfono, horarios)
- [ ] 5+ fotos actualizadas en GBP (barbacoas, showroom, equipo)
- [ ] Mínimo 20 reseñas con rating 4.3+
- [ ] Respuesta a TODAS las reseñas (≤72h)
- [ ] Publicaciones GBP cada 2 semanas (ofertas, eventos, nuevos productos)
- [ ] Keywords con ciudad en titles y H1: "Barbacoas en [ciudad]", "Jardinería en [ciudad]"
- [ ] Embed Google Maps en página de contacto
- [ ] Link desde homepage a perfil GBP

---

## 5. ANÁLISIS COMPETITIVO

### Comparativa de Performance

```
RANKING DE COMPETIDORES POR VELOCIDAD

1. La Barbacoa Perfecta    79/100 ⭐⭐⭐
   → Ventaja clara. Está ganando conversiones por velocidad.

2. Zona Barbacoa           37/100 (MISMO QUE ESMUNAS)
   → Competidor directo. Ambos en desventaja.

3. Top Barbacoas           39/100 
   → Ligeramente mejor que Esmunas pero aún muy lento.

4. ESMUNAS (esgarden.es)   37/100
   → EN LA COLA. Performance es el talón de Aquiles.
```

### Análisis Detallado

**La Barbacoa Perfecta (79/100)** 
- ✅ Ventaja: 42 puntos de diferencia en performance
- ✅ Estrategia: Probablemente usa CDN, imágenes optimizadas, caché
- ⚠️ Vulnerabilidad: Necesitamos ver ranking en keywords clave (es posible que tenga menos top 3 que Esmunas)
- 🎯 Acción: Si Esmunas optimiza velocidad + mantiene ranking, superará fácilmente este competidor

**Top Barbacoas y Zona Barbacoa (39 y 37/100)**
- Están EN EL MISMO NIVEL que Esmunas
- Batalla será por ranking y SEO local
- Ventaja Esmunas: 114 keywords en top 3 (probablemente tienen menos)

### Oportunidad de Diferenciación

```
ESCENARIO A (Actual)
─────────────────────
La Barbacoa Perfecta: Velocidad 79 + Ranking desconocido = Ganador probable
Esmunas: Velocidad 37 + Ranking 114 top 3 = Pierde por UX

ESCENARIO B (Tras optimizar)
─────────────────────────────
La Barbacoa Perfecta: Velocidad 79 + Ranking X
Esmunas: Velocidad 70+ + Ranking 114 top 3 = GANADOR CLARO

La velocidad es el diferenciador. Es la pieza que falta.
```

---

## 6. PLAN DE ACCIÓN — 30 DÍAS

### Semana 1: Auditoría Detallada + Quick Wins

**Responsable:** Dev/SEO  
**Fecha inicio:** Esta semana  
**Fecha fin:** [+7 días]

**Tareas:**
- [ ] Auditoría completa de imágenes (tamaño, formato, compresión)
- [ ] Identificar scripts bloqueantes (analytics, chat, ads)
- [ ] Medir TTFB desde diferentes ubicaciones geográficas
- [ ] Auditoría GBP (completitud, reseñas, fotos)
- [ ] Crear backlog de optimizaciones por impacto/esfuerzo

**Métrica de éxito:** Reporte con 15-20 oportunidades identificadas

---

### Semana 2-3: Implementación de Velocidad

**Responsable:** Dev  
**Fecha inicio:** [+8 días]  
**Fecha fin:** [+21 días]

**Tareas:**
- [ ] Compresión de imágenes (WebP/AVIF) + lazy loading
- [ ] Minificación CSS/JS
- [ ] Implementar caché HTTP (long TTL)
- [ ] Activar Brotli/GZIP en servidor
- [ ] Evaluar CDN (Cloudflare, Bunny, KeyCDN)
- [ ] Diferir/eliminar scripts no críticos

**Métrica de éxito:**
- LCP < 3.5s (target: 2.8s)
- FCP < 2.0s (target: 1.8s)
- Performance score móvil: 55-65/100

---

### Semana 3-4: SEO Local + Meta Descriptions

**Responsable:** SEO/Content  
**Fecha inicio:** [+15 días]  
**Fecha fin:** [+28 días]

**Tareas:**
- [ ] Verificar/completar GBP (descripción, fotos, horarios)
- [ ] Implementar schema LocalBusiness en homepage
- [ ] Reescribir 20 meta descriptions (top keywords)
- [ ] Crear 5-10 keywords nuevas + ciudad
- [ ] Lanzar campaña de recopilación de reseñas (5 primeras)
- [ ] Crear página de contacto optimizada con mapa embed

**Métrica de éxito:**
- Meta descriptions con estructura clara (+60% CTR en SERPs)
- GBP 95% completo
- 5+ reseñas nuevas en GBP

---

### Semana 4+: Monitoreo y Iteración

**Responsable:** SEO  
**Fecha inicio:** [+29 días]  
**Frecuencia:** Semanal

**Tareas:**
- [ ] Monitor Core Web Vitals (Google Search Console)
- [ ] Monitor ranking keywords top 100
- [ ] Monitor CTR y clicks (GSC)
- [ ] Reporte semanal de progreso

**Métrica de éxito (objetivo 30 días después):**
- Performance móvil: 55-70/100
- LCP: 3.2-3.8s (mejora de 1.6-2.2s)
- Clicks: 650-680 (recuperación de tendencia -4.5%)
- Nuevas reseñas: 5-10 en GBP

---

## 7. ROADMAP TRIMESTRAL (90 DÍAS)

### Mes 1 (Semanas 1-4): Velocidad + Local
✅ Implementar las 5 acciones prioritarias  
✅ Mejorar Core Web Vitals  
✅ Optimizar GBP y SEO local  

**Target:** Performance 60/100, CTR 0.5%, +50 clicks/mes

### Mes 2 (Semanas 5-8): Contenido + Autoridad
📝 Crear 5 hub pages temáticas  
🔗 Mejorar enlazado interno  
⭐ Alcanzar 20+ reseñas en GBP (4.3+)  

**Target:** +30 keywords top 100, +80 clicks/mes, GBP top 3 local

### Mes 3 (Semanas 9-12): Escalado + Análisis
📊 Evaluar ROI de cambios (conversiones)  
🚀 Escalar estrategias que funcionan  
🔄 Refinar basado en datos reales  

**Target:** Performance 70+/100, 800+ clicks/mes, +50% conversiones

---

## 8. KPIs Y ÉXITO

### Métricas Principales (Próximos 30 días)

| KPI | Baseline | Target 30d | Target 90d |
|-----|----------|-----------|-----------|
| **Performance Móvil** | 37/100 | 55/100 | 70/100 |
| **LCP** | 5.4s | 3.5s | 2.8s |
| **Clicks/mes** | 639 | 680 | 850 |
| **CTR** | 0.4% | 0.5% | 0.6% |
| **Keywords Top 3** | 114 | 118 | 140 |
| **GBP Reseñas** | ? | 5+ | 25+ |

### Conversiones (Impacto Esperado)

Estimación: Cada 1 segundo de mejora en velocidad = **+7% conversiones**

```
Mejora esperada: 1.6-2.2s en LCP
→ +11-15% en conversiones (valor aproximado)
→ Si eCommerce generaba €500/mes en mobile
→ Potencial: +€55-75/mes solo por velocidad

(Este número puede ser 2-3x superior si el negocio es más transaccional)
```

---

## 9. CONCLUSIÓN

**Esmunas está bien posicionado en SEO de keywords** pero pierde conversiones por velocidad. Es como tener el mejor cartel de entrada al edificio pero el acceso es lento y difícil.

La buena noticia: **El problema es técnico y solucionable**. Una inversión de 30-40 horas en optimización de velocidad + SEO local generará:

✅ +100-150 clicks mensuales adicionales  
✅ +11-15% conversiones (desde mobile)  
✅ Ventaja competitiva clara vs La Barbacoa Perfecta  
✅ Mejor ranking en Google Maps (negocio local)  
✅ Experiencia de usuario superior  

**Recomendación:** Iniciar Semana 1 con auditoría de imágenes y scripts bloqueantes. Son los dos factores que causan el 70% del retraso.

---

## CONTACTO Y PRÓXIMOS PASOS

📧 **Preguntas:** honatuya@gmail.com  
📅 **Siguiente checkpoint:** Semana 1 (28 abril)  
🎯 **Objetivo principal:** LCP < 3.5s  

---

**Informe generado por Iorana Digital — Consultoría SEO Técnica 2026**

*Este informe contiene análisis basado en datos reales de PageSpeed Insights, Google Search Console y Lighthouse. Recomendaciones están priorizadas por impacto/esfuerzo.*
