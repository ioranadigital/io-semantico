# 🚀 INSTRUCCIÓN: Crear Nuevo Proyecto con CLAUDE.md

**Status:** ✅ OBLIGATORIA | Versión: 1.0 | Fecha: 2026-06-11

---

## 📌 REGLA CRÍTICA

**Cada vez que se crea un nuevo proyecto, SIEMPRE se debe crear E:\git\[PROYECTO]\CLAUDE.md**

Si no existe CLAUDE.md:

- ❌ Proyecto INCOMPLETO
- ❌ No tiene instrucciones claras
- ❌ Conflictos de puerto (no lee master.env)
- ❌ No sigue protocolos globales

---

## ✅ CHECKLIST: CREAR NUEVO PROYECTO

Cuando crees un nuevo proyecto, sigue EXACTAMENTE estos pasos:

### **Paso 1: Crear estructura de carpeta**

```bash
mkdir -p E:\git\app\[TIPO]\[NOMBRE]
cd E:\git\app\[TIPO]\[NOMBRE]

Dónde:
  [TIPO] = interno | tools | clientes
  [NOMBRE] = nombre del proyecto (kebab-case)

Ejemplo:
  E:\git\app\tools\io-nuevo-proyecto
  E:\git\app\interno\app-cliente-xyz
```

### **Paso 2: Crear CLAUDE.md (OBLIGATORIO)**

Crear archivo: `E:\git\app\[TIPO]\[NOMBRE]\CLAUDE.md`

**Contenido mínimo:**

````markdown
# [NOMBRE] — GUÍA MAESTRO

**Proyecto:** [NOMBRE]
**Tipo:** [interno|tools|cliente]
**Versión:** 1.0 | Fecha: 2026-06-11
**Status:** ✅ En desarrollo

---

## Propósito

[Descripción breve del proyecto]

---

## Stack

- Framework principal: Next.js 15 | React | Node.js | Python
- Lenguaje: TypeScript
- Estilos: Tailwind CSS v4
- BD: Supabase
- Package manager: pnpm
- Deployment: [Vercel|Hetzner|Self-hosted]

---

## Puertos (desde E:\master.env)

[PROYECTO]\_FRONTEND_PORT = [PUERTO]
[PROYECTO]\_BACKEND_PORT = [PUERTO]

---

## PROTOCOLO GLOBAL: Almacenamiento de Archivos Generados

REGLA ABSOLUTA: Todos los archivos generados van en docs/[tipo]/ del proyecto.

Si docs/ no existe, se crea automaticamente:

- docs/instructions/ (Instrucciones, README)
- docs/database/ (SQL migrations, schemas)
- docs/analysis/ (Audits, reports)
- docs/api/ (OpenAPI specs)
- docs/architecture/ (Diagramas)
- docs/deployment/ (Deploy, Docker)
- docs/generated/ (Otros)

Documentacion: E:\git\app\PROTOCOLO-GLOBAL-ARCHIVOS.md

---

## INSTRUCCION CRITICA: Leer Master.env al iniciar servidores

OBLIGATORIO cada vez que inicie servidores:

1. LEER E:\master.env (PRIMERO - OBLIGATORIO)
2. EXTRAER puertos: [PROYECTO]\_FRONTEND_PORT, [PROYECTO]\_BACKEND_PORT
3. VERIFICAR: . E:\scripts\verify-ports.ps1
4. REUTILIZAR procesos existentes (NO reiniciar)
5. INICIAR solo los faltantes
6. USAR puerto EXACTO de master.env (NO automatico)

Documentacion: E:\git\app\INSTRUCCION-LEER-MASTER-ENV.md

---

## Comandos principales

```bash
pnpm install      # Instalar dependencias
pnpm dev          # Servidor development
pnpm build        # Build producción
pnpm lint         # Validación de código
pnpm test         # Ejecutar tests
```
````

---

## Documentación

- Master Constitutional: E:\CLAUDE.md
- Orquestación Monorepo: E:\git\CLAUDE.md

---

**Versión:** 1.0
**Status:** ✅ Operacional
**Fecha:** 2026-06-11

````

### **Paso 3: Agregar a master.env**

Agregar puertos al archivo E:\master.env:

