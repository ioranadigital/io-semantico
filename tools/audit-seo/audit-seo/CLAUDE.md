# CLAUDE.md — audit-seo
**Motor de auditorías SEO: Análisis automático + MCP server**

## Rol

audit-seo es el **motor de análisis SEO** de la agencia. Aquí ejecutas:
- ✅ Auditorías técnicas automáticas
- ✅ Análisis de datos (GSC, Ahrefs, Semrush)
- ✅ Generación de informes para clientes
- ✅ MCP server para integración con n8n

---

## Estructura de carpetas

```
audit-seo/
├── scripts/
│   ├── collect.js           ← Recopila datos de APIs
│   ├── generate.js          ← Genera informes
│   └── [otros scripts]
│
├── data/                    ← Datos almacenados
│   ├── domains/
│   └── [por cliente]
│
├── informes/                ← Informes generados
│   ├── cliente-a/
│   │   ├── 2026-05.md
│   │   └── [otros meses]
│   └── [otros clientes]
│
├── templates/               ← Plantillas de informe
│   ├── auditoria-seo.md
│   ├── keywords-gap.md
│   └── [otras plantillas]
│
├── n8n/                     ← Workflows de n8n
│   └── n8n-workflow.json
│
├── server.js                ← MCP server
├── .mcp.json                ← Config MCP
├── package.json
├── CLAUDE.md                ← Este archivo
└── .env.local               ← Variables (NO en Git)
```

---

## Antes de empezar: Configura el entorno

### 1. Instala dependencias
```powershell
cd E:\git\audit-seo
npm install
```

### 2. Crea .env.local
```powershell
touch .env.local
```

### 3. Rellena credenciales
```
# Google Search Console (requerida)
GSC_CREDENTIALS_PATH=./credentials/gsc-credentials.json

# Ahrefs (opcional)
AHREFS_API_KEY=your-ahrefs-key

# Semrush (opcional)
SEMRUSH_API_KEY=your-semrush-key

# n8n (opcional)
N8N_WEBHOOK_URL=https://n8n.iorana.digital/webhook
```

### 4. Descarga credenciales GSC
De Google Cloud Console:
```
1. Ve a google.com/cloud
2. Crea proyecto o usa existente
3. Habilita "Google Search Console API"
4. Crea credencial "Service Account"
5. Descarga JSON → guarda en ./credentials/gsc-credentials.json
```

---

## Workflow 1: Auditoría SEO completa

### Paso 1: Recopila datos
```powershell
cd E:\git\audit-seo
npm run audit -- --domain "cliente-a.com" --full
```

Esto ejecuta `node collect.js` y:
- Consulta GSC (últimos 90 días)
- Trae datos de Ahrefs (si la API está configurada)
- Analiza estructura técnica
- Valida schema JSON-LD
- Detecta problemas de cannibalización

### Paso 2: Genera informe
```powershell
npm run generate -- --domain "cliente-a.com" --month "2026-05" --template "auditoria-seo"
```

Resultado: `informes/cliente-a/2026-05.md`

### Paso 3: Revisa el informe
```powershell
cat informes/cliente-a/2026-05.md
```

### Paso 4: Convierte a PDF para el cliente (opcional)
```powershell
# Requiere pandoc instalado
pandoc informes/cliente-a/2026-05.md -o informes/cliente-a/2026-05.pdf

# O desde PowerShell:
$env:PYTHONIOENCODING = "utf-8"
python3 -m pip install md2pdf --break-system-packages
md2pdf informes/cliente-a/2026-05.md
```

### Paso 5: Envía al cliente
- Copiar el PDF a Google Drive
- Compartir enlace con cliente
- Registrar envío en CRM

---

## Workflow 2: Análisis de Keywords Gap

### Paso 1: Configura la auditoría
```powershell
npm run audit -- --domain "cliente-a.com" --competitor "competidor.com" --keywords-gap
```

### Paso 2: Genera informe
```powershell
npm run generate -- --domain "cliente-a.com" --month "2026-05" --template "keywords-gap"
```

Resultado: Comparativa de palabras clave donde el competidor rankea pero no tú.

---

## Workflow 3: Usar como MCP server

### Paso 1: Inicia el servidor
```powershell
cd E:\git\audit-seo
npm start
# Inicia en http://localhost:3001
```

### Paso 2: Configura en Claude Desktop
**Edita:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "audit-seo": {
      "command": "node",
      "args": ["E:/git/audit-seo/server.js"],
      "env": {
        "GSC_CREDENTIALS": "E:/git/audit-seo/credentials/gsc-credentials.json"
      }
    }
  }
}
```

### Paso 3: Reinicia Claude Desktop
Verifica: `/mcp list` → `audit-seo → connected`

### Paso 4: Usa en chat
```
"Ejecuta auditoría SEO completa para cliente-a.com"
"Compara keywords gap entre cliente-a.com y competidor.com"
"Genera informe de mayo para cliente-a.com"
"¿Qué problemas técnicos encontraste en cliente-a.com?"
```

---

## Comandos principales

```powershell
cd E:\git\audit-seo

