// components/ServiceContactForm.tsx
// Formulario de contacto para páginas de servicios — conectado a Supabase
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  service: string;
}

export default function ServiceContactForm({ service }: Props) {
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const inputCls =
    "w-full bg-[#0a2b49] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#ebf2f7] placeholder:text-[#7fa8c9] focus:outline-none focus:border-[#ff8c00] transition-colors";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form    = e.currentTarget;
    const data    = new FormData(form);
    const nombre  = data.get("name")    as string;
    const email   = data.get("email")   as string;
    const empresa = data.get("company") as string;
    const mensaje = data.get("message") as string;

    const { error: sbError } = await supabase.from("leads").insert([{
      nombre,
      email,
      empresa:              empresa || null,
      servicio:             service,
      mensaje:              mensaje || null,
      fuente:               "servicios",
      consentimiento_rgpd:  true,
    }]);

    setLoading(false);

    if (sbError) {
      console.error("Supabase error:", sbError.message);
      setError("Ha ocurrido un error. Por favor inténtalo de nuevo.");
      return;
    }

    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-[#ff8c00]/15 border border-[#ff8c00]/30 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#ff8c00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#ebf2f7] mb-1">¡Mensaje recibido!</h3>
        <p className="text-sm text-[#7fa8c9]">Te respondemos en menos de 48h.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 text-left"
      aria-label="Formulario de contacto"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="sr-only" htmlFor="sf-name">Nombre</label>
          <input
            id="sf-name" name="name" type="text"
            placeholder="Nombre" required
            className={inputCls}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="sf-email">Email</label>
          <input
            id="sf-email" name="email" type="email"
            placeholder="Email" required
            className={inputCls}
          />
        </div>
      </div>

      <label className="sr-only" htmlFor="sf-company">Empresa</label>
      <input
        id="sf-company" name="company" type="text"
        placeholder="Empresa / Web"
        className={inputCls}
      />

      <label className="sr-only" htmlFor="sf-message">Mensaje</label>
      <textarea
        id="sf-message" name="message" rows={4} required
        placeholder="Cuéntanos sobre tu proyecto..."
        className={`${inputCls} resize-y`}
      />

      {error && (
        <p className="text-sm text-red-400 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-[#ebf2f7] hover:bg-white text-[#07213a] font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Enviando…" : "Enviar mensaje"}
        {!loading && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        )}
      </button>

      <p className="text-xs text-[#7fa8c9]">
        <span className="inline-flex items-center gap-1.5">
          <input type="checkbox" required id="sf-legal" className="w-3.5 h-3.5 accent-[#ff8c00]" />
          <label htmlFor="sf-legal">
            Acepto los{" "}
            <Link href="/terminos" className="text-[#ff8c00] underline underline-offset-2">Términos</Link>{" "}
            y la{" "}
            <Link href="/privacidad" className="text-[#ff8c00] underline underline-offset-2">Privacidad</Link>
          </label>
        </span>
      </p>
    </form>
  );
}
