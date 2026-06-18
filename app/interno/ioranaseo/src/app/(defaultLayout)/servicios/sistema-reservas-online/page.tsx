import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const SistemaReservasOnlinePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Reservas Online"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Reservas Online" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementa un Sistema de <span style='color: #4D32A5;'>Reservas Online</span>"
          content="Sistema de reservas y citas online para tu negocio. Facilita que tus clientes reserven sin necesidad de llamadas."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de un"
        titleHighlight="Sistema de Reservas Online?"
        description="Un sistema de reservas automatizado reduce carga administrativa, mejora experiencia del cliente, aumenta ingresos y permite que tus clientes reserven 24/7 sin intervención manual. Eficiencia y conveniencia total."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cual es la metodologia para implementar tu sistema de"
        titleHighlight="Reservas Online?"
        description="Proceso probado en más de 80 proyectos. Sistema de reservas que gestiona automáticamente tus citas."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default SistemaReservasOnlinePage;
