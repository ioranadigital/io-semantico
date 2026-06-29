# ✅ ESPECIFICACIONES VALIDADAS - Asignación KW a URLs

**Estado:** Validado con cliente  
**Fecha:** 2026-06-11  
**Responsable:** Equipo Técnico

---

## RESPUESTAS VALIDADAS

### 1️⃣ Múltiples Keywords del MISMO Nivel por URL

**Decisión:** ✅ SÍ, absolutamente permitido

**Caso de uso:**

```
URL: /pantalones-pana-70
├─ Level1 (Core):
│  ├─ "pantalones de pana vintage"
│  └─ "pantalones pana años 70"
├─ Level5 (Long-Tail):
│  ├─ "comprar pantalones pana campana"
│  └─ "pantalones de pana originales 70s"
```

**Razón:** SEO real = clúster de términos co-ocurrentes + sinónimos  
**Impacto:** Enriquecimiento semántico sin keyword stuffing

**Implementación:**

- ✅ NO hay límite de keywords del mismo nivel en BD
- ✅ El frontend/backend debe permitir agregar múltiples
- ✅ Tabla `io_sem_asignaciones_kw_url` soporta N:M (una URL → múltiples keywords)

---

### 2️⃣ Máximo de Keywords por URL

**Decisión:** 5-6 keywords seleccionadas máximo por URL para optimizar

**Distribución recomendada:**

```
├─ 1-2 de Nivel1 (Core/Brand)
├─ 1-2 de Nivel2/3/4 (Segmentación o Intención)
└─ 1-2 de Nivel5 (Long-tail para H2s y variaciones)
```

**Razón:** Saturación de Claude API si pasan 15-20 keywords  
**Regla de oro:** Límite en Front-End (UX), sin límite en BD (flexibilidad)

**Implementación:**

```typescript
// Frontend validation
if (asignacionesSeleccionadas.length > 6) {
  mostrarError("Máximo 6 keywords por URL");
  return;
}

// Backend: permitir más, pero advertencia en logs
if (asignaciones.length > 10) {
  console.warn(
    `URL ${url_id} tiene ${asignaciones.length} keywords - límite recomendado 6`,
  );
}
```

**En llamada a Claude:**

```javascript
const keywordsParaClaudePrompt = asignaciones.slice(0, 6);
// Solo las primeras 6 se pasan al prompt
```

---

### 3️⃣ Asignaciones = Combustible Principal de /optimizador/

**Decisión:** ✅ SÍ, automático como entrada principal

**Flujo en /optimizador/:**

```
1. Usuario selecciona URL
2. Sistema consulta: SELECT * FROM io_sem_asignaciones_kw_url
   WHERE url_id = ? AND cliente_id = ?
3. Extrae máximo 6 keywords
4. Las pasa en el prompt a Claude
5. Claude genera optimizaciones basadas SOLO en esas keywords
```

**Si no hay asignaciones previas:**

- Sugerir automáticamente con pgvector (nearest embeddings)
- Mostrar: "Sugerencias automáticas (confirmar antes de usar)"
- No pasar a Claude sin confirmación del usuario

**Implementación:**

```sql
-- En /optimizador/ al cargar URL
SELECT k.*, a.estado, a.puntuacion_relevancia
FROM io_sem_asignaciones_kw_url a
JOIN io_sem_palabras_clave k ON a.keyword_id = k.id
WHERE a.url_id = $1 AND a.cliente_id = $2
LIMIT 6
ORDER BY a.puntuacion_relevancia DESC;
```

---

### 4️⃣ Versionado de Asignaciones

**Decisión:** ❌ NO necesario histórico completo

**Enfoque práctico agencia:**

- No guardar "qué estaba asignado hace 3 meses"
- Guardar el entregable final en tabla `io_sem_optimizaciones`

**Implementación:**

```sql
-- Tabla io_sem_optimizaciones (NUEVA columna)
ALTER TABLE io_sem_optimizaciones ADD COLUMN estado VARCHAR;
-- ENUM('borrador', 'aprobado', 'implementado')

-- Flujo:
1. Primera optimización → estado='borrador'
2. Usuario aprueba → estado='aprobado'
3. Cliente implementa en web → estado='implementado'

-- Re-optimización:
- No actualizar fila anterior
- Crear NUEVA fila con mismo url_id
- Anterior queda como histórico por defecto
```

