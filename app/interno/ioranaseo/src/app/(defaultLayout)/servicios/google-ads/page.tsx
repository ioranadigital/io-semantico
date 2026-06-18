import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const GoogleAdsPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Campañas de Google Ads"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Campañas de Google Ads" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Campañas de <span style='color: #4D32A5;'>Google Ads</span>"
          content="Campañas publicitarias optimizadas que generan leads y ventas. ROI garantizado con gestión experta de presupuesto."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Vale la pena invertir en"
        titleHighlight="Google Ads?"
        description="Si quieres resultados inmediatos, Google Ads es tu mejor aliado. Aparece en los primeros resultados de búsqueda y atrae clientes listos para comprar hoy mismo."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Gestionaremos Tus Campañas de"
        titleHighlight="Google Ads?"
        description="Proceso probado en más de 80 proyectos. Estrategia enfocada en ROI y conversiones reales."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default GoogleAdsPage;
