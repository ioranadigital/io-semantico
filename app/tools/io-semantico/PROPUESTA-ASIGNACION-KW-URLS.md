# 📋 PROPUESTA: Sistema de Asignación Masiva de Keywords a URLs

**Fecha:** 2026-06-11  
**Estado:** 🔵 En Revisión  
**Objetivo:** Permitir asignación inteligente y masiva de keywords (por nivel semántico) a URLs (por tipología)

---

## 1. ARQUITECTURA GENERAL

```
FASE 1: CARGA
├── URLs (con tipología)
└── Keywords (con nivel semántico)

FASE 2: MATCHING
├── Análisis automático (por tipología + nivel)
└── Sugerencias de asignación

FASE 3: ASIGNACIÓN
├── Revisar sugerencias
├── Ajustar manualmente si es necesario
└── Guardar relaciones

FASE 4: EXPORTACIÓN
└── URLs con keywords asignadas listas para /optimizador/
```

---

## 2. ESTRUCTURA DE DATOS

### Tabla: `io_sem_asignaciones_kw_url`

```sql
id UUID
cliente_id UUID (FK)
url_id UUID (FK io_sem_urls_rastreadas)
keyword_id UUID (FK io_sem_palabras_clave)
tipo_asignacion VARCHAR (automática | manual | sugerida)
puntuacion_relevancia FLOAT (0-1) -- Qué tan relevante es
estado VARCHAR (pendiente | revisada | confirmada)
notas TEXT
creado_en TIMESTAMP
actualizado_en TIMESTAMP

INDEX: cliente_id, url_id, keyword_id
```

### Tabla: `io_sem_tipologias_contenido`

```sql
id UUID
nombre VARCHAR (Blog, Producto, Categoría, Landing, etc)
descripcion TEXT
nivel_ideal VARCHAR (JSON array de niveles recomendados)
creado_en TIMESTAMP
```

---

## 3. FLUJO DE CARGA MASIVA

### PASO 1: Carga de URLs (con tipología)

**UI:** `/clientes/[id]` → Pestaña "URLs Masivas"

```
Archivo CSV esperado:
url_actual,tipo_contenido,codigo_respuesta,...,tipologia_contenido
https://...,HTML,200,...,Blog
https://...,HTML,200,...,Producto
https://...,HTML,200,...,Categoría
```

**Tipologías soportadas:**

- 🏷️ Producto
- 📝 Blog Post
- 📂 Categoría
- 🎯 Landing Page
- 📄 Página Estática
- 🔄 Listado
- 👤 Perfil/About

---

## 4. MATCHING INTELIGENTE (Automático)

### Algoritmo de Asignación

```
FOR CADA URL (tipología X):
  FOR CADA KEYWORD (nivel Y):
    puntuacion = calcular_relevancia(tipología_X, nivel_Y)

    IF puntuacion > 0.7:
      SUGERIR asignación
      tipo_asignacion = "sugerida"
      estado = "pendiente_revision"
```

### Matriz de Relevancia (Ejemplo)

| Tipología | Level1 | Level2 | Level3 | Level4 | Level5 | Level6 |
| --------- | ------ | ------ | ------ | ------ | ------ | ------ |
| Producto  | 0.9    | 0.8    | 0.6    | 0.5    | 0.8    | 0.0    |
| Blog      | 0.5    | 0.7    | 0.9    | 0.7    | 0.6    | 0.0    |
| Categoría | 0.8    | 0.8    | 0.5    | 0.4    | 0.7    | 0.0    |
| Landing   | 0.9    | 0.7    | 0.4    | 0.6    | 0.5    | 0.0    |

**Lógica:**

- Level 6 (Banned) = nunca asignar (0.0)
- Productos van bien con Level1+Level5 (marca + long-tail transaccional)
- Blogs van bien con Level3 (educativo/howto)
- Categorías van bien con Level1+Level2 (core + local)

---

## 5. INTERFAZ DE ASIGNACIÓN

### Opción A: Vista de Tabla (Recomendada)

