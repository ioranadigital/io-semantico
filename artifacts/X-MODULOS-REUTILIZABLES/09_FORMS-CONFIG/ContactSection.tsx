// components/ContactSection.tsx — CON SUPABASE
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "", email: "", mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  const inputCls =
    "w-full p-4 rounded-xl bg-[#0a2b49] border border-[#ebf2f7]/10 text-white placeholder:text-[#ebf2f7]/30 focus:outline-none focus:border-[#ff8c00] transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: sbError } = await supabase.from("leads").insert([{
      nombre:              formData.nombre,
      email:               formData.email,
      mensaje:             formData.mensaje || null,
      fuente:              "home",
      consentimiento_rgpd: true,
    }]);

    setLoading(false);

    if (sbError) {
      console.error("Supabase error:", sbError.message);
      setError("Ha ocurrido un error. Por favor inténtalo de nuevo.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="contacto" className="w-full py-24 bg-[#0a2b49] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Bloque izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-[#ff8c00] tracking-widest uppercase">
              Hablemos
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mt-4 text-[#ebf2f7] leading-tight tracking-tight">
              ¿Listo para dominar <br />
              <span className="text-[#ff8c00]">tu mercado?</span>
            </h2>
            <p className="mt-6 text-lg text-[#ebf2f7]/70 leading-relaxed mb-10">
              Estamos a un paso de diseñar la estrategia que escalará tu negocio. Rellena el formulario y agendaremos una breve sesión de auditoría gratuita.
            </p>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-[#08223a] border border-[#ebf2f7]/5 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-[#ff8c00]/15 border border-[#ff8c00]/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#ff8c00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-extrabold text-[#ebf2f7] mb-2">¡Mensaje recibido!</h3>
                <p className="text-sm text-[#ebf2f7]/50">Te contactamos en menos de 48h.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <input
                  type="text" placeholder="Nombre" required
                  className={inputCls}
                  value={formData.nombre}
                  onChange={(e) => setFormData((f) => ({ ...f, nombre: e.target.value }))}
                />
                <input
                  type="email" placeholder="Email corporativo" required
                  className={inputCls}
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                />
                <textarea
                  placeholder="Tu mensaje..." rows={4}
                  className={inputCls}
                  value={formData.mensaje}
                  onChange={(e) => setFormData((f) => ({ ...f, mensaje: e.target.value }))}
                />

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                <Button
                  type="submit" size="lg" disabled={loading}
                  className="w-full bg-[#ff8c00] text-white font-bold rounded-xl h-14 text-base hover:scale-[1.02] transition-transform duration-300 shadow-[0_10px_30px_rgba(255,140,0,0.3)] disabled:opacity-60"
                >
                  {loading ? "Enviando…" : "Enviar mensaje"}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
