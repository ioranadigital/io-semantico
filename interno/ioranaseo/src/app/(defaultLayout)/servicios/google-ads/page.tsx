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
  Zap,
  Eye,
  TrendingUp,
} from "lucide-react";

const googleAdsFeatures = [
  {
    icon: <Zap size={32} />,
    title: "Resultados Inmediatos",
    description:
      "Olvídate de esperar meses a que Google te posicione. Google Ads genera tráfico el mismo día. Apareces en los primeros resultados de búsqueda y atraes clientes con intención de compra lista para actuar.",
  },
  {
    icon: <Eye size={32} />,
    title: "Visibilidad en Tu Audiencia Exacta",
    description:
      "Segmentamos por palabras clave, ubicación, dispositivo y comportamiento. Cada euro invertido llega a personas que activamente buscan lo que ofreces. Sin desperdicio en audiencias frías.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "ROI Medible o Pagas Menos",
    description:
      "Solo pagas cuando alguien hace clic en tu anuncio. Tracking completo de cada conversión y su valor en dinero. Reportes diarios que prueban qué está funcionando y qué no.",
  },
];

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

const googleAdsBenefits = [
  "Resultados Inmediatos",
  "ROI Medible Garantizado",
  "Clientes con Intención Compra",
];

const googleAdsWhyImportant = [
  "El 63% de compradores hace clic en anuncios de Google cuando busca productos o servicios — es donde tu audiencia busca activamente",
  "Empresas ganan en promedio 3 euros por cada 1 euro invertido en Google Ads — ROI comprobado en miles de casos de estudio",
  "El 50% de clientes toma decisión de compra en la primera búsqueda — estar visible en Google Ads significa capturar intención de compra real",
];

const googleAdsFaq = [
  {
    title: "¿Cuál es el presupuesto mínimo para Google Ads?",
    desc: "No hay mínimo obligatorio, pero recomendamos €300-500/mes para obtener volumen significativo de datos y optimización. Con presupuestos menores, es difícil escalar. El presupuesto lo controlas tú: puedes empezar pequeño y crecer según los resultados. Lo importante es que sea inversión calculada basada en tu margen de ganancia.",
  },
  {
    title: "¿Cuánto cuesta que mi agencia maneje Google Ads?",
    desc: "Ofrecemos dos modelos: 1) Comisión sobre el presupuesto publicitario (15-20% típico), 2) Tarifa fija mensual (€500-1,500 según complejidad). El primer mes es de setup y optimización. Desde mes 2 ves ROI positivo si la estrategia es correcta.",
  },
  {
    title: "¿Garantizan retorno de inversión (ROI)?",
    desc: "Garantizamos ROI positivo o ajustamos sin costo. El primer mes es optimización. Si en 30-60 días no logras 2-3x retorno sobre lo invertido, revisamos la estrategia gratis. Si el servicio no funciona, no pagas comisión extra.",
  },
  {
    title: "¿Cómo evitan el desperdicio en clics sin convertir?",
    desc: "Usamos palabras clave hiperSegmentadas de alto valor. Excluimos palabras negativas que no convierten. Configuramos ubicaciones, horarios y dispositivos específicos. A/B testeamos continuamente anuncios para maximizar CTR. El 70% del presupuesto va a las palabras que realmente convierten.",
  },
  {
    title: "¿Puedo parar una campaña en cualquier momento?",
    desc: "Sí, sin penalizaciones. Las campañas de Google Ads son flexibles: pausas/paras cuando quieras. Si cambia tu situación o resultados, ajustamos o finalizamos. Lo importante es que veas valor desde el principio: tráfico calificado y leads reales.",
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
          benefits={googleAdsBenefits}
          whyImportant={googleAdsWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de invertir en"
        titleHighlight="Google Ads?"
        description="Google Ads genera resultados inmediatos. Aparece en los primeros resultados de búsqueda, atrae clientes con intención de compra y garantiza un ROI medible. Solo pagas por resultados reales."
        features={googleAdsFeatures}
        imageSrc="/assets/img/servicios/google-ads.png"
        imageAlt="Google Ads"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Gestionaremos Tus Campañas de"
        titleHighlight="Google Ads?"
        description="Proceso probado en más de 80 proyectos. Estrategia enfocada en ROI y conversiones reales."
        steps={googleAdsSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={googleAdsFaq} />
    </div>
  );
};

export default GoogleAdsPage;
