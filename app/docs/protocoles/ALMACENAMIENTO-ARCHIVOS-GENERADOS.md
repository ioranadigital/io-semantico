# 📌 PROTOCOLO: Almacenamiento de Archivos Generados

**Status:** ✅ OBLIGATORIO | Versión: 1.0 | Fecha: 2026-06-11

---

## 🎯 REGLA ABSOLUTA

**Cuando Claude Code genera un archivo (no es código):**

- 📄 Instrucciones
- 🗄️ Esquemas de base de datos (.sql)
- 📊 Análisis, reportes, auditorías
- 🔌 Especificaciones de API
- 🏗️ Diagramas de arquitectura
- 🚀 Guías de deployment
- 📝 Documentación operacional

**SIEMPRE → Guardar en `docs/` del proyecto**

---

## 📂 ESTRUCTURA DE docs/ EN EL PROYECTO

```
[PROYECTO]/docs/
├── instructions/          (Instrucciones, README, guías)
├── database/              (Migraciones SQL, esquemas)
├── analysis/              (Auditorías, reportes)
├── api/                   (OpenAPI specs, endpoints)
├── architecture/          (Diagramas, flujos)
├── deployment/            (Docker, deployment guides)
└── generated/             (Otros archivos generados)
```

---

## 📋 MAPA: TIPO DE ARCHIVO → CARPETA

| Tipo de Archivo         | Carpeta              | Ejemplo             |
| ----------------------- | -------------------- | ------------------- |
| Instrucciones, README   | `docs/instructions/` | INSTRUCCION-\*.md   |
| Migraciones SQL         | `docs/database/`     | MIGRATION-\*.sql    |
| Esquemas BD             | `docs/database/`     | SCHEMA.md           |
| Auditorías SEO          | `docs/analysis/`     | AUDIT-CLIENTE-\*.md |
| Reports                 | `docs/analysis/`     | REPORT-\*.md        |
| OpenAPI specs           | `docs/api/`          | openapi.json        |
| Diagramas ASCII/Mermaid | `docs/architecture/` | DIAGRAMA-\*.md      |
| Docker Compose          | `docs/deployment/`   | docker-compose.yml  |
| Guías deployment        | `docs/deployment/`   | DEPLOYMENT-\*.md    |
| Otros                   | `docs/generated/`    | [varios]            |

---

## 🚀 PROTOCOLO: GENERAR Y GUARDAR

**Cuando Claude Code genere un archivo:**

```
┌──────────────────────────────────────────┐
│ 1. DETERMINAR TIPO                       │
│    ¿Qué es? (instrucción, SQL, diagrama) │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ 2. ELEGIR CARPETA CORRECTA               │
│    (Ver tabla arriba)                    │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ 3. CREAR /docs/ SI NO EXISTE             │
│    mkdir -p [PROYECTO]/docs/[carpeta]    │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ 4. GUARDAR CON NOMBRE ESTÁNDAR           │
│    docs/[carpeta]/[TIPO]-[NOMBRE].md     │
│    docs/[carpeta]/[TIPO]-[NOMBRE].sql    │
└──────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────┐
│ 5. REPORTAR UBICACIÓN                    │
│    ✅ Guardado en: docs/[ruta]/[archivo] │
└──────────────────────────────────────────┘
```

---

## 📝 EJEMPLOS REALES

### **Instrucción nueva para setup**

```
Generado: Guía de instalación Node.js
Tipo: Instrucción
Carpeta: docs/instructions/
Nombre: INSTRUCCION-NODE-SETUP.md
Resultado: docs/instructions/INSTRUCCION-NODE-SETUP.md
```

### **Migración de base de datos**

```
Generado: Crear tabla usuarios
Tipo: Migración SQL
Carpeta: docs/database/
Nombre: MIGRATION-2026-06-11-CREATE-USERS.sql
Resultado: docs/database/MIGRATION-2026-06-11-CREATE-USERS.sql
```

### **Auditoría SEO**

```
Generado: Análisis SEO cliente XANELUM
Tipo: Análisis
Carpeta: docs/analysis/
Nombre: AUDIT-XANELUM-2026-06-11.md
Resultado: docs/analysis/AUDIT-XANELUM-2026-06-11.md
```

### **Diagrama de arquitectura**

```
Generado: Flujo de datos del sistema
Tipo: Diagrama
Carpeta: docs/architecture/
Nombre: DIAGRAMA-DATA-FLOW.md
Resultado: docs/architecture/DIAGRAMA-DATA-FLOW.md
```

### **Especificación de API**

```
Generado: OpenAPI spec para endpoints
Tipo: API spec
Carpeta: docs/api/
Nombre: openapi.json
Resultado: docs/api/openapi.json
```

---

