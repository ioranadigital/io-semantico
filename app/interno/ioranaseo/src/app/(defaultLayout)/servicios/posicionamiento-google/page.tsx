import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const PosicionamientoGooglePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Presencia Digital en Google"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Presencia Digital en Google" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Presencia Digital en Google"
          content="Posiciona tu negocio en Google y atrae clientes que te están buscando. Estrategias SEO probadas que generan resultados reales."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Es importante tener"
        titleHighlight="visibilidad en Google?"
        description="Si tu negocio no aparece en los primeros resultados de Google, tus competidores te están llevando los clientes. Nosotros te posicionamos donde te merecen encontrar."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Como trabajamos para lograr que tu negocio tenga"
        titleHighlight="visibilidad en google"
        description="Estrategia comprobada en más de 80 empresas. Posicionamiento real, resultados reales."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PosicionamientoGooglePage;
