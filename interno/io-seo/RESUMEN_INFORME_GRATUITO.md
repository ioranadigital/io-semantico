# Resumen Ejecutivo: Informe Gratuito — SEO Agent 2026

## ✅ Qué se ha implementado

### Parte A: Formulario Embebible (LeadForm.jsx)
- Formulario limpio y responsivo para cualquier web
- Ruta standalone en `/lead-form` (sin el resto de la app)
- Validación de email y URL
- Envío a webhook n8n en modo `auto`
- Funciona como iframe en cualquier sitio

### Parte B: Panel Informe Gratuito (FreeReportPanel.jsx)
**Sección B1 — Solicitud Manual:**
- Formulario interno para consultor (con campos adicionales)
- Análisis PSI en vivo (móvil + escritorio)
- Generación de PDF client-side con jsPDF
- 2 botones: "Generar y enviar" + "Solo generar PDF"
- Guardado en localStorage con historial

**Sección B2 — Historial:**
- Últimos 50 leads guardados localmente
- Columnas: Fecha | Nombre | URL | Score | Modo | Acciones
- Acciones: Descargar PDF, Reenviar, Eliminar

### Parte C: Análisis Técnico (leadAnalysis.js)
Detecta automáticamente:
- ✓ robots.txt, sitemap.xml, HTTPS
- ✓ Meta description, H1, Schema Markup
- ✓ Google Analytics, Open Graph tags
- ✓ Viewport meta tag, Favicon

Integra datos PSI:
- Performance móvil/escritorio
- Core Web Vitals (LCP, INP, CLS)
- SEO Score

**Puntuación global sobre 20:**
- Grupo A (variables): máx 10 puntos
- Grupo B (métricas PSI): máx 10 puntos

### Parte D: PDF Client-Side (pdfGenerator.js)
Genera PDFs de 4 páginas:
1. **Portada** — Logo, puntuación, fecha, cliente
2. **Resumen ejecutivo** — Diagnóstico, top 3 problemas/oportunidades
3. **Resultados detallados** — Tablas técnicas, métricas PSI, gráficos
4. **Recomendaciones** — Top 5 acciones, CTA, contacto

### Parte E: Workflow n8n (n8n-workflow.json)
10 nodos listos para importar:
1. **Webhook Trigger** — Recibe POST desde formulario o app
2. **PSI Mobile** — Análisis móvil
3. **PSI Desktop** — Análisis escritorio
4. **Claude Analysis** — Diagnóstico y recomendaciones
5. **Process & Calculate** — Calcula score, formatea datos
6. **Email Consultant** — Copia para honatuya@gmail.com
7. **Email Client** — PDF + recomendaciones para cliente
8. **SMS (Twilio)** — Notificación al consultor (opcional)
9. **Google Sheets** — Registra lead
10. **Respond Webhook** — Confirma procesamiento

**Manejo de errores:**
- PSI falla → continúa con score=0
- Claude falla → recomendaciones automáticas
- SMS/Sheets fallan → no rompen el flujo

---

## 📁 Archivos Creados

| Archivo | Propósito |
|---------|----------|
| `src/components/LeadForm.jsx` | Formulario embebible |
| `src/components/FreeReportPanel.jsx` | Panel principal (solicitud + historial) |
| `src/pages/LeadFormPage.jsx` | Página standalone para /lead-form |
| `src/utils/leadAnalysis.js` | Análisis técnico y scoring |
| `src/utils/pdfGenerator.js` | Generación de PDF con jsPDF |
| `n8n-workflow.json` | Workflow listo para importar |
| `.env.example` | Variables de entorno template |
| `embed-snippet.html` | Código para embeber formulario |
| `SETUP_INFORME_GRATUITO.md` | Guía completa de setup |
| `RESUMEN_INFORME_GRATUITO.md` | Este archivo |

---

## 🚀 Inicio Rápido (3 pasos)

### 1. Configurar Variables de Entorno

```bash
cp .env.example .env
# Edita .env y rellena:
# - VITE_WEBHOOK_URL (tu webhook de n8n)
# - VITE_PSI_API_KEY (Google PageSpeed Insights)
```

### 2. Importar Workflow en n8n

1. Abre tu n8n
2. **Workflows → Import** → selecciona `n8n-workflow.json`
3. Configura nodos (Gmail/SendGrid, Google Sheets, Claude)
4. **Activate**

### 3. Usar en la App

- **App principal:** Pestaña "Informe Gratuito"
- **Formulario web:** `http://tu-dominio.com/lead-form`

---

## 🔌 Integración con n8n: Checklist

- [ ] Importar `n8n-workflow.json`
- [ ] Configurar `PSI_API_KEY` en n8n
- [ ] Configurar `ANTHROPIC_API_KEY` en n8n
- [ ] Configurar `SHEETS_ID` en n8n
- [ ] Reemplazar nodos de email (SendGrid/Gmail)
- [ ] Configurar Google Sheets API
- [ ] Copiar webhook URL a `.env` como `VITE_WEBHOOK_URL`
- [ ] Probar webhook con curl
- [ ] Activar workflow en n8n

