"use client";

import { useState } from "react";
import {
  Upload,
  Download,
  AlertCircle,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface ClienteKeywordsIngestProps {
  clienteId: string;
}

const TEMPLATE_EXAMPLE = `keyword,subclase,volumen,url_asignada
"Palabra clave principal","level1_entity_core",2400,https://misite.com
"Palabra clave secundaria","level2_local",1800,https://misite.com/pagina
"Búsqueda informativa","level3_educational_howto",1200,https://misite.com/blog
"Palabra clave comercial","level4_comparative_vs",890,https://misite.com/productos
"Long-tail específico","level5_longtail_transactional",450,https://misite.com/oferta
"Palabra prohibida","level6_banned_words",0,`;

export default function ClienteKeywordsIngest({
  clienteId,
}: ClienteKeywordsIngestProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTemplate, setShowTemplate] = useState(true);

  const copyTemplate = () => {
    navigator.clipboard.writeText(TEMPLATE_EXAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTemplate = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${encodeURIComponent(TEMPLATE_EXAMPLE)}`,
    );
    element.setAttribute(
      "download",
      `plantilla-palabras-clave-${new Date().toISOString().split("T")[0]}.csv`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      if (lines.length === 0) {
        setMessage({ type: "error", text: "El archivo está vacío" });
        return;
      }

      // Parse CSV
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const keywordIndex = headers.indexOf("keyword");
      const subclaseIndex = headers.indexOf("subclase");
      const volumenIndex = headers.indexOf("volumen");
      const urlIndex = headers.indexOf("url_asignada");

      if (keywordIndex === -1) {
        setMessage({
          type: "error",
          text: 'La columna "keyword" es requerida',
        });
        return;
      }

      console.log("clienteId:", clienteId);

      const uploadedKeywords = lines.slice(1).map((line) => {
        const values = line
          .split(",")
          .map((v) => v.trim().replace(/^"|"$/g, ""));
        const row: any = {
          cliente_id: clienteId,
          keyword: values[keywordIndex],
        };

        if (subclaseIndex !== -1 && values[subclaseIndex])
          row.subclase = values[subclaseIndex];
        if (volumenIndex !== -1 && values[volumenIndex])
          row.volumen = parseInt(values[volumenIndex]) || 0;
        if (urlIndex !== -1 && values[urlIndex])
          row.url_asignada = values[urlIndex];

        return row;
      });

      console.log("uploadedKeywords:", uploadedKeywords);

      // Insert to Supabase
      const { error: err } = await supabase
        .from("io_sem_palabras_clave")
        .insert(uploadedKeywords);

      if (err) {
        console.error("Supabase RLS error:", err);
        throw new Error(
          `RLS bloqueó la inserción: ${err.message} - Verifica que el cliente_id sea válido o que tengas permisos`,
        );
      }

      setMessage({
        type: "success",
        text: `${uploadedKeywords.length} palabras clave importadas correctamente`,
      });
      e.target.value = "";
      setShowTemplate(false);
    } catch (err) {
      console.error("Error uploading keywords:", err);
      setMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Error importando palabras clave",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Instrucciones */}
      <div className="card card-padding bg-gradient-to-r from-[#f0fdf7] to-[#f9f9f9] border border-[#c8e6d4]">
        <div className="flex gap-4">
          <div className="text-[#4aa87a] flex-shrink-0 text-2xl">ℹ️</div>
          <div>
            <h4 className="font-bold text-[#1a1a1a] mb-2">
              Importar Palabras Clave
            </h4>
            <p className="text-sm text-[#6b7280] mb-3">
              Carga un CSV con tus palabras clave organizadas por subclase
              semántica.
            </p>
            <p className="text-xs text-[#6b7280] font-mono bg-white px-2 py-1 rounded inline-block">
              Columnas: keyword, subclase, volumen, url_asignada
            </p>
          </div>
        </div>
      </div>

      {/* Template */}
      {showTemplate && (
        <div className="card card-padding bg-blue-50 border border-blue-200 space-y-4">
          <div>
            <h4 className="font-bold text-blue-900 mb-2">
              Plantilla de ejemplo:
            </h4>
            <div className="relative bg-white rounded border border-blue-200 p-3 font-mono text-xs overflow-x-auto">
              <pre className="text-[#333] whitespace-pre-wrap break-words">
                {TEMPLATE_EXAMPLE}
              </pre>
              <button
                onClick={copyTemplate}
                className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={12} />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={downloadTemplate}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Download size={14} />
              Descargar Plantilla
            </button>
            <button
              onClick={() => setShowTemplate(false)}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Cargar archivo */}
      <div className="card card-padding">
        <h3 className="font-bold text-[#1a1a1a] mb-4">
          Cargar Palabras Clave desde CSV
        </h3>
        <label className="btn-primary flex items-center gap-2 cursor-pointer inline-block">
          <Upload size={16} />
          {uploading ? "Importando..." : "Seleccionar archivo CSV"}
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Mensaje */}
      {message && (
        <div
          className={`card card-padding flex items-start gap-3 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <AlertCircle
            className={
              message.type === "success" ? "text-green-600" : "text-red-600"
            }
            size={20}
          />
          <p
            className={
              message.type === "success"
                ? "text-sm text-green-700"
                : "text-sm text-red-700"
            }
          >
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
}
