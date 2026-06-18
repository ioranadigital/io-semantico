import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const PaginaWebPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Diseñamos tu Página Web"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Diseñamos tu Página Web" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Diseñamos tu <span style='color: #4D32A5;'>Página Web</span>"
          content="Páginas web modernas, rápidas y optimizadas que convierten visitantes en clientes. Diseño responsivo y SEO friendly."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Página Web Profesional?"
        description="El 93% de los clientes investigan online antes de comprar. Una página web bien diseñada genera confianza, aumenta tus ventas y te posiciona por encima de la competencia. Tu mejor vendedor trabajando 24/7."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Así Desarrollaremos tu"
        titleHighlight="Página Web"
        description="Proceso probado en más de 80 proyectos. Diseño moderno, funcional y orientado a conversiones."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PaginaWebPage;
