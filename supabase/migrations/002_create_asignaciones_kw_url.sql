-- ============================================
-- MIGRATION 002: Create keyword-URL assignments
-- ============================================
CREATE TABLE IF NOT EXISTS io_sem_asignaciones_kw_url (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL,
  url_id UUID NOT NULL REFERENCES io_sem_urls_rastreadas(id) ON DELETE CASCADE,
  keyword_id UUID NOT NULL REFERENCES io_sem_palabras_clave(id) ON DELETE CASCADE,
  tipo_asignacion VARCHAR DEFAULT 'manual',
  puntuacion_relevancia FLOAT DEFAULT 1.0,
  estado VARCHAR DEFAULT 'confirmada',
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

COMMENT ON TABLE io_sem_asignaciones_kw_url IS
'Mapa de asignaciones: qué keywords están asignadas a cada URL';
