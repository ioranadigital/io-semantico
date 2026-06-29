"use client";

import Link from "next/link";
import { AlertCircle, Plus, Users } from "lucide-react";
import { useClientes } from "@/lib/clientes-context";
import SetupGuide from "./SetupGuide";

export default function ClientesList() {
  const { clientes, loading, error } = useClientes();

  if (loading) {
    return (
      <div className="card card-padding text-center">
        <div className="animate-pulse">
          <p className="text-[#6b7280]">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  // Si el error es por tabla no encontrada, mostrar SetupGuide
  if (error && error.includes("PGRST205")) {
    return <SetupGuide />;
  }

  if (error) {
    return (
      <div className="card card-padding bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
        <div>
          <p className="font-semibold text-red-900">Error al cargar clientes</p>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con botón */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1a1a1a]">Clientes</h2>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nuevo Cliente
        </button>
      </div>

      {/* Lista de clientes */}
      {clientes.length === 0 ? (
        <div className="card card-padding text-center py-16">
          <Users className="mx-auto mb-4 text-[#c8e6d4]" size={48} />
          <h3 className="font-semibold text-[#1a1a1a] mb-2">
            Sin clientes aún
          </h3>
          <p className="text-[#6b7280] mb-6">
            Crea tu primer cliente para comenzar
          </p>
          <button className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} />
            Crear Primer Cliente
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <Link
              key={cliente.id}
              href={`/clientes/${cliente.id}`}
              className="card card-padding hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#4aa87a] transition-colors">
                    {cliente.nombre}
                  </h3>
                  {cliente.url && (
                    <p className="text-xs text-[#6b7280] truncate mt-1">
                      {cliente.url}
                    </p>
                  )}
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e8f5ee] flex items-center justify-center text-[#4aa87a] font-bold text-sm">
                  {cliente.nombre.charAt(0).toUpperCase()}
                </div>
              </div>

              {cliente.descripcion && (
                <p className="text-sm text-[#6b7280] mb-4">
                  {cliente.descripcion}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#e0e0e0]">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#4aa87a]">
                    {cliente.keywords_count || 0}
                  </p>
                  <p className="text-xs text-[#6b7280]">Keywords</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#4aa87a]">
                    {cliente.urls_count || 0}
                  </p>
                  <p className="text-xs text-[#6b7280]">URLs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#4aa87a]">
                    {cliente.optimizaciones_count || 0}
                  </p>
                  <p className="text-xs text-[#6b7280]">Optimizaciones</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
