import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action !== "create_assignments_table") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Ejecutar SQL para crear tabla de asignaciones
    const { error } = await supabase.rpc("exec_sql", {
      sql: `
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
      `,
    });

    if (error) {
      console.error("Migration error:", error);
      return NextResponse.json(
        { error: "Migration failed", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Table io_sem_asignaciones_kw_url created successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
