"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase-client";

export interface Cliente {
  id: string;
  nombre: string;
  descripcion?: string;
  url?: string;
  keywords_count?: number;
  urls_count?: number;
  optimizaciones_count?: number;
  created_at?: string;
}

interface ClientesContextType {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
  loadClientes: () => Promise<void>;
}

const ClientesContext = createContext<ClientesContextType | undefined>(
  undefined,
);

export function ClientesProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("io_sem_clientes")
        .select("id, nombre, creado_en, actualizado_en");

      if (err) throw err;
      setClientes(data || []);
    } catch (err) {
      console.error("Error loading clientes:", err);
      setError(err instanceof Error ? err.message : "Error loading clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <ClientesContext.Provider
      value={{ clientes, loading, error, loadClientes }}
    >
      {children}
    </ClientesContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("useClientes must be used within ClientesProvider");
  }
  return context;
}
