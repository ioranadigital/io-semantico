"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface URLData {
  url_actual: string;
  tipologia?: string;
  tipo_contenido?: string;
  codigo_respuesta?: string;
  respuesta?: string;
  indexabilidad?: string;
  meta_title_actual?: string;
  meta_description_actual?: string;
  h1_1_actual?: string;
  h1_2_actual?: string;
  h2_actual?: string;
  h2_2_actual?: string;
  paginacion_rel_next?: string;
  paginacion_rel_prev?: string;
}

interface ClienteUrlsIndividualProps {
  clienteId: string;
}

export default function ClienteUrlsIndividual({
  clienteId,
}: ClienteUrlsIndividualProps) {
  const [urls, setUrls] = useState<URLData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState<URLData>({
    url_actual: "",
  });

  useEffect(() => {
    loadUrls();
  }, [clienteId]);

  const loadUrls = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("io_sem_urls_rastreadas")
        .select("*")
        .eq("cliente_id", clienteId)
        .limit(5);

      if (!error) {
        setUrls(data || []);
      }
    } catch (err) {
      console.error("Error loading URLs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const addUrl = async () => {
    // Validar campos obligatorios
    if (!formData.url_actual?.trim()) {
      setMessage({ type: "error", text: "URL Actual es requerida" });
      return;
    }
    if (!formData.meta_title_actual?.trim()) {
      setMessage({ type: "error", text: "Meta Title Actual es requerido" });
      return;
    }
    if (!formData.meta_description_actual?.trim()) {
      setMessage({
        type: "error",
        text: "Meta Description Actual es requerido",
      });
      return;
    }
    if (!formData.h1_1_actual?.trim()) {
      setMessage({ type: "error", text: "H1-1 Actual es requerido" });
      return;
    }
    if (!formData.h1_2_actual?.trim()) {
      setMessage({ type: "error", text: "H1-2 Actual es requerido" });
      return;
    }

    if (urls.length >= 5) {
      setMessage({ type: "error", text: "Máximo 5 URLs por cliente" });
      return;
    }

    try {
      const { error } = await supabase.from("io_sem_urls_rastreadas").insert([
        {
          cliente_id: clienteId,
          ...formData,
        },
      ]);

      if (error) throw error;

      setUrls([...urls, formData]);
      setFormData({ url_actual: "" });
      setMessage({ type: "success", text: "URL agregada correctamente" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error adding URL:", err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Error agregando URL",
      });
    }
  };

  const deleteUrl = async (url: string) => {
    try {
      const { error } = await supabase
        .from("io_sem_urls_rastreadas")
        .delete()
        .eq("cliente_id", clienteId)
        .eq("url_actual", url);

      if (error) throw error;

      setUrls(urls.filter((u) => u.url_actual !== url));
      setMessage({ type: "success", text: "URL eliminada" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting URL:", err);
      setMessage({ type: "error", text: "Error eliminando URL" });
    }
  };

  if (loading) {
    return (
      <div className="card card-padding text-center">
        <p className="text-[#6b7280]">Cargando URLs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Instrucciones */}
      <div className="card card-padding bg-gradient-to-r from-[#f0fdf7] to-[#f9f9f9] border border-[#c8e6d4]">
        <h4 className="font-bold text-[#1a1a1a] mb-2">
          Agregar URLs Individuales
        </h4>
        <p className="text-sm text-[#6b7280]">
          Completa el formulario con los datos de la URL. Máximo 5 URLs por
          cliente.
        </p>
      </div>

      {/* Formulario */}
      <div className="card card-padding space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* URL Actual (requerido) */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              URL Actual <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              name="url_actual"
              placeholder="https://ejemplo.com/pagina"
              value={formData.url_actual}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Tipología */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Tipología
            </label>
            <select
              name="tipologia"
              value={formData.tipologia || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tipologia: e.target.value || undefined,
                }))
              }
              className="input-primary"
            >
              <option value="">Seleccionar...</option>
              <option value="Producto">Producto</option>
              <option value="Blog">Blog</option>
              <option value="Categoría">Categoría</option>
              <option value="Landing">Landing</option>
              <option value="Estático">Estático</option>
              <option value="Listado">Listado</option>
              <option value="Perfil">Perfil</option>
            </select>
          </div>

          {/* Tipo de Contenido */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Tipo de Contenido
            </label>
            <input
              type="text"
              name="tipo_contenido"
              placeholder="HTML, PDF, etc."
              value={formData.tipo_contenido || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Código de Respuesta */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Código de Respuesta
            </label>
            <input
              type="text"
              name="codigo_respuesta"
              placeholder="200, 301, 404, etc."
              value={formData.codigo_respuesta || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Respuesta */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Respuesta
            </label>
            <input
              type="text"
              name="respuesta"
              placeholder="OK, Error, etc."
              value={formData.respuesta || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Indexabilidad */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Indexabilidad
            </label>
            <input
              type="text"
              name="indexabilidad"
              placeholder="Indexable, No indexable"
              value={formData.indexabilidad || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Meta Title Actual */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Meta Title Actual <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="meta_title_actual"
              placeholder="Título de la página"
              value={formData.meta_title_actual || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Meta Description Actual */}
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Meta Description Actual <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="meta_description_actual"
              placeholder="Descripción de la página"
              value={formData.meta_description_actual || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* H1-1 Actual */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              H1-1 Actual <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="h1_1_actual"
              placeholder="Primer H1"
              value={formData.h1_1_actual || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* H1-2 Actual */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              H1-2 Actual <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="h1_2_actual"
              placeholder="Segundo H1"
              value={formData.h1_2_actual || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* H2 Actual */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              H2 Actual
            </label>
            <input
              type="text"
              name="h2_actual"
              placeholder="Primer H2"
              value={formData.h2_actual || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* H2-2 Actual */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              H2-2 Actual
            </label>
            <input
              type="text"
              name="h2_2_actual"
              placeholder="Segundo H2"
              value={formData.h2_2_actual || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Análisis Paginación rel=next */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Análisis Paginación rel=next
            </label>
            <input
              type="text"
              name="paginacion_rel_next"
              placeholder="URL siguiente"
              value={formData.paginacion_rel_next || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>

          {/* Análisis Paginación rel=prev */}
          <div>
            <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
              Análisis Paginación rel=prev
            </label>
            <input
              type="text"
              name="paginacion_rel_prev"
              placeholder="URL anterior"
              value={formData.paginacion_rel_prev || ""}
              onChange={handleInputChange}
              className="input-primary"
            />
          </div>
        </div>

        {/* Botón */}
        <div className="flex gap-2 pt-4 border-t border-[#e0e0e0]">
          <button
            onClick={addUrl}
            disabled={urls.length >= 5}
            className="btn-primary flex items-center gap-2 flex-shrink-0"
          >
            <Plus size={16} />
            Agregar URL
          </button>
          {urls.length >= 5 && (
            <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded flex items-center">
              ⚠️ Máximo 5 URLs
            </p>
          )}
        </div>
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
      {urls.length > 0 ? (
        <div className="card card-padding">
          <h3 className="font-bold text-[#1a1a1a] mb-4">
            URLs Cargadas ({urls.length}/5)
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {urls.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#4aa87a] truncate">
                      {item.url_actual}
                    </p>
                    {item.tipologia && (
                      <p className="text-xs text-[#6b7280] mt-1">
                        <span className="bg-[#f0fdf7] px-2 py-1 rounded">
                          {item.tipologia}
                        </span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteUrl(item.url_actual)}
                    className="text-red-600 hover:text-red-700 flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-xs text-[#6b7280] space-y-1">
                  {item.codigo_respuesta && (
                    <p>
                      <strong>Código:</strong> {item.codigo_respuesta}
                    </p>
                  )}
                  {item.meta_title_actual && (
                    <p>
                      <strong>Title:</strong> {item.meta_title_actual}
                    </p>
                  )}
                  {item.h1_1_actual && (
                    <p>
                      <strong>H1:</strong> {item.h1_1_actual}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card card-padding text-center py-8">
          <p className="text-[#6b7280]">Sin URLs agregadas aún</p>
        </div>
      )}
    </div>
  );
}