**Ventaja:** Auditoría sin complejidad de versionado

---

### 5️⃣ Validación Level6 (Banned Words)

**Decisión:** ✅ SÍ, escudo infranqueable en 2 niveles

#### Filtro 1: Asignación (Frontend)

```typescript
// En ClienteUrlsIndividual.tsx al asignar
const validarLevel6 = (keyword: string) => {
  const bannedWords = [/*lista de level6*/];
  const contienePalabrasProhibidas = bannedWords.some(
    word => keyword.toLowerCase().includes(word)
  );

  if (contienePalabrasProhibidas) {
    mostrarAdvertencia(`"${keyword}" contiene palabras prohibidas (Level6)`);
    return false;
  }
  return true;
};

// Deshabilitar si es Level6
if (keyword.nivel === 'level6_banned_words') {
  return <div className="opacity-50">No se puede asignar nivel 6</div>;
}
```

#### Filtro 2: Generación IA (Backend)

```typescript
// En POST /api/optimizaciones/generar
const validarSalidaClaudeLevel6 = (respuestaClaudeJSON) => {
  const bannedWordsRegex = /palabra1|palabra2|palabra3/gi;

  const campos = [
    respuestaClaudeJSON.meta_title_propuesto,
    respuestaClaudeJSON.h1_propuesto,
    respuestaClaudeJSON.h2_propuesto,
    respuestaClaudeJSON.meta_description_propuesto,
  ];

  campos.forEach((campo) => {
    if (bannedWordsRegex.test(campo)) {
      console.error(`⚠️ Level6 detectado en salida de Claude`);
      // Opción A: Rechazar y pedir regeneración
      // Opción B: Limpiar automáticamente
      campo = campo.replace(bannedWordsRegex, "");
    }
  });

  return respuestaClaudeJSON;
};
```

**Implementación BD:**

```sql
-- Tabla io_sem_nivel6_keywords (palabras prohibidas)
CREATE TABLE io_sem_nivel6_keywords (
  id UUID PRIMARY KEY,
  palabra VARCHAR UNIQUE,
  tipo ENUM('banned_words', 'banned_tones', 'competing_keywords'),
  cliente_id UUID (NULL = global)
);

-- Query al asignar
SELECT palabra FROM io_sem_nivel6_keywords
WHERE cliente_id IS NULL OR cliente_id = $1;
```

---

### 6️⃣ Carga Masiva de Asignaciones

**Decisión:** ✅ SÍ, vital para onboarding

**Estructura de CSV esperado:**

```csv
palabra_clave,nivel,volumen,url_destino
"pantalones pana vintage",level1_entity_core,1200,https://tienda.com/pantalones-pana-70
"comprar pantalones pana",level5_longtail_transactional,450,https://tienda.com/pantalones-pana-70
"pana años 70",level1_entity_core,800,https://tienda.com/pantalones-pana-70
"jeans vintage",level1_entity_core,2100,https://tienda.com/jeans-vintage
```

**Implementación:**

```typescript
// En ClienteKeywordsIngest.tsx
const handleFileUploadWithAssignments = async (file: File) => {
  const text = await file.text();
  const lines = text.split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

  const urlDestinoIndex = headers.indexOf("url_destino");

  lines.slice(1).forEach((line) => {
    const values = line.split(",").map((v) => v.trim());

    const keywordData = {
      cliente_id: clienteId,
      palabra_clave: values[0],
      nivel: values[1],
      volumen: values[2],
    };

    // Guardar keyword
    const keyword = await supabase
      .from("io_sem_palabras_clave")
      .insert(keywordData);

    // SI viene url_destino, crear asignación automática
    if (urlDestinoIndex !== -1 && values[urlDestinoIndex]) {
      const urlDestino = values[urlDestinoIndex];

      // Buscar URL en tabla io_sem_urls_rastreadas
      const { data: url } = await supabase
        .from("io_sem_urls_rastreadas")
        .select("id")
        .eq("url_actual", urlDestino)
        .eq("cliente_id", clienteId)
        .single();

      if (url) {
        await supabase.from("io_sem_asignaciones_kw_url").insert({
          cliente_id: clienteId,
          url_id: url.id,
          keyword_id: keyword.id,
          tipo_asignacion: "carga_masiva",
          estado: "pendiente_revision",
        });
      }
    }
  });
};
```

