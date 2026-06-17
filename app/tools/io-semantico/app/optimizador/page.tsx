"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AlertCircle,
  Loader,
  Users,
  Zap,
  Plus,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import KeywordAssignmentDrawer from "@/components/KeywordAssignmentDrawer";

interface Cliente {
  id: string;
  nombre: string;
}

interface URL {
  id: string;
  url: string;
  url_actual?: string; // Alias para compatibilidad
  h1?: string;
  h1_actual?: string; // Alias para compatibilidad
  h1_1_actual?: string; // Alias para compatibilidad
  h1_2?: string;
  h1_2_actual?: string; // Alias para compatibilidad
  h2?: string;
  h2_2?: string;
  h2_actual?: string; // Alias para compatibilidad
  meta_title?: string;
  meta_title_actual?: string; // Alias para compatibilidad
  meta_description?: string;
  meta_description_actual?: string; // Alias para compatibilidad
  tipologia?: string;
  cliente_id?: string;
}

interface KeywordAssignment {
  id: string;
  palabra_clave: string;
  nivel: string;
}

interface URLWithLevel extends URL {
  nivel: number;
}

export default function OptimizerPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string>("");
  const [urls, setUrls] = useState<URLWithLevel[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<URLWithLevel | null>(null);
  const [assignedKeywords, setAssignedKeywords] = useState<KeywordAssignment[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [urlsLoading, setUrlsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadClientes();
  }, []);

  useEffect(() => {
    if (selectedClienteId) {
      loadUrls();
    }
  }, [selectedClienteId]);

  useEffect(() => {
    if (selectedUrl) {
      loadAssignedKeywords();
    }
  }, [selectedUrl]);

  const loadClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("io_sem_clientes")
        .select("id, nombre");

      if (err) throw err;

      setClientes(data || []);
      if (data && data.length > 0) {
        setSelectedClienteId(data[0].id);
      }
    } catch (err) {
      console.error("Error loading clientes:", err);
      setError("Error cargando clientes");
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar: mapear tipología a nivel
  const getTipologyLevel = (tipologia?: string): number => {
    if (!tipologia) return 2;
    if (
      tipologia === "producto" ||
      tipologia === "blog" ||
      tipologia === "perfil"
    )
      return 3;
    if (tipologia === "home") return 1;
    return 2; // categoría, landing, listado, estático
  };

  const loadUrls = async () => {
    setUrlsLoading(true);
    try {
      console.log("[DEBUG] Cargando URLs para cliente:", selectedClienteId);

      const { data, error: err } = await supabase
        .from("io_sem_urls_rastreadas")
        .select(
          "id, url, h1, h1_2, h2, h2_2, meta_title, meta_description, tipologia, cliente_id",
        )
        .eq("cliente_id", selectedClienteId)
        .limit(50);

      console.log("[DEBUG] Error:", err);
      console.log("[DEBUG] Data:", data);
      console.log("[DEBUG] URLs encontradas:", data?.length || 0);

      if (err) throw err;

      // Enriquecer con nivel y ordenar
      const enrichedUrls: URLWithLevel[] = (data || []).map((url) => ({
        ...url,
        nivel: getTipologyLevel(url.tipologia),
      }));

      // Ordenar: primero nivel 2, luego nivel 3
      enrichedUrls.sort((a, b) => {
        if (a.nivel !== b.nivel) return a.nivel - b.nivel;
        return 0;
      });

      setUrls(enrichedUrls);
      if (enrichedUrls.length > 0) {
        setSelectedUrl(enrichedUrls[0]);
      }
    } catch (err) {
      console.error("Error loading URLs:", err);
      setError("Error cargando URLs");
    } finally {
      setUrlsLoading(false);
    }
  };

  const loadAssignedKeywords = async () => {
    if (!selectedUrl) return;

    try {
      const { data, error: err } = await supabase
        .from("io_sem_asignaciones_kw_url")
        .select(
          `
          id,
          io_sem_palabras_clave:keyword_id(palabra_clave, nivel)
        `,
        )
        .eq("url_id", selectedUrl.id)
        .eq("cliente_id", selectedClienteId);

      if (err) throw err;

      const keywords =
        data?.map((item: any) => ({
          id: item.id,
          palabra_clave: item.io_sem_palabras_clave.palabra_clave,
          nivel: item.io_sem_palabras_clave.nivel,
        })) || [];

      setAssignedKeywords(keywords);
    } catch (err) {
      console.error("Error loading keywords:", err);
    }
  };

  // Función: obtener estilos del badge según tipología
  const getBadgeStyles = (tipologia?: string) => {
    switch (tipologia) {
      case "producto":
      case "blog":
      case "perfil":
        return {
          bg:
            tipologia === "producto"
              ? "bg-cyan-500/12"
              : tipologia === "blog"
                ? "bg-violet-500/12"
                : "bg-pink-500/12",
          text:
            tipologia === "producto"
              ? "text-cyan-700"
              : tipologia === "blog"
                ? "text-violet-700"
                : "text-pink-700",
          label:
            tipologia === "producto"
              ? "Lvl 3 - Prod"
              : tipologia === "blog"
                ? "Lvl 3 - Blog"
                : "Lvl 3 - Perf",
        };
      case "categoria":
        return {
          bg: "bg-[#4aa87a]/12",
          text: "text-[#3d9068]",
          label: "Lvl 2 - Cat",
        };
      case "landing":
        return {
          bg: "bg-orange-500/12",
          text: "text-orange-700",
          label: "Lvl 2 - Land",
        };
      case "listado":
        return {
          bg: "bg-yellow-500/12",
          text: "text-yellow-700",
          label: "Lvl 2 - List",
        };
      default:
        return {
          bg: "bg-gray-500/12",
          text: "text-gray-700",
          label: "Lvl 2 - Est",
        };
    }
  };

  // Agrupar URLs por nivel
  const urlsByLevel = useMemo(() => {
    const level2 = urls.filter((u) => u.nivel === 2);
    const level3 = urls.filter((u) => u.nivel === 3);
    return { level2, level3 };
  }, [urls]);

  const selectedCliente = clientes.find((c) => c.id === selectedClienteId);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-[#c8e6d4] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1a1a1a]">Optimizador</h1>
              <p className="text-[#6b7280] mt-1">
                Herramienta de optimización semántica
              </p>
            </div>
          </div>

          {/* Cliente Selector */}
          <div className="bg-gradient-to-r from-[#f0fdf7] to-[#f9f9f9] rounded-lg border border-[#c8e6d4] p-4">
            <div className="flex items-center gap-4">
              <Users className="text-[#4aa87a] flex-shrink-0" size={24} />
              <div className="flex-1">
                <label className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest block mb-2">
                  Seleccionar Cliente
                </label>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin text-[#4aa87a]" size={16} />
                    <p className="text-sm text-[#6b7280]">
                      Cargando clientes...
                    </p>
                  </div>
                ) : clientes.length === 0 ? (
                  <p className="text-sm text-[#6b7280]">
                    No hay clientes disponibles
                  </p>
                ) : (
                  <select
                    value={selectedClienteId}
                    onChange={(e) => setSelectedClienteId(e.target.value)}
                    className="input-primary"
                  >
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {!selectedClienteId ? (
            <div className="card card-padding text-center py-16">
              <AlertCircle className="mx-auto mb-4 text-[#c8e6d4]" size={48} />
              <p className="text-[#6b7280]">
                Selecciona un cliente para comenzar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* URLs List - Organized by Level */}
              <div className="card card-padding flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="font-bold text-[#1a1a1a]">
                    URLs ({urls.length})
                  </h3>
                  <p className="text-xs text-[#6b7280] mt-1">
                    Organizadas por nivel arquitectónico
                  </p>
                </div>

                {urlsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-[#6b7280]">
                    <Loader className="animate-spin mb-2" size={20} />
                    <p className="text-sm">Cargando URLs...</p>
                  </div>
                ) : urls.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="mb-2 text-[#c8e6d4]" size={24} />
                    <p className="text-sm text-[#6b7280]">
                      Sin URLs para este cliente
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 overflow-y-auto flex-1">
                    {/* Nivel 2 - Arquitectura intermedia */}
                    {urlsByLevel.level2.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2 px-2">
                          📂 Nivel 2 - Arquitectura Intermedia
                        </p>
                        <div className="space-y-2">
                          {urlsByLevel.level2.map((url) => {
                            const badgeStyles = getBadgeStyles(url.tipologia);
                            return (
                              <button
                                key={url.id}
                                onClick={() => setSelectedUrl(url)}
                                className={`w-full text-left p-3 rounded-lg border-2 transition-all group ${
                                  selectedUrl?.id === url.id
                                    ? "bg-[#d4ece0] border-[#4aa87a] shadow-sm"
                                    : "bg-white border-[#e0e0e0] hover:border-[#4aa87a] hover:bg-[#fafafa]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono text-[#4aa87a] truncate">
                                      {url.url}
                                    </p>
                                    {url.h1_actual && (
                                      <p className="text-xs text-[#6b7280] mt-1 truncate">
                                        {url.h1_actual}
                                      </p>
                                    )}
                                  </div>
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${badgeStyles.bg} ${badgeStyles.text}`}
                                  >
                                    {badgeStyles.label}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Nivel 3 - Contenido detalle */}
                    {urlsByLevel.level3.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2 px-2">
                          🎯 Nivel 3 - Contenido Detalle
                        </p>
                        <div className="space-y-2">
                          {urlsByLevel.level3.map((url) => {
                            const badgeStyles = getBadgeStyles(url.tipologia);
                            return (
                              <button
                                key={url.id}
                                onClick={() => setSelectedUrl(url)}
                                className={`w-full text-left p-3 rounded-lg border-2 transition-all group ${
                                  selectedUrl?.id === url.id
                                    ? "bg-[#d4ece0] border-[#4aa87a] shadow-sm"
                                    : "bg-white border-[#e0e0e0] hover:border-[#4aa87a] hover:bg-[#fafafa]"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-mono text-[#4aa87a] truncate">
                                      {url.url}
                                    </p>
                                    {url.h1_actual && (
                                      <p className="text-xs text-[#6b7280] mt-1 truncate">
                                        {url.h1_actual}
                                      </p>
                                    )}
                                  </div>
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${badgeStyles.bg} ${badgeStyles.text}`}
                                  >
                                    {badgeStyles.label}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* URL Details & Keywords */}
              <div className="lg:col-span-2">
                {selectedUrl ? (
                  <div className="space-y-6">
                    {/* URL Header Card - Con Badge */}
                    <div className="card card-padding border-2 border-[#c8e6d4] bg-gradient-to-br from-[#f0fdf7] to-white">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1a1a1a] text-lg">
                            URL Seleccionada
                          </h3>
                          <p className="text-xs text-[#6b7280] mt-1">
                            {selectedUrl.nivel === 3
                              ? "🎯 Contenido de Detalle"
                              : "📂 Arquitectura Intermedia"}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                            getBadgeStyles(selectedUrl.tipologia).bg
                          } ${getBadgeStyles(selectedUrl.tipologia).text}`}
                        >
                          {getBadgeStyles(selectedUrl.tipologia).label}
                        </span>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#c8e6d4]">
                        <div>
                          <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2">
                            URL
                          </p>
                          <p className="text-sm font-mono text-[#1a1a1a] break-all bg-white px-3 py-2 rounded-lg border border-[#e0e0e0]">
                            {selectedUrl.url}
                          </p>
                        </div>
                        {selectedUrl.h1 && (
                          <div>
                            <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2">
                              H1 Principal
                            </p>
                            <p className="text-sm text-[#1a1a1a] bg-white px-3 py-2 rounded-lg border border-[#e0e0e0]">
                              {selectedUrl.h1}
                            </p>
                          </div>
                        )}
                        {selectedUrl.meta_description && (
                          <div>
                            <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-widest mb-2">
                              Meta Description
                            </p>
                            <p className="text-sm text-[#1a1a1a] bg-white px-3 py-2 rounded-lg border border-[#e0e0e0]">
                              {selectedUrl.meta_description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Keywords Assignment */}
                    {assignedKeywords.length === 0 ? (
                      <div className="card card-padding bg-gradient-to-br from-[#f0fdf7] to-[#f9f9f9] border border-[#c8e6d4] text-center py-12">
                        <AlertCircle
                          className="mx-auto mb-4 text-[#4aa87a]"
                          size={40}
                        />
                        <h4 className="font-semibold text-[#1a1a1a] mb-2">
                          Sin Keywords Asignadas
                        </h4>
                        <p className="text-sm text-[#6b7280] mb-6">
                          Asigna palabras clave para generar optimizaciones
                        </p>
                        <button
                          onClick={() => setDrawerOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4aa87a] text-white font-medium rounded-lg hover:bg-[#3d9068]"
                        >
                          <Plus size={16} />
                          Asignar Keywords
                        </button>
                      </div>
                    ) : (
                      <div className="card card-padding space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#1a1a1a]">
                            Keywords Asignadas ({assignedKeywords.length}/6)
                          </h4>
                          <button
                            onClick={() => setDrawerOpen(true)}
                            className="text-xs text-[#4aa87a] hover:underline"
                          >
                            Editar
                          </button>
                        </div>
                        <div className="space-y-2">
                          {assignedKeywords.map((kw) => (
                            <div
                              key={kw.id}
                              className="p-2 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]"
                            >
                              <p className="text-sm font-medium text-[#1a1a1a]">
                                {kw.palabra_clave}
                              </p>
                              <p className="text-xs text-[#6b7280]">
                                {kw.nivel}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Generate Button */}
                        <button className="w-full mt-6 px-4 py-3 bg-[#4aa87a] text-white font-medium rounded-lg hover:bg-[#3d9068] flex items-center justify-center gap-2">
                          <Zap size={18} />
                          Generar Optimización
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="card card-padding text-center py-16">
                    <AlertCircle
                      className="mx-auto mb-4 text-[#c8e6d4]"
                      size={48}
                    />
                    <p className="text-[#6b7280]">
                      Selecciona una URL para comenzar
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyword Assignment Drawer */}
      <KeywordAssignmentDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        urlId={selectedUrl?.id || ""}
        clienteId={selectedClienteId}
        onSave={loadAssignedKeywords}
      />
    </div>
  );
}
