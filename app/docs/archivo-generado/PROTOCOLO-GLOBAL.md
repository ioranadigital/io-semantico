# 📦 PROTOCOLO GLOBAL: Gestión de Archivos Generados

**Status:** ✅ OBLIGATORIO | Versión: 1.0 | Fecha: 2026-06-11

---

## 🎯 PRINCIPIO FUNDAMENTAL

**Todo archivo generado por Claude Code (que no es código de la aplicación) debe ir en `docs/`**

Esto incluye:

- 📄 Instrucciones y documentación
- 🗄️ Migraciones y esquemas SQL
- 📊 Análisis y reportes
- 🔌 Especificaciones API
- 🏗️ Diagramas de arquitectura
- 🚀 Guías de deployment

---

## 📂 ESTRUCTURA ESTÁNDAR DE /docs/

```
[PROYECTO]/docs/
├── instructions/       # Instrucciones, README, guías
├── database/           # Migraciones SQL, esquemas
├── analysis/           # Auditorías, reportes
├── api/                # OpenAPI specs, endpoints
├── architecture/       # Diagramas, flujos
├── deployment/         # Docker, deployment guides
└── generated/          # Otros archivos generados
```

---

## 🗺️ MAPA: TIPO → CARPETA

| Tipo          | Carpeta         | Prefijo        | Ejemplo                                 |
| ------------- | --------------- | -------------- | --------------------------------------- |
| Instrucción   | `instructions/` | `INSTRUCCION-` | `INSTRUCCION-SETUP.md`                  |
| Migración SQL | `database/`     | `MIGRATION-`   | `MIGRATION-2026-06-11-CREATE-USERS.sql` |
| Esquema       | `database/`     | `SCHEMA`       | `SCHEMA.md`                             |
| Auditoría     | `analysis/`     | `AUDIT-`       | `AUDIT-XANELUM-2026-06-11.md`           |
| Reporte       | `analysis/`     | `REPORT-`      | `REPORT-MONTHLY-2026-06.md`             |
| OpenAPI       | `api/`          | `openapi`      | `openapi.json`                          |
| Diagrama      | `architecture/` | `DIAGRAMA-`    | `DIAGRAMA-FLOW.md`                      |
| Docker        | `deployment/`   | `docker`       | `docker-compose.yml`                    |
| Deploy Guide  | `deployment/`   | `DEPLOYMENT-`  | `DEPLOYMENT-HETZNER.md`                 |

---

## 🚀 FLUJO DE GENERACIÓN

```
1. Claude Code genera archivo
   ↓
2. Determina tipo (instrucción, SQL, diagrama, etc)
   ↓
3. Elige carpeta correcta en docs/
   ↓
4. Crea docs/ si no existe
   ↓
5. Guarda con nombre estándar [TIPO]-[NOMBRE]
   ↓
6. Reporta: ✅ Guardado en: docs/[carpeta]/[archivo]
```

---

## ✅ CHECKLIST: ANTES DE GENERAR

Antes de crear cualquier archivo:

```
[ ] ¿Es código que se ejecuta? → NO va en docs/
[ ] ¿Es configuración del proyecto? → NO va en docs/
[ ] ¿Es un test? → NO va en docs/
[ ] ¿Es documentación/instrucción? → ✅ docs/instructions/
[ ] ¿Es SQL/migración? → ✅ docs/database/
[ ] ¿Es análisis/reporte? → ✅ docs/analysis/
[ ] ¿Es especificación API? → ✅ docs/api/
[ ] ¿Es diagrama/arquitectura? → ✅ docs/architecture/
[ ] ¿Es deployment/Docker? → ✅ docs/deployment/
[ ] ¿Otro documento? → ✅ docs/generated/
```

---

## ❌ QUÉ NO VA EN docs/

```
❌ Código fuente (.ts, .tsx, .py, .js)
❌ Componentes React/Vue/etc
❌ Funciones y utilidades
❌ Tests
❌ .env, tsconfig.json, .eslintrc.json
❌ package.json, pnpm-lock.yaml
❌ node_modules
❌ .git, .github (excepto CI/CD docs)
```

---

## 🎯 EJEMPLOS REALES

### **Instrucción: Cómo instalar Node.js**

```
Generado por: Claude Code
Archivo: Guía de instalación Node.js
Carpeta: docs/instructions/
Nombre: INSTRUCCION-NODE-SETUP.md
Ubicación final: docs/instructions/INSTRUCCION-NODE-SETUP.md

Reporte:
✅ Guardado en: docs/instructions/INSTRUCCION-NODE-SETUP.md
```

### **Migración: Crear tabla usuarios**

