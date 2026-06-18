import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const tiendaOnlineSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Catálogo optimizado para vender más · Múltiples pasarelas de pago seguras · Gestión de inventario automática",
    detail: "Catálogo analysis · Segmentación · Roadmap",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Primeras ventas en semanas · Carrito de compra optimizado para no abandonos · Notificaciones automáticas a clientes",
    detail: "Plataforma setup · Pagos · Integraciones",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Ventas",
    body: "Tienda segura certificada SSL · Analytics detallado de cada venta · Margen de ganancia máximo garantizado",
    detail: "UX optimizada · Mobile friendly · Checkout rápido",
    duration: "Semana 4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Marketing y Promociones",
    body: "Implementamos estrategias de marketing integradas, descuentos, email marketing y programas de fidelización.",
    detail: "Email automation · Descuentos · Referrals",
    duration: "Semana 5",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Monitorización y Optimización",
    body: "Monitoreamos ventas, comportamiento de usuarios y optimizamos continuamente para maximizar tus ingresos.",
    detail: "Analytics · A/B testing · Reporting mensual",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const TiendaOnlinePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Tienda Online"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Tienda Online" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Tienda Online : <span style='color: #4D32A5;'>E-Commerce</span>"
          content="Plataformas de e-commerce seguras y escalables. Vende productos online y multiplica tus ingresos con nuestra solución integral."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de tener una"
        titleHighlight="Tienda Online?"
        description="Vender online multiplica tus ingresos sin límites geográficos. Alcanza clientes 24/7, reduce costos operacionales y escala tu negocio exponencialmente. El comercio electrónico es el presente del negocio."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Así Creamos tu"
        titleHighlight="Tienda Online"
        description="Proceso probado en más de 80 e-commerce. Venta segura, pagos integrados y máximas conversiones."
        steps={tiendaOnlineSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default TiendaOnlinePage;
