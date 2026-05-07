import { useState, useCallback } from "react";
import { DEMO_RECORDS } from "../data/defaults.js";

export function useStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const set = useCallback((v) => {
    setVal(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [val, set];
}

export function useRecords() {
  const [records, setRecords] = useStorage("iorana_rec_v7", DEMO_RECORDS);
  const add = (r) => setRecords(prev => [...prev, { ...r, id: Date.now(), ts: new Date().toISOString() }]);
  const del = (id) => setRecords(prev => prev.filter(r => r.id !== id));
  return { records, add, del };
}

export function getTramo(tramos, h) {
  return tramos.find(t => h >= t.min && h <= t.max) || tramos[tramos.length - 1];
}

export function groupBy(records, period) {
  const g = {};
  records.forEach(r => {
    const d = new Date(r.ts);
    const k = period === "day" ? d.toLocaleDateString("es-ES")
      : period === "month" ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      : `${d.getFullYear()}`;
    g[k] = (g[k] || 0) + r.sinIva;
  });
  return g;
}
