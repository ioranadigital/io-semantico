# Automatización de Contenidos - esgarden

## Flujo de Automatización Completo

### Requisitos Previos
```bash
# 1. Instalar dependencias
pip install python-dotenv requests

# 2. Configurar credenciales
# - Crear credentials.json (Service Account de Google) en esta carpeta
# - Llenar placeholders en .env
```

### Paso 1: Configurar MCP Server (Google Drive)
```bash
cd e:\git\clientes\esgarden
npx @modelcontextprotocol/server-google-drive --config mcp-config.json
```

### Paso 2: Ejecutar Agente de Extracción de Contenidos
```bash
# Usando Claude Code (el agente está en e:/mcp/agents/)
claude agent run e:/mcp/agents/content-fetcher-esgarden.md

# Salida: content_output.json (en e:/git/clientes/esgarden/)
```

### Paso 3: Optimizar Contenido (Manual o Automático)
El agente `content-fetcher` genera un archivo JSON con:
- Contenido extraído de Drive
- Estructura SEO optimizada
- Schema JSON-LD
- Recomendaciones de mejora

Archivo generado: `e:/git/clientes/esgarden/content_output.json`

### Paso 4: Publicar en WordPress
```bash
# Navegar a carpeta del cliente
cd e:\git\clientes\esgarden

# Ejecutar publicador con archivo JSON
python wp_publisher.py content_output.json

# Salida: Posts creados como DRAFT en WordPress
# URL: https://www.esgarden.es/wp-admin/edit.php?post_status=draft
```

## Automatización Completa (One-Command)

### Opción A: Manual Step-by-Step
```bash
# Terminal 1: MCP Server
cd e:\git\clientes\esgarden
npx @modelcontextprotocol/server-google-drive --config mcp-config.json

# Terminal 2: Agente + Publisher
claude agent run e:/mcp/agents/content-fetcher-esgarden.md
python wp_publisher.py content_output.json
```

### Opción B: Script de Automatización (n8n o bash)
```bash
# A implementar: webhook que dispare el flujo completo
# Trigger: nuevo archivo en carpeta Drive de esgarden
# → Ejecutar agente → Publicar en WordPress
```

## Estructura de Carpetas
```
e:/mcp/
└── agents/
    └── content-fetcher-esgarden.md     (Agente SEO)

e:/git/clientes/
└── esgarden/
    ├── mcp-config.json                 (Configuración MCP)
    ├── credentials.json                (Service Account - NO SUBIR A GIT)
    ├── .env                            (Credenciales WordPress - NO SUBIR A GIT)
    ├── wp_publisher.py                 (Script publicador)
    ├── content_output.json              (Salida del agente)
    └── README.md                       (Este archivo)
```

## Troubleshooting

### Error: "GOOGLE_APPLICATION_CREDENTIALS no válido"
- Verificar que `credentials.json` existe en `e:/git/clientes/esgarden/`
- Verificar permisos del archivo
- Verificar email de Service Account en Google Drive

### Error: "Credenciales de WordPress inválidas"
- Generar App Password en: `https://www.esgarden.es/wp-admin/admin.php?page=security`
- Verificar usuario tiene permiso para crear posts
- Actualizar `.env` con credenciales correctas

### El agente no encuentra archivos en Drive
- Verificar que la carpeta de esgarden está compartida con el email de Service Account
- Verificar `DRIVE_FOLDER_ID` en `.env`
- Revisar permisos: debe tener al menos lectura

## Próximas Mejoras
- [ ] Integración con n8n para triggers automáticos
- [ ] Webhooks para publicación inmediata
- [ ] Dashboard de monitoreo de publicaciones
- [ ] Validación automática de SEO pre-publicación
