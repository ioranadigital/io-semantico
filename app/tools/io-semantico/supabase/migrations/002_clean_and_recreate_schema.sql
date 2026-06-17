-- ============================================================
-- MIGRATION 002: Clean and Recreate Schema (Fix existing issues)
-- ============================================================
-- Este script limpia las tablas existentes y las recrea correctamente

-- Primero, deshabilitar RLS para evitar conflictos
ALTER TABLE IF EXISTS io_sem_optimizaciones DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS io_sem_asignaciones_kw_url DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS io_sem_urls_rastreadas DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS io_sem_palabras_clave DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS io_sem_clientes DISABLE ROW LEVEL SECURITY;

-- Eliminar tablas en orden inverso (para evitar FK conflicts)
DROP TABLE IF EXISTS io_sem_optimizaciones CASCADE;
DROP TABLE IF EXISTS io_sem_asignaciones_kw_url CASCADE;
DROP TABLE IF EXISTS io_sem_urls_rastreadas CASCADE;
DROP TABLE IF EXISTS io_sem_palabras_clave CASCADE;
DROP TABLE IF EXISTS io_sem_clientes CASCADE;

-- ============================================================
-- RECREAR TODAS LAS TABLAS DESDE CERO
-- ============================================================

-- TABLE 1: io_sem_clientes (base, sin referencias externas)
CREATE TABLE io_sem_clientes (
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

CREATE INDEX idx_clientes_nombre ON io_sem_clientes(nombre);
CREATE INDEX idx_clientes_created_at ON io_sem_clientes(created_at DESC);

ALTER TABLE io_sem_clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all reads" ON io_sem_clientes
  FOR SELECT USING (true);
CREATE POLICY "Allow all writes" ON io_sem_clientes
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates" ON io_sem_clientes
  FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all deletes" ON io_sem_clientes
  FOR DELETE USING (true);

-- TABLE 2: io_sem_palabras_clave (base, solo referencia a clientes)
CREATE TABLE io_sem_palabras_clave (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  palabra_clave VARCHAR NOT NULL,
  volumen_busqueda INTEGER DEFAULT 0,
  dificultad INTEGER DEFAULT 0,
  cpc FLOAT DEFAULT 0.0,
  intension VARCHAR DEFAULT 'informacional',
  nivel VARCHAR DEFAULT 'level3',
  estado VARCHAR DEFAULT 'activa',
  tags VARCHAR[] DEFAULT '{}',
  notas TEXT,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_keyword_por_cliente UNIQUE(cliente_id, palabra_clave)
);

CREATE INDEX idx_palabras_clave_cliente ON io_sem_palabras_clave(cliente_id);
CREATE INDEX idx_palabras_clave_nivel ON io_sem_palabras_clave(cliente_id, nivel);
CREATE INDEX idx_palabras_clave_estado ON io_sem_palabras_clave(cliente_id, estado);

ALTER TABLE io_sem_palabras_clave ENABLE ROW LEVEL SECURITY;

-- TABLE 3: io_sem_urls_rastreadas (referencias a clientes)
CREATE TABLE io_sem_urls_rastreadas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  url VARCHAR NOT NULL,
  h1 VARCHAR,
  h1_2 VARCHAR,
  h2 VARCHAR,
  h2_2 VARCHAR,
  meta_title VARCHAR(60),
  meta_description VARCHAR(155),
  tipologia VARCHAR DEFAULT NULL,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_url_por_cliente UNIQUE(cliente_id, url)
);

CREATE INDEX idx_urls_cliente ON io_sem_urls_rastreadas(cliente_id);
CREATE INDEX idx_urls_tipologia ON io_sem_urls_rastreadas(cliente_id, tipologia);
CREATE INDEX idx_urls_creado ON io_sem_urls_rastreadas(cliente_id, creado_en DESC);

ALTER TABLE io_sem_urls_rastreadas ENABLE ROW LEVEL SECURITY;

-- TABLE 4: io_sem_asignaciones_kw_url (referencias a palabras_clave y urls_rastreadas)
CREATE TABLE io_sem_asignaciones_kw_url (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  url_id UUID NOT NULL REFERENCES io_sem_urls_rastreadas(id) ON DELETE CASCADE,
  keyword_id UUID NOT NULL REFERENCES io_sem_palabras_clave(id) ON DELETE CASCADE,
  tipo_asignacion VARCHAR DEFAULT 'manual',
  puntuacion_relevancia FLOAT DEFAULT 1.0,
  estado VARCHAR DEFAULT 'confirmada',
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_asignacion UNIQUE(cliente_id, url_id, keyword_id),
  CONSTRAINT valid_estado CHECK (estado IN ('pendiente_revision', 'confirmada', 'rechazada'))
);

CREATE INDEX idx_asignaciones_url ON io_sem_asignaciones_kw_url(cliente_id, url_id);
CREATE INDEX idx_asignaciones_keyword ON io_sem_asignaciones_kw_url(cliente_id, keyword_id);
CREATE INDEX idx_asignaciones_estado ON io_sem_asignaciones_kw_url(cliente_id, estado);

ALTER TABLE io_sem_asignaciones_kw_url ENABLE ROW LEVEL SECURITY;

-- TABLE 5: io_sem_optimizaciones (referencias a clientes y urls_rastreadas)
CREATE TABLE io_sem_optimizaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES io_sem_clientes(id) ON DELETE CASCADE,
  url_id UUID NOT NULL REFERENCES io_sem_urls_rastreadas(id) ON DELETE CASCADE,
  meta_title_mejorado VARCHAR(60),
  meta_description_mejorada VARCHAR(155),
  h1_mejorado VARCHAR,
  h1_2_mejorado VARCHAR,
  h2_mejorado VARCHAR,
  h2_2_mejorado VARCHAR,
  score_title INT DEFAULT 0,
  score_description INT DEFAULT 0,
  score_h1 INT DEFAULT 0,
  prioridad VARCHAR DEFAULT 'bajo',
  intencion_busqueda VARCHAR,
  estado VARCHAR DEFAULT 'generada',
  propuesta_json JSONB,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_optimization_por_url UNIQUE(cliente_id, url_id)
);

CREATE INDEX idx_optimizaciones_cliente ON io_sem_optimizaciones(cliente_id);
CREATE INDEX idx_optimizaciones_url ON io_sem_optimizaciones(url_id);
CREATE INDEX idx_optimizaciones_estado ON io_sem_optimizaciones(cliente_id, estado);
CREATE INDEX idx_optimizaciones_prioridad ON io_sem_optimizaciones(cliente_id, prioridad);

ALTER TABLE io_sem_optimizaciones ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CONFIRMACIÓN
-- ============================================================
SELECT 'Schema recreado correctamente' as resultado;
