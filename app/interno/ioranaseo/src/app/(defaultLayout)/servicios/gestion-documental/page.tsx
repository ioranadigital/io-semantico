import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const GestionDocumentalPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Gestión Documental"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Gestión Documental" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Gestión Documental de tu <span style='color: #4D32A5;'>Negocio</span>"
          content="Gestión eficiente de documentación. Sistema de control de versiones y acceso seguro para tu equipo."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Gestión Documental Profesional?"
        description="La gestión documental centralizada protege tu información, mejora colaboración, reduce riesgos legales y cumple automáticamente normativas. Control total de tus documentos en un único lugar seguro."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cual es nuestra estrategia para crear tu sistema de"
        titleHighlight="Gestión Documental?"
        description="Proceso probado en más de 80 proyectos. Sistema documentario que organiza y protege tu información."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default GestionDocumentalPage;
