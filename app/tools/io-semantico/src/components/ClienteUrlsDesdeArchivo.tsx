"use client";

import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface ClienteUrlsDesdeArchivoProps {
  clienteId: string;
}

export default function ClienteUrlsDesdeArchivo({
  clienteId,
}: ClienteUrlsDesdeArchivoProps) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

      // Validar columnas obligatorias
      const requiredColumns = [
        "url",
        "meta_title_actual",
        "meta_description_actual",
        "h1_actual",
      ];
      const missingColumns = requiredColumns.filter(
        (col) => !headers.includes(col),
      );

      if (missingColumns.length > 0) {
        setMessage({
          type: "error",
          text: `Columnas requeridas faltantes: ${missingColumns.join(", ")}`,
        });
        return;
      }

      // Mapear índices de columnas
      const getIndex = (name: string) => headers.indexOf(name);
      const indices = {
        url: getIndex("url"),
        tipologia: getIndex("tipologia"),
        status_code: getIndex("status_code"),
        meta_title_actual: getIndex("meta_title_actual"),
        meta_description_actual: getIndex("meta_description_actual"),
        h1_actual: getIndex("h1_actual"),
        h2_actual: getIndex("h2_actual"),
      };

      // Parsear datos
      const uploadedUrls = lines.slice(1).map((line) => {
        const values = line
          .split(",")
          .map((v) => v.trim().replace(/^"|"$/g, ""));
        const row: any = {
          cliente_id: clienteId,
        };

        if (indices.url !== -1 && values[indices.url])
          row.url = values[indices.url];
        if (indices.tipologia !== -1 && values[indices.tipologia])
          row.tipologia = values[indices.tipologia];
        if (indices.status_code !== -1 && values[indices.status_code])
          row.status_code = parseInt(values[indices.status_code]) || null;
        if (
          indices.meta_title_actual !== -1 &&
          values[indices.meta_title_actual]
        )
          row.meta_title_actual = values[indices.meta_title_actual];
        if (
          indices.meta_description_actual !== -1 &&
          values[indices.meta_description_actual]
        )
          row.meta_description_actual = values[indices.meta_description_actual];
        if (indices.h1_actual !== -1 && values[indices.h1_actual])
          row.h1_actual = values[indices.h1_actual];
        if (indices.h2_actual !== -1 && values[indices.h2_actual]) {
          row.h2_actual = values[indices.h2_actual]
            .split("|")
            .map((h) => h.trim());
        }

        return row;
      });

      if (uploadedUrls.length === 0) {
        setMessage({
          type: "error",
          text: "No se encontraron URLs en el archivo",
        });
        return;
      }

      // Limitar a 5 URLs
      const urlsToInsert = uploadedUrls.slice(0, 5);

      console.log("uploadedUrls:", urlsToInsert);

      const { error } = await supabase
        .from("io_sem_urls_rastreadas")
        .insert(urlsToInsert);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(`Error en BD: ${error.message}`);
      }

      setMessage({
        type: "success",
        text: `${urlsToInsert.length} URLs importadas correctamente${uploadedUrls.length > 5 ? ` (máximo 5)` : ""}`,
      });
      e.target.value = "";
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
        <h4 className="font-bold text-[#1a1a1a] mb-2">
          Cargar URLs desde Archivo
        </h4>
        <p className="text-sm text-[#6b7280] mb-3">
          Carga un archivo CSV con las columnas de datos de URLs. Máximo 5 URLs
          por cliente.
        </p>
        <p className="text-xs text-[#6b7280] bg-white px-3 py-2 rounded font-mono mb-2">
          <strong>Columnas requeridas:</strong> url, meta_title_actual,
          meta_description_actual, h1_actual
          <br />
          <strong>Columnas opcionales:</strong> tipologia, status_code,
          h2_actual (separados por |)
        </p>
      </div>

      {/* Carga de archivo */}
      <div className="card card-padding">
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
    </div>
  );
}
