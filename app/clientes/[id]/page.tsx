"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Loader } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import ClienteKeywordsIngest from "@/components/ClienteKeywordsIngest";
import ClienteUrlsIndividual from "@/components/ClienteUrlsIndividual";
import ClienteUrlsDesdeArchivo from "@/components/ClienteUrlsDesdeArchivo";

interface Cliente {
  id: string;
  nombre: string;
  creado_en?: string;
  actualizado_en?: string;
}

type TabType = "keywords" | "urls" | "optimizaciones";

export default function ClienteFichaPage() {
  const params = useParams();
  const router = useRouter();
  const clienteId = params.id as string;

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("keywords");

  useEffect(() => {
    const loadCliente = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("io_sem_clientes")
          .select("id, nombre, creado_en, actualizado_en")
          .eq("id", clienteId)
          .single();

        if (err) {
          throw new Error(err.message);
        }
        setCliente(data);
      } catch (err) {
        console.error("Error loading cliente:", err);
        setError(err instanceof Error ? err.message : "Error loading cliente");
      } finally {
        setLoading(false);
      }
    };

    if (clienteId) {
      loadCliente();
    }
  }, [clienteId]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <Loader className="animate-spin text-[#4aa87a]" size={20} />
          <p className="text-[#6b7280]">Cargando cliente...</p>
        </div>
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <div className="p-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#4aa87a] hover:text-[#3d9068] mb-6"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        <div className="card card-padding bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <p className="font-semibold text-red-900">
              Error al cargar cliente
            </p>
            <p className="text-sm text-red-700">
              {error || "Cliente no encontrado"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#4aa87a] hover:text-[#3d9068] mb-6"
      >
        <ArrowLeft size={18} />
        Volver
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">
            {cliente.nombre}
          </h1>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card card-padding border border-[#c8e6d4]">
          <p className="text-sm text-[#6b7280] mb-2">Creado</p>
          <p className="text-lg font-semibold text-[#1a1a1a]">
            {cliente.creado_en
              ? new Date(cliente.creado_en).toLocaleDateString("es-ES")
              : "N/A"}
          </p>
        </div>
        <div className="card card-padding border border-[#c8e6d4]">
          <p className="text-sm text-[#6b7280] mb-2">Actualizado</p>
          <p className="text-lg font-semibold text-[#1a1a1a]">
            {cliente.actualizado_en
              ? new Date(cliente.actualizado_en).toLocaleDateString("es-ES")
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-[#e0e0e0]">
        <button
          onClick={() => setActiveTab("keywords")}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "keywords"
              ? "text-[#4aa87a] border-b-2 border-[#4aa87a]"
              : "text-[#6b7280] hover:text-[#1a1a1a]"
          }`}
        >
          📌 Palabras Clave
        </button>
        <button
          onClick={() => setActiveTab("urls")}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "urls"
              ? "text-[#4aa87a] border-b-2 border-[#4aa87a]"
              : "text-[#6b7280] hover:text-[#1a1a1a]"
          }`}
        >
          🌐 URLs Individual
        </button>
        <button
          onClick={() => setActiveTab("optimizaciones")}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "optimizaciones"
              ? "text-[#4aa87a] border-b-2 border-[#4aa87a]"
              : "text-[#6b7280] hover:text-[#1a1a1a]"
          }`}
        >
          📤 Cargar desde Archivo
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "keywords" && (
        <ClienteKeywordsIngest clienteId={clienteId} />
      )}
      {activeTab === "urls" && <ClienteUrlsIndividual clienteId={clienteId} />}
      {activeTab === "optimizaciones" && (
        <ClienteUrlsDesdeArchivo clienteId={clienteId} />
      )}
    </div>
  );
}
