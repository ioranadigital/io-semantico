export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import {
  Search,
  Settings,
  FileText,
  Star,
  BarChart3,
  Users,
  Heart,
  Share2,
} from "lucide-react";

const facebookAdsFeatures = [
  {
    icon: <Users size={32} />,
    title: "Alcanza a Tu Audiencia Perfecta",
    description:
      "3 billones de usuarios activos en Meta, y nosotros encontramos exactamente quiénes son los tuyos. Edad, intereses, comportamientos, poder adquisitivo. Cero gasto en público que no te interesa.",
  },
  {
    icon: <Heart size={32} />,
    title: "Engagement Real y Conversaciones",
    description:
      "No es solo impresiones, es gente que comenta, comparte y compra. Facebook genera comunidad alrededor de tu marca. Clientes que no solo compran una vez, se quedan para siempre.",
  },
  {
    icon: <Share2 size={32} />,
    title: "Viralidad y Alcance Exponencial",
    description:
      "Tus anuncios se comparten, multiplican su alcance sin costo adicional. Un video viral en Facebook llega a cientos de miles. Contenido que se propaga solo generando visibilidad infinita.",
  },
];

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

const facebookAdsBenefits = [
  "Audiencia Perfecta Segmentada",
  "Alcance Exponencial Viral",
  "Conversiones Rentables Escala",
];

const facebookAdsWhyImportant = [
  "Meta tiene 3 billones de usuarios activos mensuales — cobertura masiva con segmentación de precisión para llegar a tu audiencia exacta",
  "El 77% de compradores descubre productos nuevos en Facebook/Instagram — redes sociales son el primer punto de contacto con nuevos clientes",
  "El costo por lead en Facebook es 50-75% más bajo que Google Ads — mayor escala con presupuesto más eficiente",
];

const facebookAdsFaq = [
  {
    title: "¿Cuál es la diferencia entre Facebook Ads y Google Ads?",
    desc: "Google Ads es para intención de búsqueda ('comprar zapatos'). Facebook Ads es para descubrimiento e interés ('personas que aman la moda'). Google Ads es reactivo, Facebook es proactivo. Idealmente usas ambos: Google para capturar demanda existente, Facebook para crear demanda nueva.",
  },
  {
    title: "¿Cómo segmentan mi audiencia exacta?",
    desc: "Usamos datos de Meta: edad, sexo, ubicación, intereses, comportamientos, poder adquisitivo, dispositios. Excluimos audiencias que no convierten. Creamos audiencias personalizadas similares a tus clientes. Usamos retargeting para reconectar con personas interesadas. Cada campaña se afina semana a semana.",
  },
  {
    title: "¿Puedo medir exactamente qué anuncio genera venta?",
    desc: "Sí, configuramos conversion tracking pixel en tu sitio. Ves exactamente qué anuncio, qué audiencia y qué creatividad generó cada compra y su valor. Reportes diarios con costo por conversión, ROAS, y ROI. Todo medible.",
  },
  {
    title: "¿Vale la pena Facebook Ads para negocios B2B?",
    desc: "Sí, especialmente para leadgen. Aunque B2B es más lento (ciclo de venta mayor), Facebook segmenta empresarios, directores, decisores. Funciona bien con whitepapers, webinarios, demos. El ROAS puede ser menor que B2C pero los leads suelen ser de más valor.",
  },
  {
    title: "¿Qué presupuesto mínimo recomiendan para Facebook?",
    desc: "Recomendamos €200-300/mes para ver volumen. Con presupuestos menores, no hay suficiente data para algoritmo de Meta. Pero la flexibilidad es tuya: puedes pausar, cambiar o eliminar en cualquier momento. Lo ideal es budget que te permita testing y escalado en 30-60 días.",
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
          benefits={facebookAdsBenefits}
          whyImportant={facebookAdsWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de las Campañas en"
        titleHighlight="Facebook Ads?"
        description="Facebook Ads alcanza a tu audiencia perfecta con segmentación avanzada. Multiplica tu alcance, aumenta conversiones y aprovecha el poder de 3 billones de usuarios activos en Meta."
        features={facebookAdsFeatures}
        imageSrc="/assets/img/servicios/facebook-ads.png"
        imageAlt="Facebook Ads"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Gestionaremos Tus Campañas de"
        titleHighlight="Facebook Ads?"
        description="Proceso probado en más de 80 proyectos. Estrategia de segmentación y optimización para máximo retorno."
        steps={facebookAdsSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={facebookAdsFaq} />
    </div>
  );
};

export default FacebookAdsPage;
