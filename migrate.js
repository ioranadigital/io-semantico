#!/usr/bin/env node
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://zvehtloitnuglyjtxwye.supabase.co";
const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NjgyNCwiZXhwIjoyMDkwNjUyODI0fQ.5qoJbZfeY7o4W5nnIWKRKSPHstjuEmRuYbTnt_74xtY";

async function migrate() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // SQL para crear tabla de asignaciones
  const sql = `
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

COMMENT ON TABLE io_sem_asignaciones_kw_url IS 'Mapa de asignaciones: qué keywords están asignadas a cada URL';
  `.trim();

  try {
    console.log("🔗 Conectando a Supabase...");

    // Usar RPC para ejecutar SQL si existe
    // O mejor: usar directamente la API SQL de Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("✅ Migración completada!");
    console.log("\n✓ Tabla io_sem_asignaciones_kw_url creada");
    console.log("✓ Índices creados");
    console.log("✓ RLS habilitado");
  } catch (error) {
    console.error("❌ Error en migración:", error.message);
    process.exit(1);
  }
}

migrate();
