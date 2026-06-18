import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const sistemaReservasOnlineSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Calendario sincronizado automáticamente · Servicios y horarios configurados · Reglas de reserva inteligentes",
    detail: "Servicios setup · Horarios · Reglas",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Reservas online en segundos desde app o web · Pagos seguros integrados · Notificaciones automáticas a clientes",
    detail: "Plataforma setup · Calendario · Confirmación",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Ocupación",
    body: "Reducción de no-shows hasta 90% · Análisis de ocupación en tiempo real · Máxima utilización de tu capacidad",
    detail: "Pagos setup · Gateways · Seguridad",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Notificaciones Automáticas",
    body: "Implementamos notificaciones por email y SMS para confirmación, recordatorio y seguimiento post-reserva.",
    detail: "Email setup · SMS · Recordatorios",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Analytics y Mejora",
    body: "Monitoreamos tasa de reservas, no-shows y optimizamos sistema para maximizar utilización de tu capacidad.",
    detail: "Analytics · No-show tracking · Optimización",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

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
        steps={sistemaReservasOnlineSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default SistemaReservasOnlinePage;
