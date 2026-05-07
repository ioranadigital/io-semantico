# KW Research Module — io-seo

Módulo de **Keyword Research Automation** integrado en io-seo. Análisis de oportunidades SEO, competencia y posicionamiento.

---

## 📁 Estructura

```
KWResearch/
├── KWResearch.jsx          # Componente principal (orquestación)
├── KWResearchPanel.jsx     # Panel izquierdo (configuración)
├── KWResultsTabs.jsx       # Panel derecho (5 pestañas de resultados)
├── utils/
│   ├── mockData.js         # Datos simulados (fáciles de reemplazar)
│   ├── kwAnalyzer.js       # Lógica de análisis (scores, oportunidades, etc)
│   └── exporters.js        # Exportación CSV, JSON, PDF, Google Sheets
└── README.md               # Este archivo
```

---

## 🎯 Funcionamiento

### 1. **Flujo de Usuario**

1. **Configuración (Panel Izquierdo)**
   - Nombre del proyecto
   - URL principal (cliente)
   - Industrias (checkboxes múltiples)
   - Acceso a GSC (opcional: mis propiedades o del cliente)
   - 3-5 competidores

2. **Análisis (Click en "Iniciar Análisis")**
   - Actualmente: Genera mockups simulados
   - Futuro: Llamará a MCPs reales

3. **Resultados (Panel Derecho - 5 Pestañas)**
   - 📈 **Resumen**: Métricas clave
   - 🔑 **Keywords**: Tabla de keywords con intención, dificultad, frecuencia
   - ⚔️ **Competencia**: Análisis comparativo
   - 💡 **Oportunidades**: Keywords de bajo esfuerzo/alto impacto
   - ⚡ **Rendimiento**: Métricas estimadas

4. **Exportación**
   - CSV descargable
   - JSON descargable
   - PDF (via html2canvas + jsPDF)
   - Google Sheets (CSV + instrucciones)

---

## 🔧 Reemplazar Mockups con MCPs Reales

Cuando los MCPs estén disponibles, reemplaza la lógica en `KWResearch.jsx::handleAnalyze()`:

### Paso 1: Importar MCPs

```javascript
// En KWResearch.jsx
import { useFastMcpSeo } from '../hooks/useFastMcpSeo.js'  // fastmcp-seo
import { usePuppeteerMcp } from '../hooks/usePuppeteerMcp.js'  // puppeteer-mcp
import { useGscMcp } from '../hooks/useGscMcp.js'  // gsc-mcp
import { useCrawlMcp } from '../hooks/useCrawlMcp.js'  // crawl-mcp
```

### Paso 2: Llamar MCPs en `handleAnalyze()`

```javascript
const handleAnalyze = async () => {
  setLoading(true)
  try {
    // 1. Extraer keywords de URL principal
    const mainKW = await extractKeywords(config.mainUrl)
    
    // 2. Auditar on-page
    const onPageAudit = await auditSeoOnPage(config.mainUrl)
    
    // 3. Extraer keywords de competidores
    const compKW = await Promise.all(
      config.competitors.map(url => extractKeywords(url))
    )
    
    // 4. Auditar performance
    const perfAudit = await auditPerformance(config.mainUrl)
    
    // 5. Si GSC conectado: obtener datos reales
    let gscData = null
    if (config.gscAccess && config.gscProperty) {
      gscData = await getGscPerformance(config.gscProperty)
    }
    
    // 6. Combinar y procesar datos
    const keywords = combineAndAnalyze(mainKW, compKW, gscData)
    const opportunities = identifyOpportunities(keywords)
    
    setAnalysisData({
      project: config,
      keywords,
      competitors: analyzeCompetitors(compKW),
      opportunities,
      metrics: calculateMetrics(keywords),
    })
  } finally {
    setLoading(false)
  }
}
```

### Paso 3: MCPs Disponibles

