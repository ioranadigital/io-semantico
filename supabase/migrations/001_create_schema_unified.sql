-- ============================================================
-- MIGRATION 001: Create unified schema for io-semantico SaaS
-- ============================================================
-- Order: Base tables first, then references
-- Naming convention: url (not url_actual), h1 (not h1_1_actual), etc.

-- ============================================================
-- TABLE 1: io_sem_clientes (base, no external references)
-- ============================================================
CREATE TABLE IF NOT EXISTS io_sem_clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  url TEXT,
  descripcion TEXT,
  keywords_count INTEGER DEFAULT 0,
  urls_count INTEGER DEFAULT 0,
  optimizaciones_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_clientes_nombre ON io_sem_clientes(nombre);
CREATE INDEX IF NOT EXISTS idx_clientes_created_at ON io_sem_clientes(created_at DESC);

ALTER TABLE io_sem_clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow all reads" ON io_sem_clientes
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow all writes" ON io_sem_clientes
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all updates" ON io_sem_clientes
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all deletes" ON io_sem_clientes
  FOR DELETE USING (true);

-- ============================================================
-- TABLE 2: io_sem_palabras_clave (base, no external references)
-- ============================================================
CREATE TABLE IF NOT EXISTS io_sem_palabras_clave (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  palabra_clave VARCHAR NOT NULL,
  volumen_busqueda INTEGER DEFAULT 0,
  dificultad INTEGER DEFAULT 0, -- 1-100
  cpc FLOAT DEFAULT 0.0,
  intension VARCHAR DEFAULT 'informacional', -- transaccional, informacional, navegacional, local
  nivel VARCHAR DEFAULT 'level3', -- level1, level2, level3, level4, level5, level6
  estado VARCHAR DEFAULT 'activa', -- activa, pausada, archivada
  tags VARCHAR[] DEFAULT '{}',
  notas TEXT,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_keyword_por_cliente UNIQUE(cliente_id, palabra_clave)
);

CREATE INDEX IF NOT EXISTS idx_palabras_clave_cliente ON io_sem_palabras_clave(cliente_id);
CREATE INDEX IF NOT EXISTS idx_palabras_clave_nivel ON io_sem_palabras_clave(cliente_id, nivel);
CREATE INDEX IF NOT EXISTS idx_palabras_clave_estado ON io_sem_palabras_clave(cliente_id, estado);

ALTER TABLE io_sem_palabras_clave ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- TABLE 3: io_sem_urls_rastreadas (references clientes)
-- ============================================================
CREATE TABLE IF NOT EXISTS io_sem_urls_rastreadas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  url VARCHAR NOT NULL,

  -- SEO metadata (current state from crawl)
  h1 VARCHAR,
  h1_2 VARCHAR,
  h2 VARCHAR,
  h2_2 VARCHAR,
  meta_title VARCHAR(60),
  meta_description VARCHAR(155),

  -- Page classification
  tipologia VARCHAR DEFAULT NULL, -- Producto, Blog, Categoría, Landing, Estático, Listado, Perfil

  -- Tracking
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_url_por_cliente UNIQUE(cliente_id, url)
);

CREATE INDEX IF NOT EXISTS idx_urls_cliente ON io_sem_urls_rastreadas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_urls_tipologia ON io_sem_urls_rastreadas(cliente_id, tipologia);
CREATE INDEX IF NOT EXISTS idx_urls_creado ON io_sem_urls_rastreadas(cliente_id, creado_en DESC);

ALTER TABLE io_sem_urls_rastreadas ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE io_sem_urls_rastreadas IS 'URLs rastreadas con metadata SEO actual';
COMMENT ON COLUMN io_sem_urls_rastreadas.url IS 'URL completa (antes: url_actual)';
COMMENT ON COLUMN io_sem_urls_rastreadas.h1 IS 'H1 actual (antes: h1_1_actual)';
COMMENT ON COLUMN io_sem_urls_rastreadas.meta_title IS 'Título meta actual (antes: meta_title_actual)';
COMMENT ON COLUMN io_sem_urls_rastreadas.meta_description IS 'Descripción meta actual (antes: meta_description_actual)';

-- ============================================================
-- TABLE 4: io_sem_asignaciones_kw_url (references keywords + urls)
-- ============================================================
CREATE TABLE IF NOT EXISTS io_sem_asignaciones_kw_url (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  url_id UUID NOT NULL REFERENCES io_sem_urls_rastreadas(id) ON DELETE CASCADE,
  keyword_id UUID NOT NULL REFERENCES io_sem_palabras_clave(id) ON DELETE CASCADE,

  tipo_asignacion VARCHAR DEFAULT 'manual', -- manual, automatica
  puntuacion_relevancia FLOAT DEFAULT 1.0,
  estado VARCHAR DEFAULT 'confirmada', -- pendiente_revision, confirmada, rechazada

  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_asignacion UNIQUE(cliente_id, url_id, keyword_id),
  CONSTRAINT valid_estado CHECK (
    estado IN ('pendiente_revision', 'confirmada', 'rechazada')
  )
);

CREATE INDEX IF NOT EXISTS idx_asignaciones_url ON io_sem_asignaciones_kw_url(cliente_id, url_id);
CREATE INDEX IF NOT EXISTS idx_asignaciones_keyword ON io_sem_asignaciones_kw_url(cliente_id, keyword_id);
CREATE INDEX IF NOT EXISTS idx_asignaciones_estado ON io_sem_asignaciones_kw_url(cliente_id, estado);

ALTER TABLE io_sem_asignaciones_kw_url ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE io_sem_asignaciones_kw_url IS 'Mapa de asignaciones: qué keywords están asignadas a cada URL';

-- ============================================================
-- TABLE 5: io_sem_optimizaciones (references clientes + urls)
-- ============================================================
CREATE TABLE IF NOT EXISTS io_sem_optimizaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  url_id UUID NOT NULL REFERENCES io_sem_urls_rastreadas(id) ON DELETE CASCADE,

  -- Proposed optimizations
  meta_title_mejorado VARCHAR(60),
  meta_description_mejorada VARCHAR(155),
  h1_mejorado VARCHAR,
  h1_2_mejorado VARCHAR,
  h2_mejorado VARCHAR,
  h2_2_mejorado VARCHAR,

  -- Quality scores
  score_title INT DEFAULT 0,
  score_description INT DEFAULT 0,
  score_h1 INT DEFAULT 0,

  -- Status & metadata
  prioridad VARCHAR DEFAULT 'bajo', -- prioritario, medio, bajo
  intencion_busqueda VARCHAR, -- transaccional, informacional, navegacional, local
  estado VARCHAR DEFAULT 'generada', -- generada, aplicada, rechazada
  propuesta_json JSONB, -- Full optimization proposal as JSON

  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_optimization_por_url UNIQUE(cliente_id, url_id)
);

CREATE INDEX IF NOT EXISTS idx_optimizaciones_cliente ON io_sem_optimizaciones(cliente_id);
CREATE INDEX IF NOT EXISTS idx_optimizaciones_url ON io_sem_optimizaciones(url_id);
CREATE INDEX IF NOT EXISTS idx_optimizaciones_estado ON io_sem_optimizaciones(cliente_id, estado);
CREATE INDEX IF NOT EXISTS idx_optimizaciones_prioridad ON io_sem_optimizaciones(cliente_id, prioridad);

ALTER TABLE io_sem_optimizaciones ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE io_sem_optimizaciones IS 'Propuestas de optimización SEO generadas por IA';

-- ============================================================
-- End of schema migration
-- ============================================================
