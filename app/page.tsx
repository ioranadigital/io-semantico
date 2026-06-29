"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Sparkles, Loader, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface Stats {
  clientes: number;
  keywords: number;
  urls: number;
  optimizaciones: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    clientes: 0,
    keywords: 0,
    urls: 0,
    optimizaciones: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        let clientesCount = 0;
        let keywordsCount = 0;
        let urlsCount = 0;
        let optimizacionesCount = 0;

        // Contar clientes
        try {
          const { count } = await supabase
            .from("io_sem_clientes")
            .select("*", { count: "exact", head: true });
          clientesCount = count || 0;
        } catch (err) {
          console.error("Error counting clientes:", err);
        }

        // Contar palabras clave
        try {
          const { count } = await supabase
            .from("io_sem_palabras_clave")
            .select("*", { count: "exact", head: true });
          keywordsCount = count || 0;
        } catch (err) {
          console.error("Error counting palabras_clave:", err);
        }

        // Contar URLs rastreadas
        try {
          const { count } = await supabase
            .from("io_sem_urls_rastreadas")
            .select("*", { count: "exact", head: true });
          urlsCount = count || 0;
        } catch (err) {
          console.error("Error counting urls_rastreadas:", err);
        }

        // Contar optimizaciones
        try {
          const { count } = await supabase
            .from("io_sem_optimizaciones")
            .select("*", { count: "exact", head: true });
          optimizacionesCount = count || 0;
        } catch (err) {
          console.error("Error counting optimizaciones:", err);
        }

        setStats({
          clientes: clientesCount,
          keywords: keywordsCount,
          urls: urlsCount,
          optimizaciones: optimizacionesCount,
        });
      } catch (err) {
        console.error("Error loading stats:", err);
        setError("Error cargando estadísticas");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Dashboard</h1>
        <p className="text-[#6b7280]">Bienvenido a io-Semántico</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card card-padding bg-red-50 border border-red-200 flex items-start gap-3 mb-8">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Clientes Card */}
        <div className="card card-padding bg-white border border-[#c8e6d4]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6b7280] mb-1">Total de Clientes</p>
              {loading ? (
                <Loader className="animate-spin text-[#4aa87a]" size={24} />
              ) : (
                <p className="text-3xl font-bold text-[#1a1a1a]">
                  {stats.clientes}
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-[#e8f5ee]">
              <Users size={24} className="text-[#4aa87a]" />
            </div>
          </div>
        </div>

        {/* Keywords Card */}
        <div className="card card-padding bg-white border border-[#c8e6d4]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6b7280] mb-1">Palabras Clave</p>
              {loading ? (
                <Loader className="animate-spin text-[#4aa87a]" size={24} />
              ) : (
                <p className="text-3xl font-bold text-[#1a1a1a]">
                  {stats.keywords}
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-[#e8f5ee]">
              <BarChart3 size={24} className="text-[#4aa87a]" />
            </div>
          </div>
        </div>

        {/* URLs Card */}
        <div className="card card-padding bg-white border border-[#c8e6d4]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6b7280] mb-1">URLs Auditadas</p>
              {loading ? (
                <Loader className="animate-spin text-[#4aa87a]" size={24} />
              ) : (
                <p className="text-3xl font-bold text-[#1a1a1a]">
                  {stats.urls}
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-[#e8f5ee]">
              <BarChart3 size={24} className="text-[#4aa87a]" />
            </div>
          </div>
        </div>

        {/* Optimizaciones Card */}
        <div className="card card-padding bg-white border border-[#c8e6d4]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#6b7280] mb-1">Optimizaciones</p>
              {loading ? (
                <Loader className="animate-spin text-[#4aa87a]" size={24} />
              ) : (
                <p className="text-3xl font-bold text-[#1a1a1a]">
                  {stats.optimizaciones}
                </p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-[#e8f5ee]">
              <Sparkles size={24} className="text-[#4aa87a]" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="card card-padding bg-gradient-to-br from-[#f0fdf7] to-[#f9f9f9] border border-[#c8e6d4]">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-3">
          ¿Qué es io-Semántico?
        </h2>
        <p className="text-[#6b7280] mb-4">
          Herramienta automática para auditorías SEO avanzadas. Scraping de
          metadatos, análisis semántico con IA, y generación de propuestas de
          optimización basadas en jerarquía de palabras clave.
        </p>
        <ul className="space-y-2 text-sm text-[#6b7280]">
          <li>✓ Gestión de clientes y auditorías SEO</li>
          <li>
            ✓ Importación y organización de palabras clave por niveles
            semánticos
          </li>
          <li>✓ Análisis de URLs y generación de propuestas con IA</li>
          <li>✓ Exportación de reportes en CSV/XLS</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card card-padding hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="font-bold text-[#1a1a1a] mb-2">📊 Ver Clientes</h3>
          <p className="text-sm text-[#6b7280]">
            Gestiona tus clientes y carga datos de auditoría
          </p>
          <a
            href="/clientes"
            className="text-[#4aa87a] text-sm font-medium mt-4 inline-block hover:underline"
          >
            Ir a Clientes →
          </a>
        </div>

        <div className="card card-padding hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="font-bold text-[#1a1a1a] mb-2">⚡ Optimizador</h3>
          <p className="text-sm text-[#6b7280]">
            Herramienta de optimización semántica en tiempo real
          </p>
          <a
            href="/optimizador"
            className="text-[#4aa87a] text-sm font-medium mt-4 inline-block hover:underline"
          >
            Ir a Optimizador →
          </a>
        </div>
      </div>
    </div>
  );
}
