# SEO Agent 2026

Herramienta de auditoría SEO completa. Analiza Core Web Vitals, SEO on-page y técnico, competidores y genera informes ejecutivos para clientes.

## Stack

- React 18 + Vite
- PageSpeed Insights API v5 (Google)
- Nginx (producción)
- Docker (deploy en Hetzner)

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Arrancar en local
npm run dev
# → http://localhost:3000

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Deploy en Hetzner con Docker

```bash
# Build de la imagen
docker build -t seo-agent .

# Ejecutar en local para verificar
docker run -p 8080:80 seo-agent

# En el servidor Hetzner
scp -r dist/ root@TU_IP:/var/www/seo-agent
# o bien usa docker-compose (ver abajo)
```

### docker-compose.yml (opcional)

```yaml
version: '3.8'
services:
  seo-agent:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

## Estructura del proyecto

```
seo-agent/
├── src/
│   ├── components/
│   │   ├── UI.jsx            # Primitivas reutilizables (Badge, Card, Btn...)
│   │   ├── ConfigPanel.jsx   # Formulario de configuración y APIs
│   │   ├── CWVPanel.jsx      # Core Web Vitals con datos reales
│   │   ├── CompPanel.jsx     # Análisis comparativo de competidores
│   │   ├── GSCPanel.jsx      # Dashboard de Google Search Console
│   │   ├── AuditPanels.jsx   # On-page y técnico (Lighthouse)
│   │   └── ChecklistPanel.jsx # Checklist manual 147 variables
│   ├── hooks/
│   │   ├── usePSI.js         # Hook para PageSpeed Insights API
│   │   └── useChecklist.js   # Estado del checklist manual
│   ├── utils/
│   │   ├── constants.js      # CWV thresholds, checklist data, helpers
│   │   └── reportGenerator.js # Builders de prompts para Claude
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile
├── nginx.conf
└── vite.config.js
```

## Extensiones con Claude Code

Sugerencias para ampliar el proyecto:

```
# Añadir integración con GSC API real (OAuth)
"Añade autenticación OAuth con Google y extrae datos reales de GSC"

# Añadir exportación a PDF
"Genera el informe en PDF descargable con los datos del análisis"

# Añadir base de datos de clientes
"Guarda los análisis en localStorage para acceder al historial de clientes"

# Añadir gráficos de evolución
"Añade gráficos de tendencia con Recharts comparando análisis anteriores"

# Integrar con n8n
"Crea un endpoint webhook para que n8n pueda disparar análisis automáticos"
```

## API Key de PageSpeed

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un proyecto o selecciona uno existente
3. APIs y servicios → Habilitar APIs → **PageSpeed Insights API** → Activar
4. Credenciales → Crear credencial → Clave de API
5. (Opcional) Restringe la key a tu dominio en producción

La key se guarda solo en memoria del navegador — nunca se envía a ningún servidor propio.
