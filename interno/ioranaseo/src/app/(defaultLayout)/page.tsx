export const dynamic = "force-dynamic";
import React from "react";
import HeroBanner3 from "../Components/HeroBanner/HeroBanner3";
import About3 from "../Components/About/About3";
import Pricing3 from "../Components/Pricing/Pricing3";
import ContactIno3 from "../Components/ContactInfo/ContactIno3";
import WhatsappCTA from "../Components/WhatsappCTA/WhatsappCTA";
import faqData from "../Data/faq-inicio.json";

const page = () => {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <WhatsappCTA />
      <HeroBanner3
        subtitle="VISIBILIDAD LOCAL GARANTIZADA"
        title="Multiplica tus clientes apareciendo donde hoy te están buscando."
        content="Hacemos que tu empresa sea la primera opción en internet cuando alguien necesita tus servicios. Sin rodeos técnicos ni informes complejos: solo visibilidad real que genera llamadas y ventas."
        img1="/assets/img/shapes/hero3-shape1.png"
        img2="/assets/img/shapes/hero3-shape2.png"
        img3="/assets/img/hero/dos-hombres-hero.jpg"
        img4="/assets/img/hero/dos-hombres-hero.jpg"
      ></HeroBanner3>
      <About3
        subtitle=""
        title="Desbloquea el potencial de tu negocio apareciendo donde están tus clientes"
        content="No necesitas más tecnicismos; necesitas que tu infraestructura digital trabaje para ti. Nos encargamos de que tu empresa gane la visibilidad, el impacto y la confianza que se traducen en resultados medibles."
        FeatureList={[
          "Clientes que eligen comprar",
          "Visibilidad en el momento oportuno",
          "Liderazgo en tu región",
          "Un comercial activo las 24 horas",
        ]}
        btnurl="/service"
        btnname="Explora Nuestros Servicios"
      ></About3>
      <Pricing3></Pricing3>
      <ContactIno3 showForm={false} faqData={faqData}></ContactIno3>
    </div>
  );
};

export default page;
