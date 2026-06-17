# ⚡ QUICK START: Crear Nuevo Proyecto en 30 segundos

**Status:** ✅ GUÍA RÁPIDA | Versión: 1.0 | Fecha: 2026-06-11

---

## 🚀 OPCIÓN 1: AUTOMÁTICO (RECOMENDADO)

```powershell
# En PowerShell:
. E:\scripts\create-project.ps1

# O con parámetros:
. E:\scripts\create-project.ps1 -Nombre "io-nuevo" -Tipo "tools" -Descripcion "Mi proyecto"
```

**Qué hace automáticamente:**
✅ Crea carpeta en E:\git\app\[TIPO]\[NOMBRE]  
✅ Crea CLAUDE.md completo  
✅ Crea package.json con dependencias  
✅ Crea .gitignore, tsconfig.json, .eslintrc.json, etc  
✅ Estructura src/ y docs/  
✅ git init + primer commit  
✅ Agrega puertos a master.env  
✅ Agrega a pnpm-workspace.yaml

**Resultado en 30 segundos: ✅ Proyecto completo y listo**

---

## 📋 OPCIÓN 2: MANUAL (Si prefieres más control)

Sigue la guía completa:  
👉 [`CREAR-NUEVO-PROYECTO.md`](./CREAR-NUEVO-PROYECTO.md)

---

## 🔧 DESPUÉS DE CREAR EL PROYECTO

```bash
cd E:\git\app\[TIPO]\[NOMBRE]

# 1. Copiar variables de entorno
cp .env.example .env.local

# 2. Instalar dependencias
pnpm install

# 3. Validar setup
pnpm type-check    # TypeScript
pnpm lint           # ESLint

# 4. Iniciar servidor development
pnpm dev
```

---

## 📚 ARCHIVOS IMPORTANTES

| Archivo      | Qué es                    | Para qué                     |
| ------------ | ------------------------- | ---------------------------- |
| CLAUDE.md    | Guía maestro del proyecto | Referencia principal         |
| package.json | Dependencias              | Gestionar librerías          |
| .env.example | Template de variables     | Copiar a .env.local          |
| src/         | Código fuente             | Código de la app             |
| docs/        | Documentación operacional | Instrucciones, esquemas, etc |

---

## 🖥️ PUERTOS

Cuando ejecutes el script, te pedirá:

- **Puerto Frontend:** Ej: 3010
- **Puerto Backend:** Ej: 4010

Estos se agregan a `E:\master.env` automáticamente.

---

## ✅ VALIDAR QUE FUNCIONA

```bash
# Debe pasar todos sin errores:
pnpm install       # ✅ Sin errors de dependencias
pnpm type-check    # ✅ Sin errores TypeScript
pnpm lint          # ✅ Sin warnings de ESLint
pnpm dev           # ✅ Servidor inicia en http://localhost:[PUERTO]
```

---

## ❓ PREGUNTAS COMUNES

### ¿Qué pasa si falla pnpm install?

```bash
# Limpiar y reintentar:
rm -r node_modules pnpm-lock.yaml
pnpm install
```

### ¿Debo usar TypeScript?

✅ Sí, siempre. El script lo configura automáticamente.

### ¿Puedo cambiar los puertos después?

✅ Sí, pero actualiza:

- E:\master.env
- .env.local en tu proyecto
- Reinicia el servidor

### ¿Dónde agrego mi código?

📂 `src/app/` (si es Next.js)  
📂 `src/components/` (componentes React)  
📂 `src/lib/` (funciones, utils)

---

## 🔗 REFERENCIAS

- **Instrucciones completas:** [`CREAR-NUEVO-PROYECTO.md`](./CREAR-NUEVO-PROYECTO.md)
- **Archivos de config:** [`ARCHIVOS-CONFIGURACION.md`](./ARCHIVOS-CONFIGURACION.md)
- **Estructura /docs/:** [`CARPETA-DOCS-ESTRUCTURA.md`](./CARPETA-DOCS-ESTRUCTURA.md)
- **Script automático:** `E:\scripts\create-project.ps1`

---

**Documento:** QUICK-START-NEW-PROJECT.md  
**Status:** ✅ GUÍA RÁPIDA  
**Tiempo:** 30 segundos para crear un proyecto completo
