import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const NotificacionesWhatsappPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Notificaciones WhatsApp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Notificaciones WhatsApp" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementa <span style='color: #4D32A5;'>Notificaciones WhatsApp</span>"
          content="Comunica con tus clientes directamente por WhatsApp. Automatiza mensajes y aumenta la interacción con tu audiencia."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de"
        titleHighlight="Notificaciones WhatsApp?"
        description="WhatsApp es el canal más directo con tus clientes con 98% de tasa de apertura. Notificaciones automáticas mejoran experiencia, aumentan conversiones y crean una relación cercana con tu audiencia."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo implementaremos el sistema de"
        titleHighlight="Notificaciones de Whatsapp?"
        description="Proceso probado en más de 80 proyectos. Sistema de notificaciones que conecta con tus clientes."
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default NotificacionesWhatsappPage;
