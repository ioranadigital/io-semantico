import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const facebookAdsSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Audiencia perfecta identificada y segmentada · Comportamientos e intereses analizados · Datos demográficos optimizados",
    detail: "Audiencia análisis · Segmentación · Targeting",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Alcance de millones en Facebook e Instagram · Engagement real y conversaciones · Videos que viran y generan ventas",
    detail: "Diseño · Videos · Copy · A/B testing",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Conversiones",
    body: "Costo por conversión optimizado al máximo · Retargeting de clientes potenciales · ROAS medible y escalable",
    detail: "Facebook · Instagram · Audience Network",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Retargeting y Conversiones",
    body: "Implementamos estrategias de retargeting para convertir usuarios interesados en clientes reales.",
    detail: "Pixel setup · Retargeting · Conversion tracking",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Optimización y Escalado",
    body: "Monitoreamos diariamente, optimizamos pujas y creatividades, escalamos campañas rentables para máximo ROI.",
    detail: "Daily optimization · Bid adjustment · Scaling",
    duration: "Diario",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const FacebookAdsPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Campañas de Facebook Ads"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Campañas de Facebook Ads" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Campañas de <span style='color: #4D32A5;'>Facebook Ads</span>"
          content="Segmenta tu audiencia perfecta en Facebook e Instagram. Campañas efectivas que aumentan tu reach y conversiones."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de las Campañas en"
        titleHighlight="Facebook Ads?"
        description="Facebook Ads alcanza a tu audiencia perfecta con segmentación avanzada. Multiplica tu alcance, aumenta conversiones y aprovecha el poder de 3 billones de usuarios activos en Meta."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Gestionaremos Tus Campañas de"
        titleHighlight="Facebook Ads?"
        description="Proceso probado en más de 80 proyectos. Estrategia de segmentación y optimización para máximo retorno."
        steps={facebookAdsSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default FacebookAdsPage;
