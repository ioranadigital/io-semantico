import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const ContenidosPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Generación de Contenidos"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Generación de Contenidos" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Generación de <span style='color: #4D32A5;'>Contenidos</span>"
          content="Contenido de calidad que posiciona en Google y atrae a tu audiencia. Blogs, artículos y landing pages optimizados para conversiones."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por que es Importante Generar"
        titleHighlight="Contenidos?"
        description="El contenido es el rey en marketing digital. Contenido estratégico y optimizado posiciona tu marca, atrae tráfico orgánico y convierte visitantes en clientes."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Como generamos los"
        titleHighlight="Contenidos para tu web"
        description="Proceso probado en más de 80 proyectos. Contenido optimizado que posiciona en Google y genera resultados."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ContenidosPage;
