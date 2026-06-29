# 📋 Análisis del Optimizador Semántico

**Fecha:** 2026-06-12  
**Versión:** 1.0  
**Estado:** Operacional con Bugs

---

## 1. RESUMEN EJECUTIVO

El **Optimizador** es una herramienta de asignación y gestión de palabras clave (keywords) a URLs de clientes. Permite:

- ✅ Seleccionar cliente
- ✅ Visualizar URLs agrupadas por arquitectura (Nivel 2/3)
- ✅ Asignar 0-6 keywords a cada URL
- ✅ Guardar asignaciones en BD

**Status:** Parcialmente operativo. Tiene bugs en referencias de columnas y consultas a Supabase.

---

## 2. ARQUITECTURA TÉCNICA

### 2.1 Stack

| Componente | Tecnología                 |
| ---------- | -------------------------- |
| Frontend   | React 18 + Next.js 14.2.35 |
| Estado     | useState, useMemo hooks    |
| BD         | Supabase PostgreSQL        |
| UI         | Tailwind CSS v4            |
| Iconos     | Lucide React               |

### 2.2 Componentes React

```
OptimizerPage (app/optimizador/page.tsx) ← MAIN
├── ClienteSelector (Select Dropdown)
├── URLsList (Left Panel)
│   ├── Nivel 2 Cards
│   └── Nivel 3 Cards
├── URLDetails (Right Panel)
│   ├── URL Header Card
│   └── Keywords List
└── KeywordAssignmentDrawer (Modal)
    └── Keyword Checkboxes grouped by Level
```

---

## 3. FLUJO DE DATOS

### 3.1 Carga de Clientes

```typescript
loadClientes()
  ├─ SELECT id, nombre FROM io_sem_clientes
  ├─ setClientes(data)
  └─ Auto-selecciona data[0]
```

### 3.2 Carga de URLs

```typescript
loadUrls() [triggers when selectedClienteId changes]
  ├─ SELECT id, url, h1_actual, meta_title_actual, meta_description_actual, tipologia
  │  FROM io_sem_urls_rastreadas
  │  WHERE cliente_id = selectedClienteId
  │
  ├─ getTipologyLevel(tipologia) → mapea a nivel:
  │  ├─ 'producto' | 'blog' | 'perfil' → 3
  │  ├─ 'home' → 1
  │  └─ 'categoria' | 'landing' | 'listado' | 'estatico' → 2
  │
  ├─ useMemo agrupa:
  │  ├─ level2 = urls.filter(u => u.nivel === 2)
  │  └─ level3 = urls.filter(u => u.nivel === 3)
  │
  └─ Ordena: Nivel 2 primero, luego Nivel 3
```

### 3.3 Carga de Keywords Asignadas

```typescript
loadAssignedKeywords() [triggers when selectedUrl changes]
  ├─ SELECT id, keyword_id(keyword, subclase)
  │  FROM io_sem_asignaciones_kw_url
  │  WHERE url_id = selectedUrl.id AND cliente_id
  │
  └─ Mapea a KeywordAssignment[]
```

### 3.4 Modal: Asignar Keywords

```typescript
KeywordAssignmentDrawer
  ├─ Carga todas las keywords del cliente
  │  └─ SELECT id, keyword, subclase FROM io_sem_palabras_clave
  │
  ├─ Agrupa por KEYWORD_LEVELS (level1_entity_core, level2_local, etc.)
  │
  ├─ handleToggleKeyword(id)
  │  └─ Adiciona/remueve de assignedKeywordIds (max 6)
  │
  └─ handleSave()
     ├─ DELETE FROM io_sem_asignaciones_kw_url (limpiar previas)
     └─ INSERT nuevas asignaciones
```

---

## 4. TABLAS DE SUPABASE UTILIZADAS

| Tabla                        | Columnas Usadas                                                                       | Operación      |
| ---------------------------- | ------------------------------------------------------------------------------------- | -------------- |
| `io_sem_clientes`            | id, nombre                                                                            | SELECT         |
| `io_sem_urls_rastreadas`     | id, url, h1_actual, meta_title_actual, meta_description_actual, tipologia, cliente_id | SELECT         |
| `io_sem_palabras_clave`      | id, keyword, subclase, cliente_id                                                     | SELECT         |
| `io_sem_asignaciones_kw_url` | id, url_id, keyword_id, cliente_id, tipo_asignacion, estado                           | INSERT, DELETE |

