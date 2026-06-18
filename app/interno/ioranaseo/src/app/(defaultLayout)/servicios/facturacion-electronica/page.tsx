import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const FacturacionElectronicaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Facturación Electrónica"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Facturación Electrónica" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementamos <span style='color: #4D32A5;'>Facturación Electrónica</span>"
          content="Sistema de facturación digital seguro y cumplidor. Genera, envía y archiva facturas electrónicas de forma automática."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de la"
        titleHighlight="Facturación Electrónica?"
        description="La facturación electrónica es ley en muchos países y una ventaja competitiva. Reduce costos de papelería, acelera pagos, cumple automáticamente normativas fiscales y mejora la experiencia del cliente."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos"
        titleHighlight="Facturación Electrónica?"
        description="Proceso probado en más de 80 proyectos. Sistema legal y eficiente para tu negocio."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default FacturacionElectronicaPage;
