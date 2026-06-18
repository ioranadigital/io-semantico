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
    duration: "Contínuo",
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
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita"
        titleHighlight="SEO Local?"
        description="El 76% de las búsquedas móviles tienen intención local. Si no apareces en los resultados locales, tus competidores capturan tus clientes. Posicionamiento local que convierte búsquedas en visitas a tu negocio."
        features={seoLocalFeatures}
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo posicionamos tu negocio en el"
        titleHighlight="Local Pack de Google?"
        description="Estrategia probada en más de 80 empresas locales. Resultados visibles en las primeras semanas."
        steps={seoLocalSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default SeoLocalPruebaPage;