| MCP | Función | Input | Output |
|-----|---------|-------|--------|
| **fastmcp-seo:extract_keywords** | Extrae keywords de contenido | URL | `{ keywords: [{keyword, frequency}] }` |
| **puppeteer-mcp:audit_seo_on_page** | Audita H1-H6, meta tags, keywords | URL | `{ score, issues: [...] }` |
| **puppeteer-mcp:audit_performance** | Core Web Vitals | URL | `{ lcp, fcp, cls, ttfb }` |
| **gsc-mcp:get_performance** | Datos reales de GSC | Property ID | `{ keywords: [{keyword, clicks, impressions, ctr, position}] }` |
| **crawl-mcp:crawl_site** | Crawlea todo el sitio | URL | `{ urls: [...], metadata: {...} }` |
| **crawl-mcp:extract_schema** | Extrae schema.org JSON-LD | URL | `{ schemas: [...] }` |

---

## 📊 Formato de Datos

### Estructura Principal

```javascript
{
  project: {
    name: "Nombre Proyecto",
    mainURL: "https://ejemplo.com",
    industries: ["ecommerce", "local"],
    competitors: ["comp1.com", "comp2.com"],
    timestamp: "2025-04-27T10:30:00Z"
  },
  keywords: [
    {
      keyword: "seo software",
      intention: "Comercial|Informacional|Local|Transaccional",
      difficulty: 0-100,      // Calculado por algoritmo
      frequency: 0-100,       // Apariciones en fuentes
      sources: ["GSC", "Competitor1", "Blog"]
    }
  ],
  competitors: [
    {
      url: "comp.com",
      uniqueKW: 245,
      performanceScore: 82,   // 0-100
      onPageScore: 89,        // 0-100
      commonKW: ["seo", "tools"]
    }
  ],
  opportunities: [
    {
      keyword: "seo automation",
      difficulty: 38,
      potentialTraffic: "450-600",
      reason: "Baja dificultad + Alto volumen + ..."
    }
  ],
  metrics: {
    totalKeywords: 10,
    commercialKW: 3,
    informationalKW: 5,
    localKW: 2,
    avgDifficulty: 45,
    opportunitiesFound: 3,
    competitorsAnalyzed: 3
  }
}
```

---

## 🎨 Estilos & Componentes

El módulo **reutiliza componentes UI existentes** de io-seo:

```javascript
import { Badge, Card, SectionTitle, Tabs, Btn, Divider } from '../UI.jsx'
```

**CSS Variables** (heredadas de index.css):
- `--bg`, `--bg-2`, `--bg-3` (colores de fondo)
- `--text`, `--text-2`, `--text-3` (textos)
- `--ok`, `--warn`, `--crit`, `--info` (estados)
- `--border`, `--border-2`, `--radius`, `--radius-sm`

**Tema automático**: Light/Dark (detectado por `prefers-color-scheme`)

---

## 💾 Exportación

### CSV
Formato tabla con headers. Compatible con Excel, Google Sheets, etc.

### JSON
Estructura completa del análisis. Ideal para procesamiento/reimportación.

### PDF
Genera PDF con `html2canvas + jsPDF`. Captura el contenido visible.

**Alternativa**: Print-to-PDF nativo (Ctrl+P).

### Google Sheets
Descarga CSV + muestra instrucciones de importación.

```
1. Ve a sheets.google.com
2. Archivo → Importar → Subir archivo
3. Selecciona tu CSV
4. ¡Listo!
```

---

## 🚀 Próximos Pasos

- [ ] Integración de MCPs reales cuando estén disponibles
- [ ] Caché de resultados (localStorage o backend)
- [ ] Historial de análisis (tabla de proyectos anteriores)
- [ ] Integración de Google Sheets API (automático, sin descargar)
- [ ] Alertas de cambios en ranking
- [ ] Sugerencias de contenido basadas en gaps

---

## 📝 Notas Técnicas

- **No requiere autenticación** (funciona con mockups)
- **Mockups fáciles de reemplazar** sin cambiar estructura
- **Componentes modulares** (fácil de refactorizar)
- **Responsive**: Mobile-first (Tailwind CSS v4 ready)
- **Sin dependencias externas nuevas** (reutiliza jsPDF, html2canvas, xlsx)

---

## 🔗 Integración en App.jsx

Ya está integrado como pestaña:

```javascript
const TABS = [
  { id: 'kw-research', label: 'KW Research 🔍' },
  // ... otras pestañas
]

// En el render:
{activeTab === 'kw-research' && <KWResearch />}
```

---

**Creado:** 2025-04-27 · **Framework:** React 18 + Vite · **UI:** CSS Variables
