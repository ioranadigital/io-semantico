export const ACCENT = "#ff8c22";
export const AL = "rgba(255,140,34,0.10)";
export const AD = "#ff8c22";
export const IVA = 0.21;
export const COLORS = ["#1D9E75","#378add","#533ab7","#d85a30","#ba7517","#d4537e","#3b6d11","#185fa5"];

export const fmt = (n) => Number(n).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtI = (n) => Math.round(n).toLocaleString("es-ES");
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
export const hoy = () => new Date().toISOString().slice(0, 10);
export const fmtDate = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = (iso.slice(0, 10)).split("-");
  return `${d}/${m}/${y}`;
};

export const css = {
  card: {
    background: "var(--color-background-primary)",
    border: "1px solid rgba(10,43,73,0.12)",
    borderRadius: 12,
    padding: "1.25rem",
    boxShadow: "0 1px 4px rgba(10,43,73,0.07)",
  },
  ghost: {
    background: "#ebf2f7",
    border: "1px solid rgba(10,43,73,0.08)",
    borderRadius: 10,
    padding: "1rem",
  },
  lbl: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "rgba(10,43,73,0.6)",
    marginBottom: 8,
  },
  inp: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid rgba(10,43,73,0.20)",
    background: "var(--color-background-primary)",
    color: "var(--color-text-primary)",
    fontSize: 13,
    height: 38,
    boxSizing: "border-box",
  },
  dateTag: {
    fontSize: 10,
    color: "rgba(10,43,73,0.55)",
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
  },
};
