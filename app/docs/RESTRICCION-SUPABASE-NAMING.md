# 🔐 RESTRICCIÓN CRÍTICA: Nomenclatura Supabase

**Versión:** 1.0 | **Fecha:** 2026-06-11 | **Status:** ✅ ACTIVA Y OBLIGATORIA

**Aplicable a:** TODOS los proyectos en E:\git\app\*

---

## 📋 Resumen Ejecutivo

Cuando Claude Code vaya a **crear, modificar o referenciar tablas en Supabase**, **DEBE pedir confirmación** del prefijo de nomenclatura antes de proceder.

**Patrón obligatorio:**

```
io_[nombreproyecto]_[tabla]
```

---

## 🎯 Restricción Completa

### **REGLA 1: SIEMPRE preguntar el prefijo**

**Antes de crear CUALQUIER tabla en Supabase:**

```
Claude DEBE preguntar:
❓ "¿Cuál es el nombre del proyecto para Supabase?"
   "Necesito confirmar el prefijo (ejemplo: io_semantico_)"
```

**Usuario responde:**

```
Usuario: "io_semantico_"
```

**Claude confirma:**

```
✅ Confirmado prefijo: io_semantico_
   Patrón a usar: io_semantico_[nombreTabla]

   Creando:
   - io_semantico_keywords
   - io_semantico_keywords_index
   - io_semantico_rankings
```

---

### **REGLA 2: Patrón de nomenclatura**

**Formato:**

```
io_[nombreproyecto]_[tabla]
```

**Ejemplos VÁLIDOS:**

```
io_semantico_keywords
io_semantico_keywords_index
io_semantico_rankings
io_prospector_clients
io_prospector_contacts
io_neruda_articles
io_neruda_comments
io_crm_users
io_crm_leads
io_sitio_pages
io_sitio_analytics
```

**Ejemplos INVÁLIDOS (PROHIBIDOS):**

```
❌ users (sin prefijo)
❌ keywords (sin prefijo)
❌ supabase_keywords (prefijo incorrecto)
❌ semantico_keywords (falta "io_")
❌ semantic_keywords (nombre inconsistente)
❌ keywords_semantico_io (orden incorrecto)
```

---

### **REGLA 3: Restricciones estrictas**

**NUNCA:**

- ❌ Crear tabla sin confirmar prefijo con usuario
- ❌ Inferir nombre del proyecto - SIEMPRE preguntar
- ❌ Usar nombres genéricos sin prefijo
- ❌ Usar CamelCase o mixtos (solo snake_case)
- ❌ Usar mayúsculas (solo minúsculas)
- ❌ Omitir "io\_" al inicio

**SIEMPRE:**

- ✅ Preguntar prefijo antes de crear
- ✅ Confirmar patrón con usuario
- ✅ Usar snake_case en minúsculas
- ✅ Incluir prefijo `io_[proyecto]_`
- ✅ Documentar patrón en sección "Tablas de Supabase"

---

## 📝 Protocolo paso a paso

### **Escenario: Usuario solicita crear tabla**

```
Usuario: "Crea tabla de keywords en Supabase"
```

**Paso 1: Detectar necesidad de Supabase**

```
Claude detecta: "tabla en Supabase"
Acción: ⚠️ PAUSA - Preguntar prefijo
```

**Paso 2: Preguntar confirmación**

```
Claude pregunta:
❓ "Voy a crear una tabla en Supabase.
   ¿Cuál es el prefijo del proyecto?

   Ejemplo: io_[nombreproyecto]_

   (Los prefijos actuales son:
    - io_semantico_
    - io_prospector_
    - io_neruda_
    - io_crm_
    etc.)"
```

**Paso 3: Usuario proporciona prefijo**

```
Usuario: "io_semantico_"
```

**Paso 4: Confirmar patrón**

```
Claude confirma:
✅ Confirmado. Usaré prefijo: io_semantico_

Tabla a crear: io_semantico_keywords

Estructura:
- Nombre: io_semantico_keywords
- Patrón: io_semantico_[tabla]
- Snake_case: sí ✅
- Minúsculas: sí ✅
- Prefijo: sí ✅
```

**Paso 5: Proceder con creación**

```
Claude crea:
- io_semantico_keywords (tabla)
- io_semantico_keywords_index (si necesita índice)
- Documenta patrón en CLAUDE.md del proyecto
```

---

## 🔗 Dónde documentar el prefijo

**En cada CLAUDE.md de proyecto:**