```env
# --- [NOMBRE] ([DESCRIPCION])
[PROYECTO]_FRONTEND_PORT=PORT_NUMBER
[PROYECTO]_BACKEND_PORT=PORT_NUMBER
[PROYECTO]_ENV=development
````

**Ejemplo:**

```env
# --- IO-NUEVO (Proyecto nuevo)
IO_NUEVO_FRONTEND_PORT=3010
IO_NUEVO_BACKEND_PORT=4010
IO_NUEVO_ENV=development
```

### **Paso 4: Crear estructura de carpetas**

```
[PROYECTO]/
├── CLAUDE.md (YA CREADO)
├── docs/
│   ├── instructions/
│   ├── database/
│   ├── analysis/
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── generated/
├── src/
│   ├── app/ (Next.js)
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── types/
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── prettier.config.js
└── README.md
```

### **Paso 5: Crear package.json**

```json
{
  "name": "[proyecto-name]",
  "version": "1.0.0",
  "description": "[Descripción]",
  "main": "src/index.ts",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "test": "jest"
  },
  "dependencies": {
    "react": "^19.0.0",
    "next": "15.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "typescript": "^5.6.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### **Paso 6: Agregar a pnpm-workspace.yaml**

Actualizar E:\git\pnpm-workspace.yaml:

```yaml
packages:
  - "lib"
  - "iorana-next"
  - "audit-seo"
  - "io-obsidian"
  - "io-crm"
  - "scripts"
  - "app/tools/[nuevo-proyecto]" # ← AGREGAR AQUÍ
```

### **Paso 7: Validar y confirmar**

```bash
# Instalar dependencias
pnpm install

# Validar TypeScript
tsc --noEmit

# Validar linting
pnpm run lint

# Si todo OK → Proyecto listo
```

---

## 🎯 CHECKLIST FINAL

Antes de considerar proyecto "creado":

- [ ] Carpeta E:\git\app\[TIPO]\[NOMBRE] existe
- [ ] CLAUDE.md creado con contenido mínimo
- [ ] Puertos agregados a master.env
- [ ] Carpeta docs/ con estructura completa
- [ ] package.json con scripts correctos
- [ ] Agregado a pnpm-workspace.yaml
- [ ] pnpm install ejecutado sin errores
- [ ] tsc --noEmit valida sin errores
- [ ] README.md con instrucciones de inicio
- [ ] CLAUDE.md incluye todas las instrucciones globales

**Si FALTA cualquiera de estos → PROYECTO INCOMPLETO**

---

## ❌ ERRORES COMUNES

```
MALO:
❌ Crear carpeta sin CLAUDE.md
❌ No agregar puertos a master.env
❌ No crear estructura docs/
❌ No agregar a pnpm-workspace.yaml
❌ CLAUDE.md sin instrucciones globales

CORRECTO:
✅ CLAUDE.md creado PRIMERO
✅ Puertos en master.env
✅ Estructura docs/ completa
✅ En pnpm-workspace.yaml
✅ CLAUDE.md con protocolo global + instrucción master.env
```

---

## 📝 EJEMPLO REAL

Crear nuevo proyecto `io-analytics`:

```bash
# 1. Crear carpeta
mkdir -p E:\git\app\tools\io-analytics

# 2. Crear CLAUDE.md (con contenido anterior)
# → E:\git\app\tools\io-analytics\CLAUDE.md

# 3. Agregar a master.env
# IO_ANALYTICS_FRONTEND_PORT=3020
# IO_ANALYTICS_BACKEND_PORT=4020

# 4. Crear estructura docs/
mkdir -p E:\git\app\tools\io-analytics\docs\{instructions,database,analysis,api,architecture,deployment,generated}

# 5. Crear package.json
# → E:\git\app\tools\io-analytics\package.json

# 6. Actualizar pnpm-workspace.yaml
# - 'app/tools/io-analytics'

# 7. Instalar
cd E:\git
pnpm install

# 8. Validar
tsc --noEmit
pnpm run lint

# ✅ Proyecto creado correctamente
```

---

## 🚀 PRÓXIMAS ACCIONES

Cuando usuario diga:

- "Crea un nuevo proyecto [NOMBRE]"
- "Setup nuevo proyecto"
- "Nuevo sitio desde template"

**SIEMPRE:**

1. Crear carpeta en E:\git\app\[TIPO]\[NOMBRE]
2. Crear CLAUDE.md con instrucciones globales
3. Agregar puertos a master.env
4. Crear estructura completa

**NO crear proyecto sin CLAUDE.md**

---

**Documento:** INSTRUCCION-CREAR-NUEVO-PROYECTO.md
**Status:** ✅ OBLIGATORIA
**Criticidad:** 🔴 ALTA
**Versión:** 1.0
