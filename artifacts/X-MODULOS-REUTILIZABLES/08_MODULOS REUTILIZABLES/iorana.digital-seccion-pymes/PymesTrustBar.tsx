// components/PymesTrustBar.tsx
// Iorana Digital — Trust Bar · Sección 2
// Logos de clientes + certificaciones · strip horizontal · scroll en móvil

"use client";

import { useEffect, useRef } from "react";

const TRUST_ITEMS = [
  { label: "Google Partner", icon: "G", color: "#4285F4" },
  { label: "Semrush Certified", icon: "S", color: "#FF642D" },
  { label: "Nextjs Certified", icon: "N", color: "#ebf2f7" },
  { label: "Supabase Partner", icon: "SB", color: "#3ECF8E" },
  { label: "+80 Pymes", icon: "80+", color: "#ff8c00" },
  { label: "Clutch Top Agency", icon: "C", color: "#EF4335" },
  { label: "Meta Business", icon: "M", color: "#0668E1" },
  { label: "ISO 27001", icon: "ISO", color: "#ebf2f7" },
];

const STATS = [
  { value: "+80", label: "Pymes digitalizadas", suffix: "" },
  { value: "4.8", label: "Valoración media Google", suffix: "★" },
  { value: "91", label: "NPS clientes activos", suffix: "/100" },
  { value: "90", label: "Días garantía resultados", suffix: "d" },
];

export default function PymesTrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Infinite marquee via JS para rendimiento */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const speed = 0.4;
    const clone = track.innerHTML;
    track.innerHTML += clone; // duplicate for seamless loop

    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= track.scrollWidth / 2) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { raf = requestAnimationFrame(animate); };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      aria-label="Clientes y certificaciones de Iorana Digital"
      className="w-full bg-[#060a10] border-y border-white/5 overflow-hidden"
    >
      {/* ── Estadísticas rápidas ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-[#ff8c00] tabular-nums leading-none">
                {s.value}
                <span className="text-lg text-[#ff8c00]/70">{s.suffix}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mx-8" />

      {/* ── Marquee de logos ── */}
      <div className="relative py-6 overflow-hidden">
        {/* Fade edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to right, #060a10, transparent)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to left, #060a10, transparent)" }}
        />

        <div className="flex" style={{ width: "max-content" }} ref={trackRef}>
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              className="flex items-center gap-3 mx-8 shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
              title={item.label}
            >
              {/* Logo placeholder — reemplazar con <img> real */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black border border-white/10"
                style={{ background: `${item.color}18`, color: item.color, borderColor: `${item.color}30` }}
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-[#ebf2f7]/70 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA sutil ── */}
      <p className="text-center text-xs text-slate-600 pb-6 tracking-wide">
        Únete a más de 80 pymes que ya confían en Iorana Digital
      </p>
    </section>
  );
}