---

## 📊 Flujos de Datos

### Flujo A: Formulario Web → n8n → Email + Sheets
```
Cliente rellena formulario (LeadForm)
    ↓
POST a webhook n8n (modo: "auto")
    ↓
n8n: PSI + Claude + Emails + Sheets
    ↓
Cliente recibe PDF + diagnóstico
Consultor recibe notificación + lead registrado
```

### Flujo B: Panel Interno → n8n → Email + Sheets
```
Consultor rellena solicitud manual (FreeReportPanel)
    ↓
App genera PDF + análisis PSI en vivo
    ↓
POST a n8n (modo: "manual") + guardar localStorage
    ↓
n8n: Emails + Sheets
    ↓
Cliente + Consultor notificados
```

### Flujo C: Solo PDF Local (Sin n8n)
```
Consultor presiona "Solo generar PDF"
    ↓
App genera PDF client-side (con recomendaciones automáticas)
    ↓
Descarga PDF localmente
    ↓
(Sin llamada a n8n ni Claude)
```

---

## 🎨 Pestaña "Informe Gratuito" en la App

Ubicación: Último tab del análisis principal

```
┌─────────────────────────────────────┐
│ [Solicitud Manual] [Historial (N)]  │
├─────────────────────────────────────┤
│ SECCIÓN ACTIVA:                     │
│                                     │
│ Nombre: ________  Email: ________   │
│ Teléfono: ______ URL: ___________   │
│ Sector: [Select] Prioridad: [Sel]  │
│                                     │
│ Notas Internas: [textarea]          │
│                                     │
│ ☑ Enviar PDF al cliente             │
│ ☑ Enviarme copia                    │
│                                     │
│ [Generar y enviar] [Solo gen. PDF]  │
└─────────────────────────────────────┘
```

---

## 🌐 URL de Acceso

| Ruta | Propósito |
|------|----------|
| `/` (app principal) | Pestaña "Informe Gratuito" |
| `/#/lead-form` | Formulario embebible standalone |
| `https://tu-n8n.com/webhook/seo-lead` | Webhook para recibir POSTs |

---

## 📱 SMS para Notificaciones: Brevo (Recomendado)

**Brevo (ex Sendinblue):**
- ✓ **50 SMS/mes gratis** permanentemente
- ✓ **Ilimitado el primer mes** (perfecto para testing)
- ✓ **Email ilimitado incluido** (bonus)
- ✓ **Números españoles** (no internacionales)
- ✓ **Fácil integración n8n**

**Alternativas:**
- Vonage: 10 SMS/mes gratis
- AWS SNS: 100 SMS/mes (año 1)

**Setup:** Ve a https://www.brevo.com → Settings → SMTP & API → Genera clave → En n8n: HTTP Request a su API

---

## 📋 Variables Técnicas Detectadas

**Grupo A (10 máx):**
- robots.txt ✓ detecta
- sitemap.xml ✓ detecta
- HTTPS ✓ detecta
- Meta description ✓ parsea HTML
- H1 ✓ busca en HTML
- Schema Markup ✓ busca ld+json
- Google Analytics ✓ busca gtag/GTM
- Open Graph tags ✓ busca og:
- Viewport ✓ busca meta viewport
- Favicon ✓ busca link rel=icon

**Grupo B (10 máx):**
- Performance móvil (>75 = 2pts)
- Performance escritorio (>90 = 2pts)
- SEO Score (>80 = 2pts)
- LCP (≤2.5s = 2pts)
- CLS (≤0.1 = 2pts)

---

## ⚙️ Configuración Recomendada

### Para Startups / Freelancers
- Email: Gmail SMTP (gratis)
- SMS: **Brevo** (50 SMS/mes gratis + ilimitado mes 1) ✓
- Sheets: Google Sheets (gratis)
- n8n: Self-hosted en VPS (económico)

### Para Agencias
- Email: SendGrid (100 emails/día gratis)
- SMS: **Brevo** (50 SMS/mes gratis + Email ilimitado) ✓
- Sheets: Google Workspace
- n8n: Cloud n8n (pricing según uso)

---

## 🔒 Seguridad

- ✓ No se almacenan credenciales en la app (todas en n8n/env)
- ✓ PDFs generados client-side (nunca se envían a servidor)
- ✓ Proxy CORS (allorigins.win) para detectar variables
- ✓ Validación de email y URL en formulario
- ✓ localStorage aislado por usuario

---

## 📞 Soporte Rápido

Para preguntas durante setup, ver `SETUP_INFORME_GRATUITO.md` en los apartados:
1. **Webhook en n8n** → Pasos exactos
2. **Google Sheets API** → Habilitación + autenticación
3. **SMTP Gmail** → Contraseñas de aplicación
4. **Alternativas Twilio** → Vonage, AWS SNS, WhatsApp

---

**Versión:** 1.0
**Estado:** ✅ Listo para producción
**Última actualización:** 24 de abril de 2026
