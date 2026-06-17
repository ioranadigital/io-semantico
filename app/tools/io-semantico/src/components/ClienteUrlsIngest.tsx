"use client";

import { useState } from "react";
import {
  Upload,
  Plus,
  AlertCircle,
  Trash2,
  Copy,
  Download,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface ClienteUrlsIngestProps {
  clienteId: string;
}

const TEMPLATE_COLUMNS = [
  "url",
  "h1_actual",
  "meta_description_actual",
  "keywords_objetivo",
];
const TEMPLATE_EXAMPLE = `url,h1_actual,meta_description_actual,keywords_objetivo
https://example.com/pagina-1,"Título principal actual","Meta description actual","palabra clave 1, palabra clave 2"
https://example.com/pagina-2,"Otro título","Otra meta description","palabra clave 3"`;

export default function ClienteUrlsIngest({
  clienteId,
}: ClienteUrlsIngestProps) {
  const [urls, setUrls] = useState<
    Array<{
      url: string;
      h1_actual?: string;
      meta_description_actual?: string;
      keywords_objetivo?: string;
    }>
  >([]);
  const [newUrl, setNewUrl] = useState("");
  const [newH1, setNewH1] = useState("");
  const [newMeta, setNewMeta] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
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
      `urls-template-${new Date().toISOString().split("T")[0]}.csv`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const addUrl = async () => {
    if (!newUrl.trim()) {
      setMessage({ type: "error", text: "La URL es requerida" });
      return;
    }

    setUploading(true);
    try {
      const { error: err } = await supabase
        .from("io_sem_urls_rastreadas")
        .insert([
          {
            cliente_id: clienteId,
            url: newUrl.trim(),
            h1_actual: newH1 || null,
            meta_description_actual: newMeta || null,
            keywords_objetivo: newKeywords || null,
          },
        ]);

      if (err) throw err;

      setUrls([
        ...urls,
        {
          url: newUrl.trim(),
          h1_actual: newH1 || undefined,
          meta_description_actual: newMeta || undefined,
          keywords_objetivo: newKeywords || undefined,
        },
      ]);

      setNewUrl("");
      setNewH1("");
      setNewMeta("");
      setNewKeywords("");
      setMessage({ type: "success", text: "URL agregada correctamente" });
    } catch (err) {
      console.error("Error adding URL:", err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Error agregando URL",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeUrl = async (url: string) => {
    try {
      const { error: err } = await supabase
        .from("io_sem_urls_rastreadas")
        .delete()
        .eq("cliente_id", clienteId)
        .eq("url", url);

      if (err) throw err;

      setUrls(urls.filter((u) => u.url !== url));
      setMessage({ type: "success", text: "URL eliminada" });
    } catch (err) {
      console.error("Error removing URL:", err);
      setMessage({ type: "error", text: "Error eliminando URL" });
    }
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
      const urlIndex = headers.indexOf("url");

      if (urlIndex === -1) {
        setMessage({ type: "error", text: 'La columna "url" es requerida' });
        return;
      }

      const h1Index = headers.indexOf("h1_actual");
      const metaIndex = headers.indexOf("meta_description_actual");
      const keywordsIndex = headers.indexOf("keywords_objetivo");

      const uploadedUrls = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim());
        return {
          url: values[urlIndex],
          h1_actual:
            h1Index !== -1 && values[h1Index] ? values[h1Index] : undefined,
          meta_description_actual:
            metaIndex !== -1 && values[metaIndex]
              ? values[metaIndex]
              : undefined,
          keywords_objetivo:
            keywordsIndex !== -1 && values[keywordsIndex]
              ? values[keywordsIndex]
              : undefined,
        };
      });

      // Insert to Supabase
      const { error: err } = await supabase
        .from("io_sem_urls_rastreadas")
        .insert(
          uploadedUrls.map((u) => ({
            cliente_id: clienteId,
            ...u,
          })),
        );

      if (err) throw err;

      setUrls([...urls, ...uploadedUrls]);
      setMessage({
        type: "success",
        text: `${uploadedUrls.length} URLs importadas correctamente`,
      });
      e.target.value = "";
      setShowTemplate(false);
    } catch (err) {
      console.error("Error uploading URLs:", err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Error importando URLs",
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
              Cargar URLs para Auditar
            </h4>
            <p className="text-sm text-[#6b7280] mb-3">
              Carga URLs con información sobre H1, meta description y keywords
              objetivo para análisis automático.
            </p>
            <p className="text-xs text-[#6b7280] font-mono bg-white px-2 py-1 rounded inline-block">
              Columnas: url, h1_actual, meta_description_actual,
              keywords_objetivo
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

      {/* Entrada manual */}
      <div className="card card-padding space-y-4">
        <h3 className="font-bold text-[#1a1a1a]">Agregar URL Individual</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              URL <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              placeholder="https://ejemplo.com/pagina"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="input-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
                H1 Actual
              </label>
              <input
                type="text"
                placeholder="Ej: Título principal de la página"
                value={newH1}
                onChange={(e) => setNewH1(e.target.value)}
                className="input-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
                Meta Description Actual
              </label>
              <input
                type="text"
                placeholder="Ej: Descripción corta de la página..."
                value={newMeta}
                onChange={(e) => setNewMeta(e.target.value)}
                className="input-primary"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Keywords Objetivo
            </label>
            <input
              type="text"
              placeholder="Ej: palabra clave 1, palabra clave 2"
              value={newKeywords}
              onChange={(e) => setNewKeywords(e.target.value)}
              className="input-primary"
            />
          </div>

          <button
            onClick={addUrl}
            disabled={uploading || !newUrl.trim()}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            {uploading ? "Agregando..." : "Agregar URL"}
          </button>
        </div>
      </div>

      {/* Cargar archivo */}
      <div className="card card-padding">
        <h3 className="font-bold text-[#1a1a1a] mb-4">
          Cargar URLs desde Archivo CSV
        </h3>
        <label className="btn-primary flex items-center gap-2 cursor-pointer inline-block">
          <Upload size={16} />
          {uploading ? "Cargando..." : "Seleccionar archivo CSV"}
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

      {/* Lista de URLs */}
      {urls.length > 0 && (
        <div className="card card-padding">
          <h3 className="font-bold text-[#1a1a1a] mb-4">
            URLs Cargadas ({urls.length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {urls.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#4aa87a] font-medium truncate">
                      {item.url}
                    </p>
                    {item.h1_actual && (
                      <p className="text-xs text-[#6b7280] mt-1">
                        H1: {item.h1_actual}
                      </p>
                    )}
                    {item.keywords_objetivo && (
                      <p className="text-xs text-[#6b7280]">
                        KW: {item.keywords_objetivo}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeUrl(item.url)}
                    className="text-red-600 hover:text-red-700 flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