# Instala deps (primera vez)
npm install

# Recopila datos de auditoría
npm run audit -- --domain "cliente.com"
npm run audit -- --domain "cliente.com" --full
npm run audit -- --domain "cliente.com" --competitor "competidor.com" --keywords-gap

# Genera informe
npm run generate -- --domain "cliente.com" --month "YYYY-MM"
npm run generate -- --domain "cliente.com" --month "YYYY-MM" --template "auditoria-seo"

# MCP server
npm start                    # Inicia MCP server

# Desarrollo
npm run dev                  # (si existe)
```

---

## Estructura de informes generados

### Informe de auditoría SEO
```markdown
# Auditoría SEO — cliente-a.com
## Período: Mayo 2026

### 📊 Resumen ejecutivo
- Tráfico orgánico actual
- Keywords principales
- Problemas críticos encontrados

### 🔴 Problemas críticos
- [Lista de problemas]

### 🟡 Problemas secundarios
- [Lista de problemas]

### ✅ Fortalezas
- [Lo que está bien]

### 📈 Recomendaciones
1. [Acción prioritaria]
2. [Acción secundaria]
```

### Informe de Keywords Gap
```markdown
# Keywords Gap — cliente-a.com vs competidor.com
## Período: Mayo 2026

### Palabras clave donde competidor rankea pero no tú
| Keyword | Vol. | Competidor Pos | Tu Pos | Dificultad |
|---|---|---|---|---|
| keyword 1 | 500 | 3 | N/A | Media |
| keyword 2 | 300 | 5 | N/A | Baja |

### Oportunidades rápidas (baja dificultad)
- [Palabras clave con bajo coste de entrada]
```

---

## Variables de entorno (.env.local)

```
# Google Search Console (requerida)
GSC_CREDENTIALS_PATH=./credentials/gsc-credentials.json

# APIs opcionales
AHREFS_API_KEY=...
SEMRUSH_API_KEY=...

# n8n webhook (para automatización)
N8N_WEBHOOK_URL=https://n8n.iorana.digital/webhook

# Configuración
REPORT_FORMAT=markdown          # markdown, pdf, html
REPORT_LANGUAGE=es              # es, en
MONTHS_TO_ANALYZE=3             # Últimos N meses
```

---

## Integración con n8n

El archivo `n8n-workflow.json` contiene un workflow que:
1. Recibe trigger de horario (diario/semanal)
2. Ejecuta `npm run audit` para cada cliente
3. Genera informes
4. Envía por email

### Para activar:
```powershell
# 1. Abre n8n dashboard
# 2. Crea nuevo workflow
# 3. Importa n8n-workflow.json
# 4. Configura correo electrónico
# 5. Activa el workflow
```

---

## Troubleshooting

### "GSC API error: credentials not found"
```powershell
# Verifica que el archivo existe
dir "credentials/gsc-credentials.json"

# Verifica ruta en .env.local
type .env.local | findstr GSC_CREDENTIALS
```

### "npm run audit devuelve 0 datos"
```powershell
# Verifica que el dominio está en GSC
# Verifica que la API tiene permiso

# Intenta con --verbose
npm run audit -- --domain "cliente.com" --verbose
```

### MCP server no conecta
```powershell
# Verifica que server.js está disponible
node E:\git\audit-seo\server.js

# En otra terminal, testea:
curl http://localhost:3001/health

# Verifica claude_desktop_config.json
type "%APPDATA%\Claude\claude_desktop_config.json"
```

---

## Convenciones

### Nombres de informes
```
informes/cliente-a/2026-05.md          ✅
informes/cliente-a/auditoria-mayo.md   🔴 (usa formato YYYY-MM)
```

### Estructura de datos
```
data/
├── domains/
│   └── cliente-a.com/
│       ├── 2026-05.json        ← Datos crudos del mes
│       └── 2026-04.json
└── keywords/
    └── cliente-a-keywords.json
```

---

## Responsabilidades

✅ **Debe**:
- Recopilar datos de auditoría regularmente
- Generar informes con datos reales
- Validar credenciales de APIs
- Mantener informes organizados por cliente y mes
- Integrar con n8n para automatización

🔴 **NO debe**:
- Inventar datos (siempre datos reales)
- Commitear credenciales al repo
- Editar informes manualmente (regenera desde collect + generate)
- Almacenar informes con datos de múltiples clientes en un archivo

---

## Cuándo necesites...

| Necesidad | Acción |
|---|---|
| Auditoría completa | `npm run audit -- --domain "cliente.com" --full` |
| Keywords gap | `npm run audit -- --domain "..." --competitor "..." --keywords-gap` |
| Generar informe | `npm run generate -- --domain "..." --month "YYYY-MM"` |
| Activar MCP | `npm start` → configure claude_desktop_config.json → restart Claude |
| Automatizar | Configura n8n-workflow.json en n8n dashboard |
| Convertir a PDF | `pandoc informes/cliente-a/2026-05.md -o informe.pdf` |