```
URL                          | Tipología    | Sugerencias de KW        | Estado
https://...producto-1        | Producto     | [Agregar 5 keywords]     | ⭐ 5 asignadas
https://...blog-tutorial     | Blog         | [Revisar 3 sugerencias]  | ⏳ Pendiente
https://...categoria-X       | Categoría    | [Confirmar 2]            | ✅ Revisado

Click en fila → Modal de asignación:
┌─────────────────────────────────────────┐
│ URL: https://...producto-1              │
│ Tipología: Producto                     │
├─────────────────────────────────────────┤
│ SUGERENCIAS AUTOMÁTICAS:                │
│ ☑️ "zapatos deportivos" - Level1 - 0.92 │
│ ☑️ "zapatillas nike" - Level5 - 0.87    │
│ ☐ "comprar zapatillas" - Level5 - 0.78  │
│ ☐ "reviews zapatillas" - Level3 - 0.45  │
├─────────────────────────────────────────┤
│ AGREGAR MANUAL:                         │
│ [Buscar keyword]  [Seleccionar nivel]   │
├─────────────────────────────────────────┤
│ [Guardar]  [Cancelar]                   │
└─────────────────────────────────────────┘
```

### Opción B: Vista Kanban (Alternativa)

```
PENDIENTE DE REVISION    | REVISADO      | CONFIRMADO
├─ URL 1                 | ├─ URL 4      | ├─ URL 7
│  3 keywords sugeridas  | │  2 keywords │  5 keywords
├─ URL 2                 | │  reviewed   │  asignados
│  5 keywords sugeridas  | └─ URL 5      | └─ URL 8
└─ URL 3                 |  4 keywords   |  3 keywords
   2 keywords sugeridas  |  reviewed     |  asignados
```

---

## 6. FLUJOS DE TRABAJO

### Flujo 1: Asignación TOTALMENTE Automática

```
1. Cargar URLs (con tipología)
2. Sistema sugiere automáticamente
3. Guardar todas las sugerencias
4. Usar directamente en /optimizador/

⏱️ Tiempo: 5 minutos
✅ Para: Usuarios confiados, auditorías grandes
```

### Flujo 2: Asignación Semi-Manual (Recomendado)

```
1. Cargar URLs (con tipología)
2. Sistema sugiere automáticamente
3. Usuario REVISA cada URL
4. Ajusta manualmente si es necesario
5. CONFIRMA antes de usar

⏱️ Tiempo: 30-60 minutos (100 URLs)
✅ Para: Control de calidad, auditorías precisas
```

### Flujo 3: Asignación Manual Pura

```
1. Cargar URLs (con tipología)
2. Usuario asigna keywords manualmente
3. Busca por keyword + nivel
4. Agrupa por tipología

⏱️ Tiempo: 2-3 horas (100 URLs)
✅ Para: Control total, ajustes específicos
```

---

## 7. NUEVAS INTERFACES NECESARIAS

### En `/clientes/[id]`:

#### Pestaña 4: "📊 Asignar Keywords"

```
┌────────────────────────────────────────┐
│ STEP 1: SELECCIONA URLS                │
├────────────────────────────────────────┤
│ ☑️ Todas las URLs (5)                  │
│ ☐ Filtrar por tipología: [Producto ▼] │
│ ☐ Filtrar por estado: [Pendiente ▼]  │
│                                        │
│ URLs seleccionadas: 5/5               │
├────────────────────────────────────────┤
│ STEP 2: ANÁLISIS AUTOMÁTICO           │
│                                        │
│ [▶ Generar Sugerencias]               │
│                                        │
│ Resultados:                            │
│ ✅ 3 URLs con 5+ sugerencias cada      │
│ ⚠️ 2 URLs sin sugerencias (revisar)   │
├────────────────────────────────────────┤
│ STEP 3: REVISAR & CONFIRMAR           │
│                                        │
│ [Abrir Vista de Revisión]             │
│ [Guardar Automático]                  │
│ [Guardar & Optimizar]                 │
└────────────────────────────────────────┘
```

### En `/optimizador/`:

#### Pestaña: "⚙️ Análisis de Asignaciones"

