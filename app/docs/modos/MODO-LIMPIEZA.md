# 🧹 MODO: #limpieza — Limpieza Inteligente de Proyectos

**Status:** ✅ ACTIVO | Versión: 1.0 | Fecha: 2026-06-11

---

## 🎯 ¿QUÉ ES?

Cuando el usuario dice cualquiera de estas palabras:

- `#limpieza`
- `limpiar`
- `cleanup`
- `borrar archivos innecesarios`

Claude Code activa el **MODO #limpieza** que:

1. ✅ **Detecta** archivos innecesarios (sin eliminación)
2. ⚠️ **Categoriza** en: CRÍTICO, SEGURO, ADVERTENCIA, INFORMACIÓN
3. ❓ **Pide confirmación** antes de eliminar nada
4. 🗑️ **Ejecuta limpieza** de forma inteligente
5. ✅ **Verifica** resultados

---

## 🔍 CATEGORIZACIÓN DE ARCHIVOS

### **🔴 CRÍTICO (NUNCA BORRAR)**

- `.git/` - Historial de versiones
- `.github/` - Workflows y configuración
- `CLAUDE.md` - Documentación del proyecto
- `package.json` - Dependencias
- `tsconfig.json` - Config TypeScript
- `.eslintrc.json` - Config linting
- `src/` - Código fuente
- `tests/` - Tests
- `.env.example` - Template de variables

### **🟢 SEGURO (BORRAR SIN PREGUNTAR)**

- `node_modules/` - Dependencias instaladas
- `.next/` - Build de Next.js
- `dist/` - Build de salida
- `build/` - Artefactos de compilación
- `.turbo/` - Cache de Turbo
- `coverage/` - Reports de cobertura
- `.cache/` - Caches varias
- `*.log` - Archivos de logs
- `.nyc_output/` - Test coverage temp
- `tmp/` - Archivos temporales
- `*.tmp` - Archivos temporales

### **⚠️ ADVERTENCIA (PREGUNTAR PRIMERO)**

- `.vscode/` - Preferencias del IDE (son locales)
- `.idea/` - Preferencias de JetBrains (locales)
- `.env.local` - Variables de desarrollo (locales)
- `*.swp` - Archivos de editor viejo
- `*.swo` - Archivos de editor viejo
- `.DS_Store` - Archivos de macOS

### **ℹ️ INFORMACIÓN (REPORTAR, NO BORRAR)**

- Archivos duplicados
- Archivos huérfanos (no referenciados)
- Archivos muy viejos (> 1 año sin modificar)

---

## 📋 PARÁMETROS DEL MODO

```
#limpieza --tipo [TYPE] --profundidad [DEPTH] --backup [BOOL] --seco [BOOL]
```

### **--tipo** (Qué limpiar)

```
--tipo logs          # Borrar *.log, logs/
--tipo cache         # Borrar .cache/, .turbo/, .eslintcache
--tipo build         # Borrar dist/, build/, .next/
--tipo ide           # Borrar .vscode/, .idea/
--tipo backup        # Borrar *.bak, *.backup
--tipo duplicados    # Encontrar y reportar duplicados
--tipo huerfanos     # Encontrar y reportar huérfanos
--tipo all           # Limpiar todo lo seguro
```

### **--profundidad** (Cuán agresivo)

```
--profundidad superficial  # Solo directorios obvios (node_modules, dist)
--profundidad normal       # Estándar (node_modules, dist, logs, cache)
--profundidad completa     # Agresivo (todo excepto CRÍTICO)
```

### **--backup** (Crear backup)

```
--backup true      # Crear backup antes de limpiar
--backup false     # No crear backup (más rápido)
```

### **--seco** (Modo simulación)

```
--seco true        # Ver QUÉ se borraría SIN BORRAR
--seco false       # REALMENTE borrar
```

### **--riesgo** (Nivel de confirmación)

```
--riesgo bajo      # Borrar archivos seguros sin preguntar
--riesgo medio     # Preguntar por archivos en ADVERTENCIA
--riesgo alto      # Preguntar por TODO excepto CRÍTICO
```

---

## 🚀 FLUJO DE EJECUCIÓN

```
Usuario dice: "#limpieza --tipo all --seco true"
           ↓
1. ANÁLISIS (sin eliminar)
   - Detecta archivos por carpeta
   - Categoriza: CRÍTICO, SEGURO, ADVERTENCIA, INFO
   - Calcula tamaño de limpieza
           ↓
2. REPORTE SECO
   Resultados:
   - 15 archivos .log (seguro borrar)
   - node_modules/ 250MB (seguro borrar)
   - .next/ 45MB (seguro borrar)
   - .vscode/ (advertencia - IDE local)
           ↓
3. CONFIRMACIÓN (si necesaria)
   "¿Proceder con limpieza de 295MB?"
   [SÍ] [NO]
           ↓
4. EJECUCIÓN (si confirmado)
   ✅ Eliminando node_modules/
   ✅ Eliminando .next/
   ✅ Eliminando *.log
           ↓
5. VERIFICACIÓN
   ✅ Limpieza completada
   Espacio liberado: 295MB
   Tiempo: 12 segundos
```

---

## 📝 EJEMPLOS DE USO

### **Ejemplo 1: Limpiar solo logs**

```
Usuario: "#limpieza --tipo logs"
         ↓
Claude:  ANÁLISIS
         - 24 archivos .log encontrados
         - Tamaño: 12MB

         CONFIRMACIÓN
         "¿Borrar 24 archivos .log (12MB)?"
         [SÍ] [NO]

         EJECUCIÓN (si SÍ)
         ✅ Eliminados 24 archivos
         ✅ Liberados 12MB
```

