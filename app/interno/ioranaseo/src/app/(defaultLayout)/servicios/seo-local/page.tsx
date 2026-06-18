import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const seoLocalSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Diseñamos una estrategia SEO Local única para tu negocio, basada en tu sector, competencia y objetivos específicos.",
    detail: "Análisis competitivo · Palabras clave locales · Roadmap",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Implementamos técnicas probadas que generan visibilidad en Google Local dentro de las primeras semanas de trabajo.",
    detail: "GBP optimización · Citaciones · Reseñas",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Posicionamiento",
    body: "Te posicionamos en el Local Pack de Google o ajustamos nuestra estrategia sin costo adicional hasta lograrlo.",
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