---

## 5. BUGS Y ERRORES ENCONTRADOS

### 🔴 BUG #1: Referencias Obsoletas (Líneas 406, 409, 415)

**Ubicación:** `app/optimizador/page.tsx`

**Problema:**

```typescript
{
  selectedUrl.url_actual;
} // ❌ Campo no existe
{
  selectedUrl.h1_1_actual;
} // ❌ Campo no existe
```

**Causa:** Cambio de esquema de tabla `io_sem_urls_rastreadas`:

- Antes: `url_actual`, `h1_1_actual`
- Ahora: `url`, `h1_actual`

**Solución:**

```typescript
{
  selectedUrl.url;
} // ✅ Correcto
{
  selectedUrl.h1_actual;
} // ✅ Correcto
```

---

### 🔴 BUG #2: Query de Relación Incorrecto (Línea 139)

**Ubicación:** `src/components/KeywordAssignmentDrawer.tsx`

**Problema:**

```typescript
io_sem_palabras_clave: keyword_id(palabra_clave, nivel);
// ❌ palabra_clave, nivel no existen en tabla
```

**Causa:** Schema correcto es:

- Columna: `keyword` (no `palabra_clave`)
- Columna: `subclase` (no `nivel`)

**Solución:**

```typescript
// Ya corregido en sesión anterior ✅
.select('id, keyword, subclase')
```

---

### 🔴 BUG #3: Mostrar Datos Incorrectos (Línea 470)

**Ubicación:** `src/components/KeywordAssignmentDrawer.tsx`

**Problema:**

```typescript
{
  kw.palabra_clave;
} // ❌ palabra_clave no existe en interface KeywordAssignment
```

**Causa:** Interface espera `keyword`, no `palabra_clave`

**Solución:** Ya corregido ✅

---

### 🔴 BUG #4: Query Relation Incompleto (Línea 139)

**Ubicación:** `app/optimizador/page.tsx`

**Problema:**

```typescript
io_sem_palabras_clave: keyword_id(palabra_clave, nivel);
```

**Impacto:** El modal intenta cargar keywords pero falla porque busca columnas inexistentes.

---

## 6. ESTADO DE CORRECCIONES

| Bug                                | Archivo                     | Líneas        | Status       |
| ---------------------------------- | --------------------------- | ------------- | ------------ |
| Referencias url_actual/h1_1_actual | page.tsx                    | 406, 409, 415 | ❌ PENDIENTE |
| Query relation incorrecta          | page.tsx                    | 139           | ❌ PENDIENTE |
| Modal no carga keywords            | KeywordAssignmentDrawer.tsx | 69            | ✅ CORREGIDO |
| Feedback visual selección          | KeywordAssignmentDrawer.tsx | 210-225       | ✅ MEJORADO  |

---

## 7. FUNCIONALIDADES ACTUALES

### ✅ Implementadas

1. **Selector de Cliente** - Dropdown con auto-selección
2. **Listado de URLs** - Con búsqueda de cliente
3. **Agrupación por Nivel** - Nivel 2 (Arquitectura) / Nivel 3 (Contenido)
4. **Badges de Tipología** - Colores según tipo (Producto, Blog, etc.)
5. **Panel de Detalles** - Muestra URL, H1, Meta Description
6. **Modal de Asignación** - Selecciona 0-6 keywords
7. **Persistencia** - Guarda en BD

### 🔴 No Implementadas

1. **Generar Optimización** - Botón visible pero sin funcionalidad (Línea 478)
2. **Sugerencias con Claude AI** - No existe integración
3. **Validación de Asignaciones** - Sin validar antes de guardar
4. **Historial de Cambios** - No registra quién cambió qué cuándo
5. **Edición Manual de Meta Tags** - URLs son read-only

---

## 8. FLUJO DE USO ESPERADO

### Paso 1: Seleccionar Cliente