```
Generado por: Claude Code
Archivo: CREATE TABLE users...
Carpeta: docs/database/
Nombre: MIGRATION-2026-06-11-CREATE-USERS.sql
Ubicación final: docs/database/MIGRATION-2026-06-11-CREATE-USERS.sql

Reporte:
✅ Guardado en: docs/database/MIGRATION-2026-06-11-CREATE-USERS.sql
```

### **Auditoría SEO: Cliente XANELUM**

```
Generado por: Claude Code
Archivo: Análisis SEO completo
Carpeta: docs/analysis/
Nombre: AUDIT-XANELUM-2026-06-11.md
Ubicación final: docs/analysis/AUDIT-XANELUM-2026-06-11.md

Reporte:
✅ Guardado en: docs/analysis/AUDIT-XANELUM-2026-06-11.md
```

### **Diagrama: Flujo de datos**

```
Generado por: Claude Code
Archivo: Diagrama ASCII/Mermaid
Carpeta: docs/architecture/
Nombre: DIAGRAMA-DATA-FLOW.md
Ubicación final: docs/architecture/DIAGRAMA-DATA-FLOW.md

Reporte:
✅ Guardado en: docs/architecture/DIAGRAMA-DATA-FLOW.md
```

---

## 🔄 CREACIÓN AUTOMÁTICA DE /docs/

Si `/docs/` no existe, **se crea automáticamente**:

```powershell
# Verificar si existe docs/
if (-not (Test-Path "[PROYECTO]\docs")) {
    # Crear todas las carpetas
    @("instructions", "database", "analysis", "api", "architecture", "deployment", "generated") |
    ForEach-Object {
        New-Item "[PROYECTO]\docs\$_" -ItemType Directory -Force | Out-Null
        New-Item "[PROYECTO]\docs\$_\.gitkeep" -Force | Out-Null
    }

    Write-Host "✅ /docs/ creada con estructura completa"
}
```

---

## 📌 CONVENCIÓN DE NOMBRES

**Formato:** `[TIPO]-[DESCRIPCION]-[FECHA].ext`

### **Ejemplos válidos**

```
INSTRUCCION-DATABASE-BACKUP.md
MIGRATION-2026-06-11-ADD-ROLES.sql
AUDIT-PERFORMANCE-2026-06-10.md
REPORT-MONTHLY-2026-06.md
DIAGRAMA-ARCHITECTURE.md
DEPLOYMENT-DOCKER-BUILD.md
openapi-v1.json
```

### **Ejemplos inválidos**

```
❌ setup.md (sin tipo ni fecha)
❌ instruccion.md (sin descripción)
❌ database.sql (nombre genérico)
❌ audit.md (sin cliente/proyecto)
```

---

## 🎯 INTEGRACIÓN EN TODOS LOS CLAUDE.md

Este protocolo debe estar en TODOS los `CLAUDE.md`:

```markdown
---

## PROTOCOLO: Almacenamiento de Archivos Generados

Todos los archivos NO-CÓDIGO se guardan en `docs/` del proyecto:

- Instrucciones → `docs/instructions/INSTRUCCION-*.md`
- SQL/Migraciones → `docs/database/MIGRATION-*.sql`
- Análisis/Reportes → `docs/analysis/AUDIT-*.md` o `REPORT-*.md`
- Especificaciones API → `docs/api/openapi.json`
- Diagramas → `docs/architecture/DIAGRAMA-*.md`
- Deployment → `docs/deployment/docker-compose.yml`
- Otros → `docs/generated/*`

Si `/docs/` no existe, se crea automáticamente con estructura.

Referencia completa: E:\git\app\docs\archivo-generado\PROTOCOLO-GLOBAL.md

---
```

---

## ✅ VALIDACIÓN FINAL

Cada vez que generes un archivo:

- [ ] Determiné el tipo correcto
- [ ] Elegí carpeta correcta en docs/
- [ ] Creé docs/ si no existía
- [ ] Guardé con nombre estándar [TIPO]-[NOMBRE]
- [ ] Reporté ubicación exacta
- [ ] NO es código/tests/config
- [ ] Está versionado en git

---

## 🚀 BENEFICIOS

✅ **Centralizado:** Toda documentación en un lugar  
✅ **Organizado:** Estructura clara por tipo  
✅ **Versionado:** Todo en git  
✅ **Mantenible:** Fácil de encontrar y actualizar  
✅ **Escalable:** Crece con el proyecto

---

**Documento:** PROTOCOLO-GLOBAL.md
**Status:** ✅ OBLIGATORIO
**Criticidad:** 🔴 ALTA
**Versión:** 1.0
**Fecha:** 2026-06-11
