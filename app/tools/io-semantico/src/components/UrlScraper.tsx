"use client";

import { useState } from "react";
import {
  Download,
  Loader,
  CheckCircle2,
  AlertCircle,
  Copy,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface ScrapedResult {
  status: string;
  scrape_result: {
    url: string;
    tipologia: string;
    nivel: number;
    tipologia_confidence: number;
    tipologia_rules: string[];
    meta_title?: string;
    meta_description?: string;
    h1_1?: string;
    language?: string;
  };
  message: string;
}

interface UrlScraperProps {
  clienteId: string;
}

export default function UrlScraper({ clienteId }: UrlScraperProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScrapedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url.trim()) {
      setError("Ingresa una URL válida");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Normalizar URL: agregar https:// si falta protocolo
      let normalizedUrl = url.trim();
      if (
        !normalizedUrl.startsWith("http://") &&
        !normalizedUrl.startsWith("https://")
      ) {
        normalizedUrl = "https://" + normalizedUrl;
      }

      // Enviar URL al servidor para que descargue el HTML
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: normalizedUrl,
          cliente_id: clienteId,
          guardar_en_bd: true,
          fetch_html: true, // Indicar que el servidor debe descargar el HTML
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en scraping");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const getTipologiaColor = (tipologia: string): string => {
    const colors: Record<string, string> = {
      home: "bg-blue-50 border-blue-200",
      categoria: "bg-purple-50 border-purple-200",
      producto: "bg-green-50 border-green-200",
      blog: "bg-orange-50 border-orange-200",
      landing: "bg-pink-50 border-pink-200",
      estatico: "bg-gray-50 border-gray-200",
      listado: "bg-yellow-50 border-yellow-200",
      perfil: "bg-indigo-50 border-indigo-200",
    };
    return colors[tipologia] || "bg-gray-50 border-gray-200";
  };

  const getTipologiaLabel = (tipologia: string): string => {
    const labels: Record<string, string> = {
      home: "Página de Inicio",
      categoria: "Categoría",
      producto: "Producto / Detalle",
      blog: "Artículo / Blog",
      landing: "Landing Page",
      estatico: "Página Estática",
      listado: "Listado",
      perfil: "Perfil / Usuario",
    };
    return labels[tipologia] || "Desconocido";
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card card-padding">
        <h3 className="font-bold text-[#1a1a1a] mb-4">Scraper de URLs</h3>
        <p className="text-sm text-[#6b7280] mb-4">
          Ingresa una URL y detectaremos automáticamente su tipología
        </p>

        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://ejemplo.com/categoria/producto"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleScrape()}
            className="input-primary flex-1"
            disabled={loading}
          />
          <button
            onClick={handleScrape}
            disabled={loading || !url.trim()}
            className="btn-primary flex items-center gap-2 flex-shrink-0"
          >
            {loading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              <Download size={16} />
            )}
            {loading ? "Escaneando..." : "Scrapear"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="card card-padding bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="font-semibold text-red-700">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Tipología detectada */}
          <div
            className={`card card-padding border-2 ${getTipologiaColor(result.scrape_result.tipologia)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={24} />
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-widest">
                    Tipología Detectada
                  </p>
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">
                    {getTipologiaLabel(result.scrape_result.tipologia)}
                  </h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#4aa87a]">
                  Nivel {result.scrape_result.nivel}
                </p>
                <p className="text-xs text-[#6b7280]">
                  {(result.scrape_result.tipologia_confidence * 100).toFixed(0)}
                  % confianza
                </p>
              </div>
            </div>

            {/* Règlas aplicadas */}
            <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-3">
              <p className="text-xs font-semibold text-[#6b7280] mb-2">
                REGLAS APLICADAS
              </p>
              <div className="flex flex-wrap gap-2">
                {result.scrape_result.tipologia_rules.map((rule, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white text-xs font-mono text-[#4aa87a] rounded border border-[#c8e6d4]"
                  >
                    {rule}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Metadatos extraídos */}
          <div className="card card-padding space-y-3">
            <h4 className="font-bold text-[#1a1a1a] mb-3">
              Metadatos Extraídos
            </h4>

            {result.scrape_result.meta_title && (
              <div className="p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]">
                <p className="text-xs text-[#6b7280] mb-1">Meta Title</p>
                <p className="text-sm text-[#1a1a1a] font-medium break-all">
                  {result.scrape_result.meta_title}
                </p>
              </div>
            )}

            {result.scrape_result.meta_description && (
              <div className="p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]">
                <p className="text-xs text-[#6b7280] mb-1">Meta Description</p>
                <p className="text-sm text-[#1a1a1a] break-all">
                  {result.scrape_result.meta_description}
                </p>
              </div>
            )}

            {result.scrape_result.h1_1 && (
              <div className="p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]">
                <p className="text-xs text-[#6b7280] mb-1">H1 Principal</p>
                <p className="text-sm text-[#1a1a1a] font-medium">
                  {result.scrape_result.h1_1}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2 bg-[#f9f9f9] rounded text-xs">
                <p className="text-[#6b7280] mb-1">Lenguaje</p>
                <p className="font-mono text-[#4aa87a]">
                  {result.scrape_result.language}
                </p>
              </div>
              <div className="p-2 bg-[#f9f9f9] rounded text-xs">
                <p className="text-[#6b7280] mb-1">URL Guardada</p>
                <p className="font-mono text-green-600">✓ En BD</p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2 pt-4 border-t border-[#e0e0e0]">
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.scrape_result.url);
              }}
              className="flex-1 px-4 py-2 border border-[#c8e6d4] text-[#4aa87a] font-medium rounded-lg hover:bg-[#f0fdf7] flex items-center justify-center gap-2"
            >
              <Copy size={16} />
              Copiar URL
            </button>
            <button
              onClick={() => {
                setUrl("");
                setResult(null);
              }}
              className="flex-1 px-4 py-2 bg-[#4aa87a] text-white font-medium rounded-lg hover:bg-[#3d9068]"
            >
              Nueva URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
