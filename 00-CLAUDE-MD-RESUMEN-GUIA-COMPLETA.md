# 📚 RESUMEN DE ESTRUCTURA CLAUDE.md — GUÍA COMPLETA

Documento de referencia para entender la arquitectura de CLAUDE.md y cómo usar cada fichero.

---

## 🎯 QUÉ ES ESTA ESTRUCTURA

Tienes **5 repositorios core** en `E:\git\` que trabajan juntos. Cada uno tiene un `CLAUDE.md` que le dice a Claude Code exactamente qué hacer cuando trabajas en ese proyecto.

El **maestro** (`01-CLAUDE-MAESTRO-Git-Root.md`) orquesta todo. Es el punto de entrada.

---

## 📁 LOS 6 FICHEROS CLAUDE.MD

### 1️⃣ **01-CLAUDE-MAESTRO-Git-Root.md**
**Dónde va:** `E:\git\CLAUDE.md` (en la raíz de git)

**Qué es:** El mapa maestro que conecta todos los repositorios.

**Úsalo cuando:**
- Necesites entender la estructura completa
- No sepas por dónde empezar
- Necesites navegar entre proyectos
- Busques una ruta crítica (landing, auditoría, CRM, etc)

**Contenido:**
- Tabla de los 5 repos + rol de cada uno
- Mapa de io-lib (tu cerebro)
- Rutas críticas para cada tarea
- Comandos rápidos
- Palabras clave que activarán flujos automáticos

---

### 2️⃣ **02-CLAUDE-io-lib.md**
**Dónde va:** `E:\git\io-lib\CLAUDE.md`

**Qué es:** Documentación de tu "brain" — la fuente de verdad.

**Úsalo cuando:**
- Necesites crear un componente → consulta diccionario
- Necesites auditar SEO → ejecuta skills
- Necesites un framework → busca en 01-Estrategia
- Necesites un prompt base → busca en prompts/

**Contenido:**
- Estructura de 6 carpetas (01 a 06)
- Cómo usar io-lib desde otros proyectos
- Qué está en cada carpeta (frameworks, skills, diccionarios)
- Comandos para ejecutar skills SEO

---

### 3️⃣ **03-CLAUDE-iorana-next.md**
**Dónde va:** `E:\git\iorana-next\CLAUDE.md`

**Qué es:** Guía para el SaaS principal (interfaz de usuario).

**Úsalo cuando:**
- Necesites crear un componente reutilizable
- Necesites crear una landing page
- Necesites integrar con Supabase auth
- Necesites validar tipos TypeScript

**Contenido:**
- Cómo crear componentes con TypeScript + Tailwind
- Cómo crear landing pages con SEO + Schema
- Convenciones de código (BEM, Tailwind core)
- Estructura de carpetas (app/, components/, lib/)
- Validación con skills de io-lib

**Workflows completos:**
- Crear componente (paso a paso)
- Crear landing page (paso a paso)

---

### 4️⃣ **04-CLAUDE-io-obsidian.md**
**Dónde va:** `E:\git\io-obsidian\CLAUDE.md`

**Qué es:** Guía para el pipeline de Knowledge Base.

**Úsalo cuando:**
- Necesites scrapear una URL
- Necesites publicar contenido en Astro
- Necesites sincronizar Obsidian a sitio estático
- Necesites editar notas existentes

**Contenido:**
- Estructura del pipeline (Firecrawl → Python → Obsidian → Astro)
- Cómo configurar Firecrawl API
- Estructura de notas YAML (frontmatter)
- Comandos de scraping y sincronización
- Troubleshooting encoding Windows

**Workflows completos:**
- Scrapear URL y publicarla (paso a paso)
- Editar nota publicada (paso a paso)

---

### 5️⃣ **05-CLAUDE-audit-seo.md**
**Dónde va:** `E:\git\audit-seo\CLAUDE.md` (CREAR)

**Qué es:** Guía para el motor de análisis SEO.

**Úsalo cuando:**
- Necesites auditar un dominio
- Necesites generar informe SEO
- Necesites analizar keywords gap
- Necesites activar MCP server

**Contenido:**
- Estructura del proyecto (collect.js, generate.js)
- Cómo configurar credenciales GSC/Ahrefs/Semrush
- Cómo ejecutar auditorías
- Cómo generar informes por cliente
- Cómo integrar como MCP server
- Integración con n8n para automatización

**Workflows completos:**
- Auditoría SEO completa (paso a paso)
- Análisis keywords gap (paso a paso)
- Activar como MCP server (paso a paso)

---

### 6️⃣ **06-CLAUDE-io-crm.md**
**Dónde va:** `E:\git\io-crm\CLAUDE.md` (CREAR)

**Qué es:** Guía para el CRM y captación de leads.

**Úsalo cuando:**
- Necesites crear un formulario de contacto
- Necesites crear un dashboard de leads
- Necesites integrar WhatsApp
- Necesites automatizar con n8n

**Contenido:**
- Estructura del proyecto (forms, dashboard, lib)
- Cómo crear formularios con Supabase
- Cómo crear dashboard de leads en tiempo real
- Cómo integrar WhatsApp Business API
- Cómo trigger automaciones en n8n

**Workflows completos:**
- Crear formulario de contacto (paso a paso)
- Crear dashboard de leads (paso a paso)
- Integración WhatsApp (paso a paso)

---

## 🗺️ MAPA VISUAL DE CÓMO USAN LOS REPOSITORIOS ESTOS CLAUDEMDS

```
Usuario dice en chat:
    ↓
