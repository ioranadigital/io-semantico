"use client";

import { AlertCircle, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const SQL = `CREATE TABLE IF NOT EXISTS public.clientes (
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

CREATE INDEX idx_clientes_created_at ON public.clientes(created_at DESC);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all reads" ON public.clientes FOR SELECT USING (true);
CREATE POLICY "Allow all writes" ON public.clientes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates" ON public.clientes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow all deletes" ON public.clientes FOR DELETE USING (true);`;

export default function SetupGuide() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="card card-padding bg-amber-50 border border-amber-200 mb-8">
        <div className="flex items-start gap-4">
          <AlertCircle
            className="text-amber-600 flex-shrink-0 mt-1"
            size={24}
          />
          <div>
            <h2 className="font-bold text-amber-900 text-lg mb-2">
              Configuración Requerida
            </h2>
            <p className="text-amber-800 mb-4">
              La tabla `clientes` no existe en Supabase. Necesitas crear la
              estructura de la base de datos.
            </p>
          </div>
        </div>
      </div>

      <div className="card card-padding space-y-6">
        <div>
          <h3 className="font-bold text-[#1a1a1a] mb-4 text-lg">
            📋 Paso 1: Copia el SQL
          </h3>
          <div className="relative bg-[#f5f5f5] rounded-lg border border-[#e0e0e0] p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-[#333] whitespace-pre-wrap break-words">
              {SQL}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-2 px-3 py-2 bg-[#4aa87a] text-white rounded text-xs font-medium hover:bg-[#3d9068] transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={14} />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        <div className="border-t border-[#e0e0e0] pt-6">
          <h3 className="font-bold text-[#1a1a1a] mb-4 text-lg">
            🔗 Paso 2: Ejecuta en Supabase
          </h3>
          <ol className="space-y-3 text-[#6b7280]">
            <li className="flex gap-3">
              <span className="font-bold text-[#4aa87a] flex-shrink-0">1.</span>
              <span>
                Ve a{" "}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4aa87a] hover:underline"
                >
                  supabase.com/dashboard
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#4aa87a] flex-shrink-0">2.</span>
              <span>
                Selecciona tu proyecto:{" "}
                <code className="bg-[#f5f5f5] px-2 py-1 rounded text-xs">
                  zvehtloitnuglyjtxwye
                </code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#4aa87a] flex-shrink-0">3.</span>
              <span>
                Ve a <strong>SQL Editor</strong> en el sidebar izquierdo
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#4aa87a] flex-shrink-0">4.</span>
              <span>
                Haz clic en <strong>"+ New Query"</strong>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#4aa87a] flex-shrink-0">5.</span>
              <span>
                Pega el SQL arriba y haz clic en <strong>"Run"</strong> (Ctrl +
                Enter)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#4aa87a] flex-shrink-0">6.</span>
              <span>Espera a que se ejecute (sin errores)</span>
            </li>
          </ol>
        </div>

        <div className="border-t border-[#e0e0e0] pt-6">
          <h3 className="font-bold text-[#1a1a1a] mb-4 text-lg">
            ✅ Paso 3: Verifica la conexión
          </h3>
          <p className="text-[#6b7280] mb-4">
            Una vez ejecutado el SQL, recarga esta página:
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Recargar Página
          </button>
        </div>

        <div className="bg-[#e8f5ee] border border-[#4aa87a] rounded-lg p-4 mt-6">
          <p className="text-sm text-[#2d7c54]">
            💡 <strong>Tip:</strong> El SQL creará la tabla con políticas de
            seguridad (RLS) habilitadas para desarrollo.
          </p>
        </div>
      </div>
    </div>
  );
}
