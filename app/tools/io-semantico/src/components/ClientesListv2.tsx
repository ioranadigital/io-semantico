"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, Plus, Users } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

export interface Cliente {
  id: string;
  nombre: string;
  creado_en?: string;
  actualizado_en?: string;
}

export default function ClientesListv2() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClientes = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("io_sem_clientes")
          .select("id, nombre, creado_en");

        if (err) {
          throw new Error(err.message);
        }
        setClientes(data || []);
      } catch (err) {
        console.error("Error loading clientes:", err);
        setError(err instanceof Error ? err.message : "Error loading clientes");
      } finally {
        setLoading(false);
      }
    };

    loadClientes();
  }, []);

  if (loading) {
    return (
      <div className="card card-padding text-center">
        <div className="animate-pulse">
          <p className="text-[#6b7280]">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card card-padding bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
        <div>
          <p className="font-semibold text-red-900">Error al cargar clientes</p>
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
          >
            Reintentar
          </button>
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
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#e8f5ee] flex items-center justify-center text-[#4aa87a] font-bold text-sm">
                  {cliente.nombre.charAt(0).toUpperCase()}
                </div>
              </div>

              {cliente.creado_en && (
                <p className="text-xs text-[#6b7280] mt-2">
                  Creado:{" "}
                  {new Date(cliente.creado_en).toLocaleDateString("es-ES")}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
