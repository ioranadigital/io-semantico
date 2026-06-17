"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface Keyword {
  id: string;
  keyword: string;
  subclase: string;
}

interface KeywordAssignmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  urlId: string;
  clienteId: string;
  onSave?: () => void;
}

const KEYWORD_LEVELS = {
  level1_entity_core: { label: "Level 1 - Core Entity", color: "bg-[#4aa87a]" },
  level1_branded: { label: "Level 1 - Branded", color: "bg-[#4aa87a]" },
  level2_local: { label: "Level 2 - Local", color: "bg-[#66bb6a]" },
  level3_educational_howto: {
    label: "Level 3 - Educational",
    color: "bg-[#81c784]",
  },
  level4_comparative_vs: {
    label: "Level 4 - Commercial",
    color: "bg-[#a5d6a7]",
  },
  level5_longtail_informational: {
    label: "Level 5 - Long-tail",
    color: "bg-[#c8e6c9]",
  },
  level5_longtail_transactional: {
    label: "Level 5 - Transactional",
    color: "bg-[#c8e6c9]",
  },
} as Record<string, { label: string; color: string }>;

export default function KeywordAssignmentDrawer({
  isOpen,
  onClose,
  urlId,
  clienteId,
  onSave,
}: KeywordAssignmentDrawerProps) {
  const [allKeywords, setAllKeywords] = useState<Keyword[]>([]);
  const [assignedKeywordIds, setAssignedKeywordIds] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, urlId, clienteId]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cargar todas las keywords del cliente
      const { data: keywords, error: kwError } = await supabase
        .from("io_sem_palabras_clave")
        .select("id, keyword, subclase")
        .eq("cliente_id", clienteId);

      if (kwError) throw kwError;
      setAllKeywords(keywords || []);

      // Cargar keywords ya asignadas a esta URL
      const { data: assigned, error: assignError } = await supabase
        .from("io_sem_asignaciones_kw_url")
        .select("keyword_id")
        .eq("url_id", urlId)
        .eq("cliente_id", clienteId);

      if (assignError) throw assignError;

      const assignedIds = new Set(assigned?.map((a) => a.keyword_id) || []);
      setAssignedKeywordIds(assignedIds);
      setSelectedCount(assignedIds.size);
    } catch (err) {
      console.error("Error loading keywords:", err);
      setError("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleKeyword = (keywordId: string) => {
    const newAssigned = new Set(assignedKeywordIds);

    if (newAssigned.has(keywordId)) {
      newAssigned.delete(keywordId);
    } else {
      if (newAssigned.size >= 6) {
        setError("Máximo 6 keywords por URL");
        return;
      }
      newAssigned.add(keywordId);
    }

    setAssignedKeywordIds(newAssigned);
    setSelectedCount(newAssigned.size);
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Eliminar asignaciones anteriores
      await supabase
        .from("io_sem_asignaciones_kw_url")
        .delete()
        .eq("url_id", urlId)
        .eq("cliente_id", clienteId);

      // Insertar nuevas asignaciones
      if (assignedKeywordIds.size > 0) {
        const asignacionesNuevas = Array.from(assignedKeywordIds).map(
          (keywordId) => ({
            cliente_id: clienteId,
            url_id: urlId,
            keyword_id: keywordId,
            tipo_asignacion: "manual",
            estado: "confirmada",
          }),
        );

        await supabase
          .from("io_sem_asignaciones_kw_url")
          .insert(asignacionesNuevas);
      }

      onSave?.();
      onClose();
    } catch (err) {
      console.error("Error saving assignments:", err);
      setError("Error guardando asignaciones");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const groupedKeywords = Object.entries(KEYWORD_LEVELS).reduce(
    (acc, [levelKey, levelInfo]) => {
      const levelKeywords = allKeywords.filter((k) => k.subclase === levelKey);
      if (levelKeywords.length > 0) {
        acc[levelKey] = { ...levelInfo, keywords: levelKeywords };
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
      <div className="bg-white w-full md:w-[500px] max-h-[90vh] flex flex-col rounded-t-lg md:rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e0e0e0]">
          <h2 className="text-xl font-bold text-[#1a1a1a]">
            Asignar Keywords ({selectedCount}/6)
          </h2>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#1a1a1a]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <p className="text-[#6b7280]">Cargando keywords...</p>
          ) : error ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-1" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : Object.keys(groupedKeywords).length === 0 ? (
            <p className="text-[#6b7280] text-center py-8">
              Sin keywords disponibles
            </p>
          ) : (
            Object.entries(groupedKeywords).map(([levelKey, levelData]) => (
              <div key={levelKey}>
                {/* Level Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${levelData.color}`} />
                  <h3 className="font-semibold text-[#1a1a1a]">
                    {levelData.label}
                  </h3>
                  <span className="text-xs text-[#6b7280]">
                    ({levelData.keywords.length})
                  </span>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 ml-5">
                  {levelData.keywords.map((keyword: Keyword) => {
                    const isSelected = assignedKeywordIds.has(keyword.id);
                    return (
                      <label
                        key={keyword.id}
                        className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all border-2 ${
                          isSelected
                            ? "bg-[#d4ece0] border-[#4aa87a]"
                            : "bg-white border-[#e0e0e0] hover:border-[#4aa87a]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleKeyword(keyword.id)}
                          className="w-4 h-4 rounded cursor-pointer accent-[#4aa87a]"
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-[#3d9068]" : "text-[#1a1a1a]"
                          }`}
                        >
                          {keyword.keyword}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-[#e0e0e0]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#c8e6d4] text-[#4aa87a] font-medium rounded-lg hover:bg-[#f0fdf7]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex-1 px-4 py-2 bg-[#4aa87a] text-white font-medium rounded-lg hover:bg-[#3d9068] disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Asignaciones"}
          </button>
        </div>
      </div>
    </div>
  );
}
