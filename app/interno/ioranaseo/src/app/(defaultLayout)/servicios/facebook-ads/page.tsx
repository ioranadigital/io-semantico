import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const FacebookAdsPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Campañas de Facebook Ads"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Campañas de Facebook Ads" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Campañas de <span style='color: #4D32A5;'>Facebook Ads</span>"
          content="Segmenta tu audiencia perfecta en Facebook e Instagram. Campañas efectivas que aumentan tu reach y conversiones."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de las Campañas en"
        titleHighlight="Facebook Ads?"
        description="Facebook Ads alcanza a tu audiencia perfecta con segmentación avanzada. Multiplica tu alcance, aumenta conversiones y aprovecha el poder de 3 billones de usuarios activos en Meta."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Gestionaremos Tus Campañas de"
        titleHighlight="Facebook Ads?"
        description="Proceso probado en más de 80 proyectos. Estrategia de segmentación y optimización para máximo retorno."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default FacebookAdsPage;
