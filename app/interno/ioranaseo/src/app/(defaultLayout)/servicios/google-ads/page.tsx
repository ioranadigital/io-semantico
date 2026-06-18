import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const googleAdsSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Palabras clave de alta intención de compra · Segmentación por público objetivo · Ubicación y horarios optimizados",
    detail: "Auditoría · Palabras clave · Presupuesto inicial",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Tráfico calificado en 48 horas · Leads de calidad desde el primer día · ROI positivo en las primeras semanas",
    detail: "Campañas setup · Segmentación · Palabras clave",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de ROI",
    body: "Presupuesto invertido sabiamente en clientes reales · Reportes transparentes diarios · Optimización continua",
    detail: "Landing pages · Conversion tracking · A/B testing",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Optimización Continua",
    body: "Monitoreamos rendimiento, ajustamos palabras clave, pujas y creatividades diariamente para maximizar ROI.",
    detail: "Bid management · Optimización · Ajustes diarios",
    duration: "Diario",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Reporting y Escalado",
    body: "Reporting detallado con ROI, ROAS, CPA. Escalamos campañas rentables y eliminamos gastos improductivos.",
    detail: "Reporting diario · ROI tracking · Escalado",
    duration: "Diario",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const GoogleAdsPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Campañas de Google Ads"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Campañas de Google Ads" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Campañas de <span style='color: #4D32A5;'>Google Ads</span>"
          content="Campañas publicitarias optimizadas que generan leads y ventas. ROI garantizado con gestión experta de presupuesto."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de invertir en"
        titleHighlight="Google Ads?"
        description="Google Ads genera resultados inmediatos. Aparece en los primeros resultados de búsqueda, atrae clientes con intención de compra y garantiza un ROI medible. Solo pagas por resultados reales."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Gestionaremos Tus Campañas de"
        titleHighlight="Google Ads?"
        description="Proceso probado en más de 80 proyectos. Estrategia enfocada en ROI y conversiones reales."
        steps={googleAdsSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default GoogleAdsPage;
