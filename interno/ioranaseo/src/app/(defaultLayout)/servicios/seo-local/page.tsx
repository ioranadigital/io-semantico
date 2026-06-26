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
  MapPin,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const seoLocalFeatures = [
  {
    icon: <MapPin size={32} />,
    title: "Tu Negocio Visible en tu Zona",
    description:
      "El 76% de búsquedas locales terminan en una compra. Sin SEO Local, tus clientes cercanos van con tu competencia. Nosotros te ponemos en el mapa donde realmente importa.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Más Llamadas y Visitas Reales",
    description:
      "No es tráfico cualquiera, son clientes en tu zona listos para comprar. Aumento promedio de 40-60% en contactos durante los primeros 3 meses.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Resultados Comprobados o Te Devolvemos",
    description:
      "Te garantizamos posicionamiento en el Local Pack de Google. Si en 90 días no lo logramos, ajustamos sin costo adicional hasta hacerlo.",
  },
];

const seoLocalSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Posicionamiento garantizado en tu zona geográfica · Palabras clave locales de alto potencial · Análisis detallado de tu competencia local",
    detail: "Análisis competitivo · Palabras clave locales · Roadmap",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Visibilidad en Google Local en las primeras semanas · Aumento de llamadas de clientes cercanos · Reseñas positivas que generan confianza",
    detail: "GBP optimización · Citaciones · Reseñas",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Posicionamiento",
    body: "Te posicionamos en el Local Pack o ajustamos sin costo · Optimización continua basada en datos · ROI medible y transparente",
    detail: "Posicionamiento garantizado · Ajustes sin costo",
    duration: "Continuo",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Gestión de Reputación",
    body: "Implementamos un sistema de captación de reseñas auténticas, respondemos a todos los comentarios y protegemos tu reputación online.",
    detail: "Captación de reseñas · Respuestas · Monitorización",
    duration: "Mensual",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Reporting y Optimización",
    body: "Reporting mensual con evolución de posición en el pack local, llamadas generadas, visitas desde Maps y comparativa vs. competencia.",
    detail: "Reporting mensual · Analytics · ROI tracking",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const seoLocalBenefits = [
  "Visibilidad Local Garantizada",
  "Más Clientes Cercanos",
  "Resultados en Semanas",
];

const seoLocalWhyImportant = [
  "El 46% de todas las búsquedas en Google tienen intención local — tus clientes potenciales te están buscando en tu zona geográfica en este momento",
  "El 76% de búsquedas locales resultan en una visita física al negocio dentro de 24 horas — SEO Local convierte búsquedas directas en clientes reales",
  "El Local Pack captura el 44% de los clics totales en resultados de búsqueda — aparecer aquí genera 4 veces más clientes que resultados orgánicos",
];

const seoLocalFaq = [
  {
    title: "¿Cómo se diferencia SEO Local de SEO general?",
    desc: "SEO Local se enfoca en posicionar tu negocio en búsquedas geográficamente específicas (ej: 'fontanero en Madrid'). Mientras que SEO general intenta rankear a nivel nacional. Para negocios con ubicación física, SEO Local es mucho más efectivo porque atrae clientes cercanos listos para comprar.",
  },
  {
    title: "¿Cuál es el tiempo promedio para ver resultados?",
    desc: "En SEO Local, los resultados son más rápidos que en SEO general. Generalmente ves cambios notables en las primeras 3-4 semanas: más visibilidad en Google Maps, aumento de llamadas y visitas. El posicionamiento completo en el Local Pack suele alcanzarse entre 60-90 días.",
  },
  {
    title: "¿Qué es el Local Pack de Google y por qué es importante?",
    desc: "El Local Pack es el cuadro de 3 negocios que aparece en los primeros resultados de Google cuando buscas un servicio en tu zona. Es el lugar más visible para negocios locales. Aparecer aquí genera 4 veces más clics que los resultados orgánicos tradicionales, lo que significa más clientes para ti.",
  },
  {
    title: "¿Cómo impactan las reseñas en el SEO Local?",
    desc: "Las reseñas positivas son un factor clave en el ranking local de Google. No solo mejoran tu posicionamiento, también generan confianza en clientes potenciales — el 92% lee reseñas antes de comprar. Nosotros implementamos un sistema para captar reseñas auténticas de tus clientes.",
  },
  {
    title: "¿Qué incluye exactamente vuestro servicio de SEO Local?",
    desc: "Incluye: auditoría y optimización de Google Business Profile, investigación de palabras clave locales, gestión de citaciones, captación y respuesta de reseñas, creación de contenido local optimizado, y reporting mensual con métricas de posicionamiento y clientes generados.",
  },
];

const SeoLocalPruebaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Servicio SEO Local"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Servicio SEO Local" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Posiciona tu Negocio con <span style='color: #4D32A5;'>SEO Local</span>"
          content="Domina las búsquedas locales en tu área geográfica. Atrae clientes cercanos que buscan exactamente lo que ofreces. Estrategia probada para negocios con ubicación física."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={seoLocalBenefits}
          whyImportant={seoLocalWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita"
        titleHighlight="SEO Local?"
        description="El 76% de las búsquedas móviles tienen intención local. Si no apareces en los resultados locales, tus competidores capturan tus clientes. Posicionamiento local que convierte búsquedas en visitas a tu negocio."
        features={seoLocalFeatures}
        imageSrc="/assets/img/seo-local-tablet-450.jpg"
        imageAlt="SEO Local en tablet"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo posicionamos tu negocio en el"
        titleHighlight="Local Pack de Google?"
        description="Estrategia probada en más de 80 empresas locales. Resultados visibles en las primeras semanas."
        steps={seoLocalSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={seoLocalFaq} />
    </div>
  );
};

export default SeoLocalPruebaPage;