```
📊 Dropdown → Selecciona "Esgarden - ESMUNAS"
└─ loadClientes() → loadUrls()
```

### Paso 2: Ver URLs

```
🌐 Panel izquierdo muestra:
├─ 📂 Nivel 2 (Landing, Categorías, etc.)
└─ 🎯 Nivel 3 (Productos, Blog posts)
```

### Paso 3: Seleccionar URL

```
Click en URL → setSelectedUrl()
└─ Panel derecho muestra detalles
└─ loadAssignedKeywords()
```

### Paso 4: Asignar Keywords

```
Click "Asignar Keywords" → Modal
└─ Busca keywords del cliente
└─ Select 0-6 keywords
└─ Click "Guardar Asignaciones"
└─ INSERT en io_sem_asignaciones_kw_url
```

### Paso 5: Generar Optimización (NO FUNCIONAL)

```
Click "Generar Optimización"
└─ Debería llamar API Claude AI
└─ Generar títulos y descriptions optimizados
└─ Mostrar sugerencias
```

---

## 9. RECOMENDACIONES

### Inmediatas (Bugs Críticos)

1. **Corregir referencias a url_actual/h1_1_actual** (líneas 406, 409, 415)
2. **Corregir query de keywords asignadas** (línea 139)
3. **Validar que las keywords carguen correctamente en el modal**

### Corto Plazo (Funcionalidad Core)

1. Implementar "Generar Optimización" con Claude API
2. Agregar validación de asignaciones duplicadas
3. Mostrar historial de cambios por URL

### Mediano Plazo (Mejoras UX)

1. Agregar búsqueda de URLs
2. Permitir edición manual de meta tags
3. Batch assignment de keywords a múltiples URLs
4. Preview de cómo se vería en Google SERP

### Largo Plazo (Análisis Avanzado)

1. Integración con Google Search Console
2. Tracking de rankings por keyword
3. A/B testing de variaciones de títulos
4. Recomendaciones basadas en competencia

---

## 10. PERFORMANCE & LÍMITES

| Métrica          | Valor  | Nota                       |
| ---------------- | ------ | -------------------------- |
| URLs por página  | 50     | Hardcoded en .limit(50)    |
| Keywords por URL | 6      | Máximo enforced en modal   |
| Query time       | ~500ms | 3 queries paralelas        |
| Bundle size      | ~180KB | Next.js + React + Supabase |

---

## 11. DEPENDENCIAS EXTERNAS

```json
{
  "next": "14.2.35",
  "react": "^18.2.0",
  "@supabase/supabase-js": "^2.x",
  "tailwindcss": "^4.0",
  "lucide-react": "^0.x"
}
```

---

## 12. ENDPOINTS & APIs UTILIZADAS

### Supabase REST API

```
GET /rest/v1/io_sem_clientes?select=id,nombre
GET /rest/v1/io_sem_urls_rastreadas?select=...&cliente_id=eq.xxx
GET /rest/v1/io_sem_palabras_clave?select=...&cliente_id=eq.xxx
GET /rest/v1/io_sem_asignaciones_kw_url?url_id=eq.xxx
POST /rest/v1/io_sem_asignaciones_kw_url (insert)
DELETE /rest/v1/io_sem_asignaciones_kw_url (delete)
```

### Claude API (NO IMPLEMENTADO)

```
POST /v1/messages
├─ model: "claude-opus"
├─ prompt: "Genera meta title y description para..."
└─ max_tokens: 500
```

---

## 13. CONCLUSIÓN

El **Optimizador** tiene una arquitectura sólida para la gestión de keywords. Funciona correctamente para:

- ✅ Cargar y visualizar URLs
- ✅ Asignar keywords a URLs
- ✅ Guardar en BD

Pero necesita:

- 🔴 Corregir bugs de referencias de campos
- 🔴 Implementar generación de optimizaciones con IA
- 🔴 Agregar validaciones y mejoras UX

**Estimación de trabajo:**

- Bugs: 2-3 horas
- Generación con Claude: 4-6 horas
- Validaciones: 2-3 horas

---

**Preparado por:** Claude Code  
**Última actualización:** 2026-06-12  
**Próxima revisión recomendada:** Después de fixes de bugs