### **Ejemplo 2: Limpiar todo en modo seco**

```
Usuario: "#limpieza --tipo all --seco true"
         ↓
Claude:  ANÁLISIS (SIMULACIÓN)
         Qué se BORRARÍA (sin realmente borrar):
         - node_modules/ (250MB)
         - dist/ (45MB)
         - .next/ (45MB)
         - .turbo/ (5MB)
         - *.log (12MB)
         - coverage/ (8MB)
         ─────────────────
         Total: 365MB en 15 archivos/carpetas

         NOTA: Esto es SIMULACIÓN. Nada fue borrado.
         Para realmente limpiar:
         #limpieza --tipo all --seco false
```

### **Ejemplo 3: Buscar duplicados**

```
Usuario: "#limpieza --tipo duplicados"
         ↓
Claude:  ANÁLISIS
         Duplicados encontrados:
         - utils.ts (2 copias en src/ y lib/)
         - config.json (3 copias)
         - logo.png (2 copias)

         INFORMACIÓN (no borrar automáticamente)
         Necesita decisión manual para cada uno.
```

### **Ejemplo 4: Limpiar con backup**

```
Usuario: "#limpieza --tipo all --backup true"
         ↓
Claude:  BACKUP
         ✅ Backup creado: .backup-2026-06-11-15-30.zip

         LIMPIEZA
         ✅ Eliminados archivos
         ✅ Liberados 365MB

         Si algo sale mal, puedes restaurar:
         restore-backup .backup-2026-06-11-15-30.zip
```

---

## ⚠️ REGLAS CRÍTICAS

```
🔴 NUNCA BORRAR:
- .git/ (perderías todo el historial)
- src/ (perderías código)
- CLAUDE.md (perderías documentación)
- package.json (perderías dependencias)
- tests/ (perderías tests)

🟢 SIEMPRE SEGURO BORRAR:
- node_modules/ (se regenera con pnpm install)
- .next/, dist/, build/ (se regeneran)
- *.log (solo logs)
- .cache/ (caches que se regeneran)

⚠️ PREGUNTAR PRIMERO:
- .vscode/, .idea/ (son locales, otros las necesitan)
- .env.local (desarrollo local)
```

---

## 🎯 CHECKLIST: ANTES DE LIMPIAR

```
[ ] ¿Leí el reporte de análisis?
[ ] ¿Estoy de acuerdo con lo que se borrará?
[ ] ¿Tengo backup si es necesario?
[ ] ¿No estoy borrando archivos CRÍTICO?
[ ] ¿Confirmé en la pregunta?
```

---

## 🔄 RESTAURAR SI ALGO SALE MAL

Si creaste backup:

```powershell
# Ver backups disponibles
dir .backup-*.zip

# Restaurar último backup
restore-backup .backup-2026-06-11-15-30.zip

# O manualmente:
Expand-Archive .backup-2026-06-11-15-30.zip -DestinationPath .
```

Si NO creaste backup y borraste algo importante:

```
⚠️ Última opción: git restore
git restore [archivo]

Pero SOLO funciona si commitaste antes.
```

---

## 📊 EJEMPLO DE REPORTE COMPLETO

```
═══════════════════════════════════════════
   ANÁLISIS DE LIMPIEZA - PROJECT: io-semantico
═══════════════════════════════════════════

🔴 CRÍTICO (NUNCA BORRAR):
   - .git/                      [2.4MB] 🔒
   - src/                       [1.2MB] 🔒
   - CLAUDE.md                  [8KB]   🔒
   - package.json               [1KB]   🔒

🟢 SEGURO (BORRAR):
   - node_modules/              [250MB] ✓
   - .next/                     [45MB]  ✓
   - dist/                      [12MB]  ✓
   - .turbo/                    [5MB]   ✓
   - *.log (24 files)          [12MB]  ✓
   - coverage/                  [8MB]   ✓
   ─────────────────────────────────────
   Subtotal a borrar:           [332MB]

⚠️ ADVERTENCIA (PREGUNTAR):
   - .vscode/                   [2MB]   ❓
   - .env.local                 [50KB]  ❓

ℹ️ INFORMACIÓN (REPORTAR):
   - Duplicados encontrados:    2 archivos
   - Archivos huérfanos:        3 archivos
   - Archivos antiguos (>1y):   5 archivos

═══════════════════════════════════════════
RESUMEN:
- Archivos a borrar: 47
- Espacio liberado: 332MB
- Tiempo estimado: 15 segundos

¿Proceder? [SÍ] [NO]
```

---

## ❌ ERRORES COMUNES A EVITAR

```
MALO:
❌ "#limpieza" sin parámetros (es ambiguo)
❌ Limpiar sin hacer análisis primero
❌ Borrar sin confirmar
❌ No tener backup
❌ Limpiar mientras está corriendo el servidor

CORRECTO:
✅ "#limpieza --tipo logs --seco true"
✅ Revisar análisis antes de confirmar
✅ Usar "--backup true" para importante
✅ Si dudas: usar "--seco true" primero
✅ Parar servidores antes de limpiar
```

---

## 🎯 PALABRAS CLAVE QUE ACTIVAN #limpieza

Si el usuario dice CUALQUIERA de:

- `#limpieza`
- `limpiar proyecto`
- `cleanup`
- `borrar archivos`
- `eliminar node_modules`
- `borrar logs`
- `liberar espacio`

**Claude Code activa automáticamente este modo**

---

**Documento:** MODO-LIMPIEZA.md
**Status:** ✅ ACTIVO
**Criticidad:** 🟡 MEDIA
**Versión:** 1.0
**Fecha:** 2026-06-11
