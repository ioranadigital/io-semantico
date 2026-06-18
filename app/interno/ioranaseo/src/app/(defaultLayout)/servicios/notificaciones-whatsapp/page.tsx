import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const notificacionesWhatsappSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Canal de comunicación directo con clientes · Número verificado listo para operar · Integración con tus sistemas",
    detail: "Cuenta setup · Número verificado · API access",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Tasa de apertura de 98% de mensajes · Aumenta ventas en 30-40% · Respuestas automáticas 24/7",
    detail: "API integration · Webhooks · Testing",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Engagement",
    body: "Clientes conectados constantemente · Chatbot inteligente operando · Métricas de conversación detalladas",
    detail: "Flujos · Mensajes · Plantillas",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Chatbot Inteligente",
    body: "Implementamos chatbot con IA que responde preguntas frecuentes y cualifica leads 24/7.",
    detail: "Chatbot setup · IA responses · Escalonamiento",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Monitoreo y Optimización",
    body: "Monitoreamos tasas de entrega, respuesta y optimizamos mensajes para máximo engagement.",
    detail: "Analytics · A/B testing · Optimization",
    duration: "Diario",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

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
        steps={notificacionesWhatsappSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default NotificacionesWhatsappPage;
