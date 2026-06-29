"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface Keyword {
  id: string;
  keyword: string;
  nivel?: string;
  volumen?: number;
  url_asignada?: string;
}

interface KeywordsPanelProps {
  clienteId: string;
}

export default function KeywordsPanel({ clienteId }: KeywordsPanelProps) {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newLevel, setNewLevel] = useState("level1_entity_core");

  useEffect(() => {
    loadKeywords();
  }, [clienteId]);

  const loadKeywords = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("io_sem_keywords")
        .select("*")
        .eq("cliente_id", clienteId);

      if (err && err.code !== "PGRST116") {
        throw err;
      }
      setKeywords(data || []);
    } catch (err) {
      console.error("Error loading keywords:", err);
      setError(err instanceof Error ? err.message : "Error loading keywords");
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) return;

    try {
      const { error: err } = await supabase.from("io_sem_keywords").insert([
        {
          cliente_id: clienteId,
          keyword: newKeyword.trim(),
          nivel: newLevel,
          volumen: 0,
        },
      ]);

      if (err) throw err;

      setNewKeyword("");
      loadKeywords();
      setShowForm(false);
    } catch (err) {
      console.error("Error adding keyword:", err);
    }
  };

  const handleDeleteKeyword = async (keywordId: string) => {
    try {
      const { error: err } = await supabase
        .from("io_sem_keywords")
        .delete()
        .eq("id", keywordId);

      if (err) throw err;
      loadKeywords();
    } catch (err) {
      console.error("Error deleting keyword:", err);
    }
  };

  if (loading) {
    return (
      <div className="card card-padding text-center">
        <p className="text-[#6b7280]">Cargando keywords...</p>
      </div>
    );
  }

  if (error && !error.includes("PGRST116")) {
    return (
      <div className="card card-padding bg-red-50 border border-red-200 flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Botones de acción */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Agregar Keyword
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card card-padding bg-[#f9f9f9] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Palabra clave"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="input-primary"
            />
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value)}
              className="input-primary"
            >
              <option value="level1_entity_core">Level 1 - Entity Core</option>
              <option value="level2_local">Level 2 - Local</option>
              <option value="level3_educational">Level 3 - Educational</option>
              <option value="level4_commercial">Level 4 - Commercial</option>
              <option value="level5_longtail">Level 5 - Long Tail</option>
              <option value="level6_banned">Level 6 - Banned</option>
            </select>
            <button onClick={handleAddKeyword} className="btn-primary">
              Agregar
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {keywords.length === 0 ? (
        <div className="card card-padding text-center py-8">
          <p className="text-[#6b7280]">Sin keywords aún</p>
        </div>
      ) : (
        <div className="card card-padding space-y-2">
          {keywords.map((kw) => (
            <div
              key={kw.id}
              className="flex items-center justify-between p-3 bg-[#f9f9f9] rounded-lg border border-[#e0e0e0]"
            >
              <div>
                <p className="font-medium text-sm text-[#1a1a1a]">
                  {kw.keyword}
                </p>
                <p className="text-xs text-[#6b7280]">{kw.nivel}</p>
              </div>
              <button
                onClick={() => handleDeleteKeyword(kw.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
