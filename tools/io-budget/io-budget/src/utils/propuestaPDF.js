import { fmt, fmtI, fmtDate, IVA } from "../data/constants.js";

/**
 * Genera el HTML de la propuesta sin abrirla.
 * Devuelve el string HTML completo.
 */
export function generarHtmlPropuesta({
  client, selPkgs = [], safeM, mensualD, comprometido,
  subTotal, puntual, sinIva, iva, conIva, ahorro, desc10,
  servs, servSel, servRange, sessions,
  activePkgServIds, pkgServOff, allPkgSubs = [],
  version, nombre,
}) {
  return _buildHtml({
    client, selPkgs, safeM, mensualD, comprometido,
    subTotal, puntual, sinIva, iva, conIva, ahorro, desc10,
    servs, servSel, servRange, sessions,
    activePkgServIds, pkgServOff, allPkgSubs,
    version, nombre,
  });
}

/**
 * Abre una ventana nueva con la propuesta formateada y lanza el diálogo de impresión.
 * Soporta múltiples paquetes seleccionados (selPkgs).
 */
function _buildHtml({
  client, selPkgs = [], safeM, mensualD, comprometido,
  subTotal, puntual, sinIva, iva, conIva, ahorro, desc10,
  servs, servSel, servRange, sessions,
  activePkgServIds, pkgServOff, allPkgSubs = [],
  version, nombre,
}) {
  const hoy = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  const pkgNames = selPkgs.map(p => p.name).join(" + ") || "—";

  // ── Servicios incluidos en los paquetes (solo activos) ────────
  const inclFiltered = allPkgSubs
    .filter(sub => !pkgServOff?.has(sub.id))
    .map(sub => {
      const sv = servs.find(s => s.id === sub.id);
      if (!sv) return null;
      const unitario = sv.min + (sv.max - sv.min) * (sub.ratio ?? 0.5);
      const qty = sub.qty || 1;
      const tot = unitario * qty;
      // resumen: campo personalizado del cliente, si no → descripcion del catálogo
      const resumen = sv.resumen || sv.descripcion || "";
      return { sv, qty, unitario, tot, resumen };
    })
    .filter(Boolean);

  const inclSubtotal = inclFiltered.reduce((a, r) => a + r.tot, 0);

  const inclRows = inclFiltered.map(({ sv, qty, unitario, tot, resumen }) => `<tr>
    <td>
      <strong>${sv.name}</strong>
      ${resumen ? `<br><span style="color:#6b7280;font-size:11px">${resumen}</span>` : ""}
    </td>
    <td style="text-align:center">${qty}</td>
    <td style="text-align:right;color:#6b7280;font-variant-numeric:tabular-nums">${fmtI(unitario)} €</td>
    <td style="text-align:right;font-weight:600;font-variant-numeric:tabular-nums">${fmtI(tot)} €</td>
  </tr>`).join("");

  // ── Servicios adicionales seleccionados ───────────────────────
  const addRows = servs
    .filter(sv => servSel[sv.id] && !activePkgServIds?.has(sv.id))
    .map(sv => {
      const r   = servRange[sv.id] ?? 0.5;
      const val = sv.min === sv.max ? sv.min : sv.min + (sv.max - sv.min) * r;
      const tot = val * (sv.perSession ? (sessions[sv.id] || 1) : 1);
      const resumen = sv.resumen || sv.descripcion || "";
      return `<tr>
        <td>${sv.name}${resumen ? `<br><small style="color:#6b7280">${resumen}</small>` : ""}${sv.perSession ? ` <em>(${sessions[sv.id] || 1} ses.)</em>` : ""}</td>
        <td style="text-align:right;font-variant-numeric:tabular-nums">${fmt(tot)} €</td>
      </tr>`;
    }).join("");

  // ── Bloque de paquetes (uno por paquete seleccionado) ─────────
  const pkgCards = selPkgs.map(p => {
    const pMensualD = (p.price || 0) * (1 - desc10);
    const pTotal    = pMensualD * safeM;
    return `
    <div class="pkg-card" style="margin-bottom:8px">
      <div>
        <div class="pkg-name">${p.name}${desc10 > 0 ? '<span class="discount-badge">−10%</span>' : ""}</div>
        <div class="pkg-detail">${safeM} meses · ${fmt(pMensualD)} €/mes${desc10 > 0 ? " (con descuento)" : ""}</div>
      </div>
      <div class="pkg-price">
        <div class="amount">${fmt(pTotal)} €</div>
        <div class="sub">subtotal paquete</div>
      </div>
    </div>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Propuesta — ${client.name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0a2b49; background: #fff; font-size: 13px; line-height: 1.5; }
  .page { max-width: 780px; margin: 0 auto; padding: 40px 48px; }

  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; padding-bottom: 20px; border-bottom: 2px solid #ff8c22; }
  .brand { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #ff8c22; margin-bottom: 4px; }
  .brand-title { font-size: 22px; font-weight: 300; color: #0a2b49; letter-spacing: -.01em; }
  .meta { text-align: right; font-size: 12px; color: rgba(10,43,73,0.55); }
  .meta strong { color: #0a2b49; font-size: 13px; }

  h2 { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(10,43,73,0.45); margin: 24px 0 10px; }

  .client-block { background: #ebf2f7; border-radius: 8px; padding: 14px 18px; margin-bottom: 4px; }
  .client-block .name { font-size: 18px; font-weight: 600; color: #0a2b49; }
  .client-block .sub  { font-size: 12px; color: rgba(10,43,73,0.55); margin-top: 2px; }

  .pkg-card { border: 1px solid rgba(10,43,73,0.12); border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; }
  .pkg-name { font-size: 15px; font-weight: 600; }
  .pkg-detail { font-size: 12px; color: rgba(10,43,73,0.55); margin-top: 2px; }
  .pkg-price { text-align: right; }
  .pkg-price .amount { font-size: 20px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .pkg-price .sub { font-size: 11px; color: rgba(10,43,73,0.5); }
  .discount-badge { display: inline-block; background: #ff8c22; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; margin-left: 8px; vertical-align: middle; }

  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #ebf2f7; }
  thead th { padding: 8px 10px; font-size: 10px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: rgba(10,43,73,0.55); text-align: left; }
  tbody tr { border-bottom: 1px solid rgba(10,43,73,0.07); }
  tbody td { padding: 9px 10px; font-size: 12px; vertical-align: top; }
  tbody tr:last-child { border-bottom: none; }
  small { font-size: 11px; }

  .totals { margin-top: 20px; border-top: 1px solid rgba(10,43,73,0.12); padding-top: 16px; }
  .totals table { max-width: 340px; margin-left: auto; }
  .totals td { padding: 4px 8px; font-variant-numeric: tabular-nums; }
  .totals .lbl { color: rgba(10,43,73,0.6); }
  .totals .val { text-align: right; font-weight: 600; }
  .totals .highlight td { font-size: 15px; font-weight: 700; border-top: 1px solid rgba(10,43,73,0.15); padding-top: 8px; }
  .totals .accent td { color: #ff8c22; }

  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid rgba(10,43,73,0.10); font-size: 10px; color: rgba(10,43,73,0.40); line-height: 1.7; }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { padding: 24px 32px; }
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div>
      <div class="brand">iorana.digital</div>
      <div class="brand-title">Propuesta de servicios</div>
    </div>
    <div class="meta">
      <div>Fecha: <strong>${hoy}</strong></div>
      <div style="margin-top:4px">Validez: <strong>30 días</strong></div>
      <div style="margin-top:4px">Ref: <strong>PROP-${Date.now().toString(36).toUpperCase().slice(-6)}</strong></div>
    </div>
  </div>

  <h2>Propuesta para</h2>
  <div class="client-block">
    <div class="name">${client.name}</div>
    <div class="sub">Cliente desde ${fmtDate(client.creadoEn)}</div>
  </div>

  <h2>Paquete${selPkgs.length > 1 ? "s contratados" : " contratado"}</h2>
  ${pkgCards}

  ${inclFiltered.length > 0 ? `
  <h2>Servicios incluidos en "${pkgNames}"</h2>
  <table>
    <thead><tr><th>Servicio</th><th style="text-align:center">Cant.</th><th style="text-align:right">Precio unit.</th><th style="text-align:right">Importe</th></tr></thead>
    <tbody>
      ${inclRows}
      <tr style="background:#ebf2f7">
        <td colspan="3" style="font-weight:600;text-align:right;padding-right:8px">Subtotal servicios incluidos</td>
        <td style="text-align:right;font-weight:700;font-variant-numeric:tabular-nums">${fmtI(inclSubtotal)} €</td>
      </tr>
    </tbody>
  </table>` : ""}

  ${addRows ? `
  <h2>Servicios adicionales</h2>
  <table>
    <thead><tr><th>Servicio</th><th style="text-align:right">Importe</th></tr></thead>
    <tbody>${addRows}</tbody>
  </table>` : ""}

  <div class="totals">
    <table>
      <tbody>
        <tr><td class="lbl">Paquete${selPkgs.length > 1 ? "s" : ""} (${safeM}m)</td><td class="val">${fmt(comprometido)} €</td></tr>
        ${subTotal > 0 ? `<tr><td class="lbl">Serv. incluidos en paquete</td><td class="val">${fmt(subTotal)} €</td></tr>` : ""}
        ${puntual > 0  ? `<tr><td class="lbl">Servicios adicionales</td><td class="val">${fmt(puntual)} €</td></tr>` : ""}
        ${ahorro > 0   ? `<tr class="accent"><td class="lbl">Descuento aplicado</td><td class="val">−${fmt(ahorro)} €</td></tr>` : ""}
        <tr><td class="lbl">Base imponible</td><td class="val">${fmt(sinIva)} €</td></tr>
        <tr><td class="lbl">IVA 21%</td><td class="val">${fmt(iva)} €</td></tr>
        <tr class="highlight"><td class="lbl">Total con IVA</td><td class="val">${fmt(conIva)} €</td></tr>
      </tbody>
    </table>
  </div>

  <div class="footer">
    Precios sin IVA salvo indicación expresa · Descuentos por tramo no acumulables entre sí ·
    Validez del presupuesto: 30 días · IVA: 21% · iorana.digital
  </div>

</div>
<script>window.onload = () => { window.print(); }</script>
</body>
</html>`;

  const win = window.open("", "_blank", "width=900,height=700");
  win.document.write(html);
  win.document.close();
}
