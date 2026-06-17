# 🏗️ ARQUITECTURA: SKILLS vs MODOS (Opción B)

**Versión:** 1.0 | **Fecha:** 2026-06-11 | **Status:** ✅ ACTIVA

---

## 📋 Resumen Ejecutivo

Sistema de dos niveles para gestionar **43 modos (#)** y **19 skills (/)** sin duplicación:

| Nivel           | Ubicación                                    | Contenido                                 | Síntaxis | Propósito              |
| --------------- | -------------------------------------------- | ----------------------------------------- | -------- | ---------------------- |
| **1 (Índice)**  | `E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md` | Instrucciones + Modos + Referencia Skills | `#modo`  | Acceso rápido          |
| **2 (Maestro)** | `E:\lib\005-Skills\`                         | 19 Skills con protocolos detallados       | `/skill` | Fuente única de verdad |

---

## 🎯 NIVEL 1: COMANDOS-MODO-PROYECTOS.md (Índice)

**Ubicación:** `E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md`

**Contenido:**

- ✅ 7 Instrucciones locales (setup, protocolos, validación)
- ✅ 26 Modos automáticos (#) — completamente documentados
- ✅ 2 Controles (autonomía, validación)
- ✅ Referencia a 19 Skills (apunta a 005-Skills\)
- ✅ 13 Funciones PowerShell (io-\*)

**No contiene:**

- ❌ Skills detallados (apunta a E:\lib\005-Skills\ en su lugar)

**Cuándo usarla:**

- Necesitas referencia rápida de un modo
- Necesitas instrucciones de setup
- Necesitas sintaxis de modos (#)

---

## 📚 NIVEL 2: E:\lib\005-Skills\ (Maestro)

**Ubicación:** `E:\lib\005-Skills\`

**Estructura:**

```
005-Skills\
├── README.md                    (Instrucciones)
├── SKILLS-CONFIG.json           (Configuración centralizada)
├── SKILLS-LIBRARY.md            (Índice completo)
├── SLASH-COMMANDS-REFERENCE.md  (Referencia de sintaxis)
├── 01-automation-skills.md      (4 skills: gmail-cleaner, email-outreach, etc)
├── 02-seo-skills.md             (8 skills: content-brief, competitor-spy, etc)
├── 03-legal-skills.md           (1 skill: compliance-checker)
├── 04-qa-skills.md              (1 skill: qa-test-suite)
├── 05-devops-skills.md          (4 skills: deployment-manager, monitoring-dashboard, etc)
├── protocol-*.md                (Protocolos detallados para cada skill)
└── _archive\                    (Versiones antiguas)
```

**Contenido por archivo:**

### **SKILLS-CONFIG.json**

- Configuración única centralizada
- Define todas las 19 skills
- Mapeo de categorías
- Search index

**Ejemplo:**

```json
{
  "library": {
    "total_skills": 19,
    "total_categories": 5,
    "status": "production"
  },
  "search_index": {
    "automation": ["gmail-cleaner", "email-outreach", ...],
    "seo": ["content-brief", "competitor-spy", ...]
  }
}
```

### **SKILLS-LIBRARY.md**

- Tabla de rutas rápidas
- Búsqueda por palabra clave
- Cómo activar skills (slash commands)
- Ejemplos de salida

### **Archivos por categoría (01-05)**

Cada uno contiene:

- Descripción del skill
- Objetivo y capacidades
- Protocolo de ejecución
- Ejemplos de salida
- Ahorro de tiempo

**Ejemplo:** `02-seo-skills.md` documenta:

- /content-brief
- /anti-cannibal
- /competitor-spy
- /dev-validator
- /gsc-health
- /internal-links
- /local-reputation
- /schema-expert

---

## 🔄 Flujo de Uso

### Escenario 1: "Necesito auditar SEO técnico"

```
Usuario: "Audita performance del sitio"
         ↓
Claude detecta palabras clave → Activa #performance (MODO)
(Automático, sin slash command)

Si usuario dice: "/dev-validator"
                ↓
Claude ejecuta skill /dev-validator (SKILL)
Busca documentación en: E:\lib\005-Skills\02-seo-skills.md
(Explícito, comando directo)
```

### Escenario 2: "Necesito referencia rápida"

```
Usuario abre: E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md
             ↓
Busca: "performance" → Encuentra #performance (documentado en nivel 1)
             ↓
Si quiere detalles de /dev-validator → Abre E:\lib\005-Skills\02-seo-skills.md
```

### Escenario 3: "Necesito protocolo detallado"

```
Usuario: "Necesito ejecutar /competitor-spy con protocolo"
        ↓
Abre: E:\lib\005-Skills\SKILLS-LIBRARY.md → Busca /competitor-spy
        ↓
Lee documentación completa en: 02-seo-skills.md
        ↓
Ejecuta protocolo paso a paso
```

---

## 📊 Comparativa: Modos vs Skills

| Aspecto           | MODOS (#)                              | SKILLS (palabras clave)                              |
| ----------------- | -------------------------------------- | ---------------------------------------------------- |
| **Síntaxis**      | `#refactor`                            | `"Refactoriza código"` (natural)                     |
| **Activación**    | Explícita con `#modo`                  | Automática por palabras clave                        |
| **Búsqueda**      | Directa (Claude Code nativo)           | En SKILLS-CONFIG.json → search_index                 |
| **Origen**        | Comportamientos nativos de Claude Code | Profesionales/especializados                         |
| **Documentación** | `COMANDOS-MODO-PROYECTOS.md` (Nivel 1) | `E:\lib\005-Skills\` (Nivel 2)                       |
| **Ejemplos**      | #refactor, #performance, #tests        | "Limpia Gmail", "Audita competencia", "Genera tests" |
| **Casos de uso**  | Refactoring, optimización, componentes | Automatización, auditorías, reporting                |
| **Total**         | 26 documentados                        | 19 documentados                                      |

---

## 🔗 Vínculo Global

### E:\CLAUDE.md (Maestro Central)

Debe referenciar:

```
## 📚 SKILLS LIBRARY
Ubicación: E:\lib\005-Skills\
Índice: E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md
Documentación: E:\lib\005-Skills\SKILLS-LIBRARY.md
```

### E:\git\CLAUDE.md (Orquestación Monorepo)

Debe referenciar:

```
Para skills profesionales:
→ E:\lib\005-Skills\
Para modos automáticos:
→ E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md
```

### E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md (Índice Operacional)

**Nivel 1 - Acceso rápido:**

- Instrucciones locales
- Modos (#) con documentación completa
- Referencia a Skills (apunta a Nivel 2)

**Nivel 2 - Detalles (E:\lib\005-Skills\):**

- Documentación profesional de 19 skills
- Protocolos detallados
- Configuración centralizada

---

## ✅ Ventajas de Opción B

✅ **Sin duplicación documentada**

- Modos en COMANDOS-MODO-PROYECTOS.md
- Skills en 005-Skills\ (único lugar)

✅ **Mejor organización**

- 5 categorías de skills bien definidas
- Protocolos separados por función

✅ **Acceso multinivel**

- Nivel 1: Acceso rápido
- Nivel 2: Detalles profesionales

✅ **Escalabilidad**

- Fácil agregar nuevos skills a 005-Skills\
- Fácil mantener modos en COMANDOS-MODO-PROYECTOS.md

✅ **Seguridad histórica**

- 005-Skills\ preserva protocolos y versiones
- Archivo versionado en git
- Se puede hacer rollback fácilmente

---

## ⚠️ Implicaciones de Eliminar 005-Skills\

**Si borras E:\lib\005-Skills\ sin respaldar:**

❌ Pierdes:

- 19 skills documentados con detalle
- 6+ protocolos especializados
- Histórico versionado
- Configuración de skills
- Categorización profesional

✅ No pierdes:

- Índice en COMANDOS-MODO-PROYECTOS.md
- Referencias en E:\CLAUDE.md
- Documentación de modos (#)

**Recomendación:**

- NUNCA borres sin respaldar a `_archive\`
- NUNCA borres si aún hay protocolos en uso
- Respalda antes de cambios mayores

---

## 🎯 Próximos Pasos

### Ahora (Inmediato):

- ✅ Documentar arquitectura (ESTE ARCHIVO)
- ✅ Vincular E:\CLAUDE.md con 005-Skills
- ✅ Vincular COMANDOS-MODO-PROYECTOS.md con 005-Skills

### Después (Opcional):

- [ ] Crear script de sincronización entre niveles
- [ ] Agregar validación de duplicados automática
- [ ] Crear alertas si hay inconsistencias

---

## 📞 Referencias Cruzadas

| Documento                        | Ubicación            | Propósito                                      |
| -------------------------------- | -------------------- | ---------------------------------------------- |
| **COMANDOS-MODO-PROYECTOS.md**   | `E:\git\app\docs\`   | Índice de modos + ref. skills                  |
| **SKILLS-LIBRARY.md**            | `E:\lib\005-Skills\` | Índice maestro de skills                       |
| **SKILLS-CONFIG.json**           | `E:\lib\005-Skills\` | Config. centralizada                           |
| **01-05 skills.md**              | `E:\lib\005-Skills\` | Documentación por categoría                    |
| **ARQUITECTURA-SKILLS-MODOS.md** | `E:\git\app\docs\`   | **Este documento**                             |
| **E:\CLAUDE.md**                 | Raíz                 | Master constitutional (debe referenciar ambos) |
| **E:\git\CLAUDE.md**             | `E:\git\`            | Maestro monorepo (debe referenciar ambos)      |

---

**Documento:** ARQUITECTURA-SKILLS-MODOS.md  
**Versión:** 1.0  
**Status:** ✅ OPCIÓN B IMPLEMENTADA  
**Última actualización:** 2026-06-11

---

**Conclusión:** Sistema de dos niveles bien definido, sin duplicación, escalable y mantenible.
