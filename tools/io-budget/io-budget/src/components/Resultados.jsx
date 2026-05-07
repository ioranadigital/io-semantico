import { useState } from "react";
import { ACCENT, IVA, fmt, fmtDate, css } from "../data/constants.js";
import { groupBy } from "../hooks/useStorage.js";
import { Card, SL, MetricCard, MiniBar, EstadoBadge } from "./ui.jsx";
import { HistorialPeriodos, RecordRow } from "./historialHelpers.jsx";

const NAVY = "#0a2b49";

export default function Resultados({ records, clients = [], onDel }) {
  const [period,    setPeriod]    = useState("month");
  const [viewClient, setViewClient] = useState("__all__");
  const [expanded,  setExpanded]  = useState(new Set());

  const togglePeriod = key => setExpanded(prev => {
    const n = new Set(prev);
    n.has(key) ? n.delete(key) : n.add(key);
    return n;
  });

  const clientNames = ["__all__", ...new Set(records.map(r => r.cliente))];
  const filtered  = viewClient === "__all__" ? records : records.filter(r => r.cliente === viewClient);
  const sorted    = Object.entries(groupBy(filtered, period)).sort(([a], [b]) => a.localeCompare(b));
  const chartData = sorted.slice(-12).map(([k, v]) => ({ label: period === "month" ? k.slice(5) : k, value: v }));
  const total     = filtered.reduce((a, r) => a + r.sinIva, 0);

  const byClient = {};
  records.forEach(r => { byClient[r.cliente] = (byClient[r.cliente] || 0) + r.sinIva; });
  const clientRank = Object.entries(byClient).sort(([, a], [, b]) => b - a);

  const byClientId = {};
  filtered.forEach(r => {
    const key = r.clienteId || r.cliente;
    if (!byClientId[key]) byClientId[key] = { name: r.cliente, items: [] };
    byClientId[key].items.push(r);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── Métricas globales ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 8 }}>
        <MetricCard label="Total acumulado" value={`${fmt(total)} €`} accent />
        <MetricCard label="IVA total"        value={`${fmt(total * IVA)} €`} />
        <MetricCard label="Con IVA"          value={`${fmt(total * (1 + IVA))} €`} accent />
        <MetricCard label="Presupuestos"     value={records.length} />
      </div>

      {/* ── Evolución + ranking ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "rgba(10,43,73,0.6)" }}>Cliente</span>
              <select value={viewClient} onChange={e => setViewClient(e.target.value)} style={{ ...css.inp, fontSize: 12 }}>
                {clientNames.map(c => <option key={c} value={c}>{c === "__all__" ? "Todos" : c}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 3 }}>
              {[["day","Día"],["month","Mes"],["year","Año"]].map(([k, l]) => (
                <button key={k} onClick={() => setPeriod(k)} style={{
                  padding: "4px 10px", borderRadius: 6,
                  border: period === k ? "1.5px solid rgba(255,140,34,0.30)" : "1px solid rgba(10,43,73,0.15)",
                  background: period === k ? ACCENT : "transparent",
                  color: period === k ? "#fff" : "rgba(10,43,73,0.6)",
                  cursor: "pointer", fontSize: 11, fontWeight: period === k ? 600 : 400, transition: "all 0.15s",
                }}>{l}</button>
              ))}
            </div>
          </div>
          <SL>Evolución</SL>
          <MiniBar data={chartData} h={120} />
        </Card>

        <Card>
          <SL>Por cliente</SL>
          {clientRank.map(([name, val]) => {
            const pct = total > 0 ? (val / total * 100) : 0;
            const cl  = clients.find(c => c.name === name);
            const act = !cl || (cl.estado || "activo") === "activo";
            return (
              <div key={name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, alignItems: "center", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: act ? ACCENT : "rgba(10,43,73,0.3)", flexShrink: 0 }} />
                    <span style={{ color: NAVY, fontWeight: 500 }}>{name}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: NAVY }}>{fmt(val)} €</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: "#ebf2f7", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: act ? ACCENT : "rgba(10,43,73,0.25)", borderRadius: 999, transition: "width 0.4s" }} />
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* ── Historial por cliente ── */}
      <Card>
        <SL>Historial por cliente</SL>

        {Object.entries(byClientId).map(([key, { name, items }]) => {
          const totCliente = items.reduce((a, r) => a + r.sinIva, 0);
          const cl         = clients.find(c => c.id === key || c.name === name);
          const nContratos = items.filter(r => r.tipo === "contrato").length;
          const nHoras     = items.filter(r => r.tipo === "horas" || r.tipo === "horas_pack").length;

          return (
            <div key={key} style={{ marginBottom: 20, borderBottom: "1px solid rgba(10,43,73,0.08)", paddingBottom: 16 }}>

              {/* Cabecera del cliente — siempre visible */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: NAVY }}>{name}</span>
                <span style={{ fontSize: 12, color: "rgba(10,43,73,0.3)" }}>·</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{fmt(totCliente)} € total</span>
                {nContratos > 0 && (
                  <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 999, background: "#dce8f2", color: NAVY, fontWeight: 500 }}>
                    {nContratos} contrato{nContratos !== 1 ? "s" : ""}
                  </span>
                )}
                {nHoras > 0 && (
                  <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 999, background: "rgba(255,140,34,0.12)", color: "rgba(10,43,73,0.7)", fontWeight: 500 }}>
                    {nHoras} hora{nHoras !== 1 ? "s" : ""}
                  </span>
                )}
                {cl && (
                  <div style={{ marginLeft: "auto" }}>
                    <EstadoBadge estado={cl.estado} fechaInicio={cl.creadoEn} fechaFin={cl.fechaFin} />
                  </div>
                )}
              </div>

              {/* Períodos con registros colapsables */}
              {cl ? (
                <HistorialPeriodos
                  cl={cl} items={items} clientKey={key}
                  expandedSet={expanded} onToggle={togglePeriod} onDel={onDel}
                />
              ) : (
                // Sin cliente conocido: mostrar plano colapsable
                <FlatCollapsible items={items} clientKey={key} expandedSet={expanded} onToggle={togglePeriod} onDel={onDel} />
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// Fallback para registros sin cliente en la lista de clientes
function FlatCollapsible({ items, clientKey, expandedSet, onToggle, onDel }) {
  const key  = `${clientKey}-flat`;
  const open = expandedSet.has(key);
  return (
    <div>
      <div onClick={() => onToggle(key)} style={{
        display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
        borderRadius: 8, background: "#ebf2f7", cursor: "pointer",
        fontSize: 12, color: "rgba(10,43,73,0.6)", marginBottom: open ? 8 : 0,
      }}>
        <span>{items.length} registro{items.length !== 1 ? "s" : ""}</span>
        <span style={{ marginLeft: "auto" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && items.map(r => <RecordRow key={r.id} r={r} onDel={onDel} />)}
    </div>
  );
}