## ✅ VALIDACIÓN: ¿DÓNDE VA ESTE ARCHIVO?

**Checklist antes de guardar:**

```
[ ] ¿Es código (src/, components/, lib/)?
    → NO va en docs/

[ ] ¿Es configuración (.env, tsconfig.json)?
    → NO va en docs/ (va en raíz)

[ ] ¿Es tests?
    → NO va en docs/ (va en tests/ o src/)

[ ] ¿Es instrucción/guía/README?
    → ✅ docs/instructions/

[ ] ¿Es esquema BD o migración SQL?
    → ✅ docs/database/

[ ] ¿Es auditoría, reporte, análisis?
    → ✅ docs/analysis/

[ ] ¿Es especificación de API?
    → ✅ docs/api/

[ ] ¿Es diagrama, arquitectura?
    → ✅ docs/architecture/

[ ] ¿Es Docker, deployment?
    → ✅ docs/deployment/

[ ] ¿Otro tipo de documento?
    → ✅ docs/generated/
```

---

## 🔄 CREACIÓN AUTOMÁTICA DE /docs/

Si `/docs/` no existe, **se crea automáticamente** con estructura:

```powershell
# Verificar si existe docs/
if (-not (Test-Path "E:\git\[PROYECTO]\docs")) {
    # Crear estructura
    mkdir "E:\git\[PROYECTO]\docs\{instructions,database,analysis,api,architecture,deployment,generated}"

    # Crear .gitkeep en cada carpeta
    @("instructions", "database", "analysis", "api", "architecture", "deployment", "generated") |
    ForEach-Object {
        New-Item "E:\git\[PROYECTO]\docs\$_\.gitkeep" -Force | Out-Null
    }
}
```

---

## 🎯 CONVENCIÓN DE NOMBRES

**Formato:** `[TIPO]-[DESCRIPCION]-[VERSION/FECHA].ext`

### **Instrucciones**

```
INSTRUCCION-NODE-SETUP.md
INSTRUCCION-DATABASE-MIGRATION.md
INSTRUCCION-DOCKER-BUILD.md
```

### **Migraciones SQL**

```
MIGRATION-2026-06-11-CREATE-USERS.sql
MIGRATION-2026-06-12-ADD-ROLES.sql
```

### **Auditorías**

```
AUDIT-XANELUM-2026-06-11.md
AUDIT-PERFORMANCE-2026-06-10.md
```

### **Reportes**

```
REPORT-MONTHLY-2026-06.md
REPORT-SECURITY-SCAN-2026-06-11.md
```

### **Diagramas**

```
DIAGRAMA-ARCHITECTURE.md
DIAGRAMA-DATA-FLOW.md
DIAGRAMA-API-FLOW.md
```

---

## 📌 INTEGRACIÓN EN CLAUDE.md

Este protocolo debe estar documentado en TODOS los CLAUDE.md:

```markdown
---
## PROTOCOLO: Almacenamiento de Archivos Generados

Todos los archivos generados (no código) van en `docs/` del proyecto:
  - Instrucciones → docs/instructions/
  - SQL/BD → docs/database/
  - Análisis → docs/analysis/
  - API specs → docs/api/
  - Diagramas → docs/architecture/
  - Deployment → docs/deployment/
  - Otros → docs/generated/

Referencia: E:\git\app\docs\protocoles\ALMACENAMIENTO-ARCHIVOS-GENERADOS.md
---
```

---

## ❌ QUÉ NO VA EN docs/

```
❌ Código fuente (.ts, .tsx, .py)
❌ Componentes React
❌ Utilidades / helpers
❌ Archivos de configuración (.env, tsconfig.json)
❌ package.json, package-lock.json
❌ .eslintrc, prettier.config.js
❌ Tests (van en tests/ o src/)
❌ node_modules (ignorado)
❌ .git (ignorado)
```

---

## ✅ CHECKLIST: GENERAR ARCHIVO

Cada vez que Claude Code genera un documento:

- [ ] ¿Es archivo generado (no código)?
- [ ] ¿Determiné el tipo correcto?
- [ ] ¿Elegí la carpeta correcta en docs/?
- [ ] ¿docs/ existe o la creo?
- [ ] ¿Guardé con nombre estándar [TIPO]-[NOMBRE]?
- [ ] ¿Reporté ubicación exacta?
- [ ] ¿Actualicé índice si es aplicable?

**Si respondiste "NO" a cualquiera → CORREGIR ANTES DE CONTINUAR**

---

**Documento:** PROTOCOLO-ALMACENAMIENTO-ARCHIVOS-GENERADOS.md
**Status:** ✅ OBLIGATORIO
**Criticidad:** 🔴 ALTA
**Versión:** 1.0