"Crea una landing de servicios"
    ↓
Claude Code lee 01-CLAUDE-MAESTRO
    ↓
"Esta es una tarea de iorana-next"
    ↓
Claude Code lee 03-CLAUDE-iorana-next.md
    ↓
Lee Master-Framework-Landing-Pages-2026.md (en io-lib)
    ↓
Lee H_Diccionario-Componentes-Iorana.md (en io-lib)
    ↓
Lee Framework-Schema_LANDINGS_2026-2027.md (en io-lib)
    ↓
Crea en E:\git\iorana-next\app\servicios\
    ↓
Valida con skill dev-validator.skill.md (en io-lib)
    ↓
Commit con formato Conventional Commits
```

---

## 🎯 TABLA DE ACTIVACIÓN POR FRASE

Cuando el usuario dice... → Claude Code entiende:

| Frase del usuario | Repo principal | CLAUDE.md | Framework |
|---|---|---|---|
| "Crea una landing..." | iorana-next | 03 | Master-Framework-Landing-Pages |
| "Crea componente X" | iorana-next | 03 | H_Diccionario-Componentes |
| "Audita cliente.com" | audit-seo | 05 | Master-Framework-Analisis-Tecnico |
| "Scrape URL" | io-obsidian | 04 | firecrawl_to_obsidian.py |
| "Dashboard de leads" | io-crm | 06 | N/A (nuevo) |
| "Formulario contacto" | io-crm | 06 | N/A (nuevo) |
| "Schema JSON-LD" | iorana-next | 03 | Framework-Schema_LANDINGS |
| "Componente Card" | iorana-next | 03 | H_Diccionario (patron) |

---

## 📋 CHECKLIST DE INSTALACIÓN

Aquí te digo dónde copiar/pegar cada archivo:

### Fichero 1: Maestro
**Contenido:** `01-CLAUDE-MAESTRO-Git-Root.md`  
**Destino:** `E:\git\CLAUDE.md`  
**Cómo:** Copia el contenido del archivo descargable y pégalo

### Fichero 2: io-lib
**Contenido:** `02-CLAUDE-io-lib.md`  
**Destino:** `E:\git\io-lib\CLAUDE.md`  
**Cómo:** Reemplaza el actual (si existe) con este

### Fichero 3: iorana-next
**Contenido:** `03-CLAUDE-iorana-next.md`  
**Destino:** `E:\git\iorana-next\CLAUDE.md`  
**Cómo:** Reemplaza el actual con este (mejora del actual)

### Fichero 4: io-obsidian
**Contenido:** `04-CLAUDE-io-obsidian.md`  
**Destino:** `E:\git\io-obsidian\CLAUDE.md`  
**Cómo:** Reemplaza el actual con este (mejora del actual)

### Fichero 5: audit-seo
**Contenido:** `05-CLAUDE-audit-seo.md`  
**Destino:** `E:\git\audit-seo\CLAUDE.md`  
**Cómo:** Crea nuevo (no existe aún)

### Fichero 6: io-crm
**Contenido:** `06-CLAUDE-io-crm.md`  
**Destino:** `E:\git\io-crm\CLAUDE.md`  
**Cómo:** Crea nuevo (no existe aún)

---

## 🚀 CÓMO USAR CADA CLAUDEMD DESDE CLAUDE CODE

### Cuando abres `E:\git\iorana-next\`:
Claude Code automáticamente lee `03-CLAUDE-iorana-next.md` y sabe:
- ✅ Cómo crear componentes
- ✅ Dónde están los diccionarios
- ✅ Cómo validar SEO
- ✅ Convenciones de código

Si dices "Crea un Button", Claude Code:
1. Consulta el diccionario (desde 02-CLAUDE-io-lib)
2. Mira estructura de tipos
3. Crea en `components/ui/Button.tsx`
4. Usa Tailwind core
5. Valida con skill

### Cuando abres `E:\git\audit-seo\`:
Claude Code automáticamente lee `05-CLAUDE-audit-seo.md` y sabe:
- ✅ Cómo ejecutar auditorías
- ✅ Credenciales requeridas
- ✅ Estructura de informes
- ✅ Integración con MCP

Si dices "Audita cliente-a.com", Claude Code:
1. Verifica credenciales GSC
2. Ejecuta `npm run audit --domain cliente-a.com`
3. Genera `npm run generate --domain cliente-a.com`
4. Guarda en `informes/cliente-a/`

### Cuando abres `E:\git\`:
Claude Code lee `01-CLAUDE-MAESTRO-Git-Root.md` y sabe:
- ✅ Todos los repos y sus roles
- ✅ Qué framework usar para cada tarea
- ✅ Cómo navegar entre proyectos
- ✅ Comandos rápidos

---

## 🔄 CICLOS DE ACTUALIZACIÓN

Estos CLAUDE.md deben actualizarse cuando:

| Evento | Archivo a actualizar | Acción |
|---|---|---|
| Añades nueva carpeta a io-lib | 02-CLAUDE-io-lib | Actualiza estructura |
| Creas nuevo skill | 02-CLAUDE-io-lib | Documenta acción |
| Cambias convención en iorana-next | 03-CLAUDE-iorana-next | Actualiza sección de convenciones |
| Añades nuevo workflow a io-obsidian | 04-CLAUDE-io-obsidian | Documenta pasos |
| Añades nueva API (Ahrefs, etc) a audit-seo | 05-CLAUDE-audit-seo | Documenta credenciales |
| Añades nueva tabla en io-crm | 06-CLAUDE-io-crm | Documenta tipos + interfaz |

---

## 💡 TIPS DE USO

### 1. Siempre lee el CLAUDE.md del repo en el que trabajas
```
Si estoy en iorana-next → Leo 03-CLAUDE-iorana-next.md
Si estoy en audit-seo → Leo 05-CLAUDE-audit-seo.md
Si no sé por dónde empezar → Leo 01-CLAUDE-MAESTRO
```

### 2. Los workflows están paso a paso
Cada CLAUDE.md específico (03-06) tiene **workflows completos** con comandos listos para copiar.

Ejemplo en 03-CLAUDE-iorana-next:
```
Paso 1: Lee diccionario
Paso 2: Crea archivo
Paso 3: Implementa con código
Paso 4: Valida
Paso 5: Commit
```

### 3. Las rutas críticas están en el maestro
Si no sabes qué hacer, abre `01-CLAUDE-MAESTRO` y busca:
- "Cuando trabajes en iorana-next"
- "Cuando realices auditoría SEO"
- "Cuando scrapees contenido"

### 4. Cada repo tiene sus variables de entorno
```
io-obsidian → FIRECRAWL_API_KEY, OBSIDIAN_VAULT
audit-seo → GSC_CREDENTIALS, AHREFS_API_KEY
io-crm → VITE_SUPABASE_URL, WHATSAPP_API_TOKEN
```

El CLAUDE.md de cada repo lo documenta.

---

## ⚡ RESUMEN EJECUTIVO

| CLAUDE.md | Destino | Rol | Úsalo para |
|---|---|---|---|
| **01-Maestro** | `E:\git\CLAUDE.md` | Orquestador | Navegar todos los repos |
| **02-io-lib** | `E:\git\io-lib\CLAUDE.md` | Cerebro | Acceder a frameworks y skills |
| **03-iorana-next** | `E:\git\iorana-next\CLAUDE.md` | SaaS | Landing pages, componentes |
| **04-io-obsidian** | `E:\git\io-obsidian\CLAUDE.md` | KB | Scraping y publicación |
| **05-audit-seo** | `E:\git\audit-seo\CLAUDE.md` | Análisis | Auditorías y reportes |
| **06-io-crm** | `E:\git\io-crm\CLAUDE.md` | CRM | Formularios y leads |

---

**Próximos pasos:**
1. Descarga los 6 archivos
2. Cópia cada uno a su destino en `E:\git\`
3. Abre Claude Code en cualquier repo
4. Claude automáticamente cargará el CLAUDE.md correcto
5. Prueba: Di "Crea una landing" en iorana-next