```
URLs con Keywords asignadas:
┌─ https://...producto-1
│  ├─ "zapatos deportivos" (Level1) ✅
│  ├─ "zapatillas nike" (Level5) ✅
│  └─ "comprar zapatillas" (Level5) ✅
│
├─ https://...blog-tutorial
│  ├─ "cómo elegir zapatillas" (Level3) ✅
│  └─ "guía zapatillas 2026" (Level3) ✅
│
└─ https://...categoria
   ├─ "zapatillas" (Level1) ✅
   └─ "zapatillas mujer" (Level2) ✅

Total: 7 URLs con 12 keywords asignadas
```

---

## 8. BACKEND NECESARIO

### Nuevos Endpoints API

```
POST /api/asignaciones/generar-sugerencias
  {
    cliente_id: UUID,
    url_ids: UUID[] (opcional: todas si vacío),
    tipologias: string[] (opcional)
  }
  → Retorna: sugerencias de asignación

PUT /api/asignaciones/confirmar-lote
  {
    cliente_id: UUID,
    asignaciones: [{ url_id, keyword_id, confirmada }]
  }
  → Guarda todas las asignaciones

GET /api/asignaciones/estado
  { cliente_id: UUID }
  → Retorna: progreso de asignaciones

DELETE /api/asignaciones/{id}
  → Elimina una asignación
```

---

## 9. CONFIGURACIÓN DE MATRIZ DE RELEVANCIA

Crear tabla `io_sem_matriz_relevancia`:

```sql
tipologia_id UUID (FK)
nivel_keyword VARCHAR
puntuacion FLOAT
creado_en TIMESTAMP

Permite ajustar la matriz por cliente/proyecto
```

**Interfaz de Configuración:**

```
Matriz de Relevancia (Personalizar)

Tipología: [Producto ▼]

Level1 Entity Core:    [0.9] ✅
Level2 Local:          [0.8] ✅
Level3 Educational:    [0.6] ⚠️
Level4 Commercial:     [0.5] ❌
Level5 Longtail:       [0.8] ✅
Level6 Banned:         [0.0] ✅

[Guardar Cambios]
```

---

## 10. VENTAJAS DE ESTA ARQUITECTURA

✅ **Escalabilidad:** Procesar 1000+ URLs sin problemas  
✅ **Inteligencia:** Sugerencias automáticas basadas en tipología  
✅ **Control:** Usuario puede revisar y ajustar  
✅ **Flexibilidad:** Manual, automática o híbrida  
✅ **Trazabilidad:** Registra qué se asignó y cuándo  
✅ **Auditoría:** Historial de cambios  
✅ **Reutilización:** Las sugerencias se mejoran con el tiempo

---

## 11. FASES DE IMPLEMENTACIÓN

### Fase 1 (Inmediata): MVP

- ✅ Tabla `io_sem_asignaciones_kw_url`
- ✅ Tabla `io_sem_tipologias_contenido`
- ✅ Endpoints básicos de C/R/U/D
- ✅ UI de asignación manual

### Fase 2 (1-2 semanas): Automático

- 🔵 Algoritmo de matching automático
- 🔵 Matriz de relevancia
- 🔵 UI de revisión de sugerencias

### Fase 3 (3-4 semanas): Inteligencia

- 🔵 ML para mejorar sugerencias
- 🔵 Análisis de competidores
- 🔵 Reportes de cobertura de keywords

---

## 12. PREGUNTAS DE DISEÑO PENDIENTES

❓ ¿Una URL puede tener múltiples keywords del MISMO nivel?  
❓ ¿Una keyword puede asignarse a múltiples URLs?  
❓ ¿Límite máximo de keywords por URL?  
❓ ¿Versionado de asignaciones? (histórico de cambios)  
❓ ¿Validar que un nivel Level6 nunca se asigne?  
❓ ¿Integración con /optimizador/ → usar las asignaciones automáticamente?

---

## PRÓXIMOS PASOS

1. **Revisar propuesta** ← Aquí estamos
2. **Validar con requisitos** del cliente
3. **Implementar Fase 1** (MVP)
4. **Testing** con datos reales
5. **Iterar** según feedback