**Resultado en BD:**

```
io_sem_palabras_clave:
└─ "pantalones pana vintage" (level1)
└─ "comprar pantalones pana" (level5)

io_sem_asignaciones_kw_url:
└─ url_id:123 ← keyword:"pantalones pana vintage"
└─ url_id:123 ← keyword:"comprar pantalones pana"
```

---

## TABLAS NUEVAS NECESARIAS

```sql
-- 1. Tipologías de contenido
CREATE TABLE io_sem_tipologias_contenido (
  id UUID PRIMARY KEY,
  cliente_id UUID (NULL = global),
  nombre VARCHAR,
  descripcion TEXT
);

-- 2. Asignaciones KW → URL
CREATE TABLE io_sem_asignaciones_kw_url (
  id UUID PRIMARY KEY,
  cliente_id UUID,
  url_id UUID,
  keyword_id UUID,
  tipo_asignacion VARCHAR ('carga_masiva', 'manual', 'sugerida'),
  puntuacion_relevancia FLOAT,
  estado VARCHAR ('pendiente_revision', 'confirmada', 'rechazada'),
  creado_en TIMESTAMP,
  actualizado_en TIMESTAMP
);

-- 3. Keywords Level6 (palabras prohibidas)
CREATE TABLE io_sem_nivel6_keywords (
  id UUID PRIMARY KEY,
  cliente_id UUID (NULL = global),
  palabra VARCHAR,
  tipo VARCHAR ('banned_words', 'banned_tones', 'competing_keywords')
);

-- 4. Actualizar io_sem_optimizaciones (NUEVA columna)
ALTER TABLE io_sem_optimizaciones
ADD COLUMN estado VARCHAR DEFAULT 'borrador';
-- ENUM('borrador', 'aprobado', 'implementado')
```

---

## FLUJO COMPLETO FINAL

```
┌─────────────────────────────────────┐
│ PASO 1: CARGAR URLs + Tipología     │
│ CSV: url, tipo_contenido, tipologia │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ PASO 2: CARGAR Keywords + Asignación│
│ CSV: keyword, nivel, url_destino    │
│ Sistema crea asignaciones automático │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ PASO 3: REVISAR en /clientes/[id]   │
│ Tabla de asignaciones               │
│ Confirmar/Rechazar/Ajustar          │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ PASO 4: /optimizador/ Carga Auto    │
│ Extrae 6 keywords por URL           │
│ Pasa a Claude en prompt             │
│ Claude genera optimizaciones        │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│ PASO 5: GUARDAR en Optimizaciones   │
│ estado: 'borrador'                  │
│ Listo para usuario final            │
└─────────────────────────────────────┘
```

---

## ❓ PREGUNTAS TÉCNICAS FINALES

**Antes de implementar, necesito clarificar:**

1. **¿Tabla separada para io_sem_tipologias_contenido?**
   - ¿O simplemente guardar tipología (string) en io_sem_urls_rastreadas?

2. **¿Matriz de relevancia por tipología + nivel?**
   - ¿La necesitamos para fase 1 (MVP)?
   - ¿O implementarla después?

3. **¿UI de asignación: Tabla o Modal?**
   - ¿Tabla grande con todas las URLs + botón "Editar"?
   - ¿O Modal cuando haces click en cada URL?

4. **¿Límite de 6 keywords se valida en:**
   - ¿Frontend (bloquear)? ¿O Backend (permitir pero advertencia)?

5. **¿En /optimizador/ si no hay asignaciones previas:**
   - ¿Sugerir automático con embeddings?
   - ¿O dejar vacío y decir "Asigna keywords primero"?
