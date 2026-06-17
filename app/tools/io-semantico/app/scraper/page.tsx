"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader, Users } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import UrlScraper from "@/components/UrlScraper";

interface Cliente {
  id: string;
  nombre: string;
}

export default function ScraperPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("io_sem_clientes")
        .select("id, nombre");

      if (error) throw error;
      setClientes(data || []);
      if (data && data.length > 0) {
        setSelectedClienteId(data[0].id);
      }
    } catch (err) {
      console.error("Error loading clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-[#c8e6d4] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1a1a1a]">
              Scraper de URLs
            </h1>
            <p className="text-[#6b7280] mt-1">
              Detección automática de tipología con análisis heurístico
            </p>
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
        <div className="max-w-4xl mx-auto">
          {!selectedClienteId ? (
            <div className="card card-padding text-center py-16">
              <AlertCircle className="mx-auto mb-4 text-[#c8e6d4]" size={48} />
              <p className="text-[#6b7280]">
                Selecciona un cliente para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Info Box */}
              <div className="card card-padding bg-gradient-to-r from-[#f0fdf7] to-[#f9f9f9] border border-[#c8e6d4]">
                <h3 className="font-bold text-[#1a1a1a] mb-3">
                  🤖 Cómo Funciona
                </h3>
                <ul className="space-y-2 text-sm text-[#6b7280]">
                  <li className="flex gap-2">
                    <span className="text-[#4aa87a] font-bold">1.</span>
                    <span>Ingresa la URL que deseas analizar</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4aa87a] font-bold">2.</span>
                    <span>El sistema descarga el HTML automáticamente</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4aa87a] font-bold">3.</span>
                    <span>
                      Aplica heurística avanzada para detectar tipología
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4aa87a] font-bold">4.</span>
                    <span>
                      Extrae metadatos (título, descripción, headings, etc.)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#4aa87a] font-bold">5.</span>
                    <span>Guarda automáticamente en la base de datos</span>
                  </li>
                </ul>
              </div>

              {/* Scraper Component */}
              <UrlScraper clienteId={selectedClienteId} />

              {/* Tipologías Soportadas */}
              <div className="card card-padding">
                <h3 className="font-bold text-[#1a1a1a] mb-4">
                  📋 Tipologías Detectadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { tipo: "home", desc: "Página de Inicio", nivel: 1 },
                    {
                      tipo: "categoria",
                      desc: "Categoría / Colección",
                      nivel: 2,
                    },
                    { tipo: "producto", desc: "Producto / Detalle", nivel: 3 },
                    { tipo: "blog", desc: "Artículo / Blog", nivel: 3 },
                    { tipo: "landing", desc: "Landing Page", nivel: 2 },
                    { tipo: "listado", desc: "Listado", nivel: 2 },
                    { tipo: "perfil", desc: "Perfil / Usuario", nivel: 3 },
                    { tipo: "estatico", desc: "Página Estática", nivel: 2 },
                  ].map(({ tipo, desc, nivel }) => (
                    <div
                      key={tipo}
                      className="p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]"
                    >
                      <p className="text-sm font-medium text-[#1a1a1a]">
                        {desc}
                      </p>
                      <p className="text-xs text-[#6b7280]">
                        Nivel {nivel} • {tipo}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reglas Heurísticas */}
              <div className="card card-padding">
                <h3 className="font-bold text-[#1a1a1a] mb-4">
                  ⚙️ Reglas Heurísticas
                </h3>
                <div className="space-y-2 text-sm text-[#6b7280]">
                  <p>
                    <strong className="text-[#1a1a1a]">Estructura URL:</strong>{" "}
                    Análisis de segmentos de path para identificar patrones
                    típicos
                  </p>
                  <p>
                    <strong className="text-[#1a1a1a]">Elementos HTML:</strong>{" "}
                    Detecta botones de compra, formularios, grillas, paginación,
                    etc.
                  </p>
                  <p>
                    <strong className="text-[#1a1a1a]">Schema.org:</strong>{" "}
                    Valida metadatos estructurados (producto, artículo, etc.)
                  </p>
                  <p>
                    <strong className="text-[#1a1a1a]">
                      Patrones Comunes:
                    </strong>{" "}
                    Reconoce palabras clave como "blog", "category", "shop",
                    etc.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
