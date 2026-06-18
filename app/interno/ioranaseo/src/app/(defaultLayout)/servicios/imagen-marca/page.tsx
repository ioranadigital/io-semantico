import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const ImagenMarcaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Imagen de Marca"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Imagen de Marca" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Trabajamos tu <span style='color: #4D32A5;'>Imagen de Marca</span>"
          content="Crea una identidad visual única y memorable. Diseño de logo, paleta de colores y guía de marca coherente."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Imagen de Marca Única?"
        description="Tu imagen de marca es tu primera impresión y tu ventaja competitiva. Una identidad visual fuerte genera confianza, te diferencia de la competencia y se graba en la mente de tus clientes para siempre."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Trabajaremos en tu"
        titleHighlight="Imagen de Marca?"
        description="Proceso probado en más de 80 proyectos. Identidad visual que comunica y diferencia tu marca."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ImagenMarcaPage;
