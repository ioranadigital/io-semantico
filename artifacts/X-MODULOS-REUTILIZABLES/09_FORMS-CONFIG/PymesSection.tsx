// components/PymesSection.tsx — CON SUPABASE
// Solo se muestra el handleSubmit actualizado
// El resto del componente no cambia

// AÑADIR este import al inicio del archivo:
// import { supabase } from "@/lib/supabaseClient";

// REEMPLAZAR la función handleSubmit por esta:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { error } = await supabase.from("leads").insert([{
    nombre:              formData.nombre,
    email:               formData.email,
    telefono:            formData.telefono  || null,
    empresa:             formData.empresa   || null,
    servicio:            formData.subproducto || null,
    mensaje:             formData.mensaje   || null,
    fuente:              "pymes",
    consentimiento_rgpd: true,
  }]);
  if (!error) setSubmitted(true);
  else console.error("Error Supabase:", error.message);
};