```markdown
## 🗄️ Supabase Configuration

**Database Prefix:** io*[nombreproyecto]*

### Tablas Supabase:

- io_semantico_keywords
- io_semantico_keywords_index
- io_semantico_rankings

**Patrón:** Todas las tablas DEBEN incluir prefijo io*[proyecto]*
**Referencia:** E:\git\app\docs\RESTRICCION-SUPABASE-NAMING.md
```

---

## 💡 Por qué esta restricción

1. **Evitar colisiones:** Si dos proyectos tienen tabla "users", se confunde
2. **Trazabilidad:** Saber a qué proyecto pertenece cada tabla
3. **Escalabilidad:** Con 19+ proyectos, es crítico
4. **Convención IORANA:** Consistencia en toda la infraestructura
5. **Seguridad:** Evitar acceso cruzado entre proyectos

---

## ⚠️ Casos especiales

### **Caso 1: Usuario no sabe el prefijo**

```
Usuario: "No sé cuál es el prefijo"

Claude:
✅ Sin problema. Voy a ayudarte.

Prefijos activos en IORANA:
- io_semantico_  (SEO & Content)
- io_prospector_ (Lead Generation)
- io_neruda_     (Knowledge Base)
- io_crm_        (Customer Relations)
- io_sitio_      (Website)
- [otros]

¿Cuál necesitas?
```

### **Caso 2: Nuevo proyecto sin prefijo**

```
Usuario: "Estoy en proyecto nuevo, ¿cuál debería ser el prefijo?"

Claude:
✅ Sigamos convención de IORANA:

Patrón: io_[nombre-proyecto-corto]_

Sugerencias basadas en tipo:
- SEO: io_[cliente]_
- Lead Gen: io_prospector_
- Content: io_[tema]_
- CRM: io_crm_

¿Cuál prefieres?
```

### **Caso 3: Múltiples tablas**

```
Usuario: "Crea tablas para usuarios, posts y comentarios"

Claude:
✅ Confirmado prefijo: io_semantico_

Voy a crear:
- io_semantico_users
- io_semantico_posts
- io_semantico_comments

¿Procedo?
```

---

## 🚨 Violaciones comunes

**Violación 1: Crear sin preguntar**

```
❌ Usuario dice: "Crea tabla users"
   Claude crea directamente: users
   → ERROR: Sin prefijo, no sigue patrón
```

**Violación 2: Inferir nombre**

```
❌ Usuario dice: "Crea tabla de clientes"
   Claude asume: io_crm_clients (sin preguntar)
   → ERROR: Podría ser io_prospector_clients
```

**Violación 3: Nombre inconsistente**

```
❌ Claude crea: io_semantico_keywords
   Pero luego: semantico_rankings (sin "io_")
   → ERROR: Inconsistencia
```

---

## ✅ Validación de cumplimiento

**Antes de ejecutar CREATE TABLE:**

- [ ] ¿Se preguntó el prefijo al usuario? SÍ/NO
- [ ] ¿Confirmó el patrón? SÍ/NO
- [ ] ¿Está confirmado en patrón `io_[proyecto]_`? SÍ/NO
- [ ] ¿Tabla usa snake_case? SÍ/NO
- [ ] ¿Tabla usa minúsculas? SÍ/NO
- [ ] ¿Incluye prefijo al inicio? SÍ/NO

**Si cualquier respuesta es NO:** ❌ NO proceder. Preguntar de nuevo.

---

## 📚 Referencias

**Documentación relacionada:**

- `E:\CLAUDE.md` (Master Constitutional)
- `E:\git\CLAUDE.md` (Monorepo Orchestration)
- `E:\git\app\docs\COMANDOS-MODO-PROYECTOS.md` (Instrucciones)
- Cada `E:\git\app\[tipo]\[proyecto]\CLAUDE.md`

**Protocolo Supabase:**

- Documentación oficial: https://supabase.com/docs
- Convención de nombres: Snake_case, minúsculas
- Prefijo obligatorio: `io_[proyecto]_`

---

## 📋 Checklist de implementación

- [ ] Leer esta restricción completa
- [ ] Agregar referencia en E:\CLAUDE.md
- [ ] Agregar referencia en E:\git\CLAUDE.md
- [ ] Agregar sección en cada CLAUDE.md de proyecto
- [ ] Comunicar a equipo
- [ ] Validar en próxima creación de tabla

---

**Documento:** RESTRICCION-SUPABASE-NAMING.md  
**Versión:** 1.0  
**Status:** ✅ OBLIGATORIA Y APLICABLE A TODOS LOS PROYECTOS  
**Última actualización:** 2026-06-11

---

**🔐 Esta restricción es crítica y DEBE cumplirse en 100% de los casos.**
