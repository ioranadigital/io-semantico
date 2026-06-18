import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const contenidosSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Palabras clave con alto potencial de búsqueda · Calendario editorial 100% personalizado · Temas que interesan a tu audiencia",
    detail: "Keyword research · Editorial calendar · Topics",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Tráfico orgánico en los primeros meses · Posicionamiento en primera página de Google · Contenido viral con engagement alto",
    detail: "Redacción · SEO optimization · Estructura",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Visibilidad",
    body: "Contenido que convierte lectores en clientes · Actualización y mejora continua · Rankings que se mantienen",
    detail: "Diseño · Imágenes · Videos · Infografías",
    duration: "Semana 4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Publicación y Promoción",
    body: "Publicamos en tu web, blog y redes sociales con estrategia de distribución para máximo alcance.",
    detail: "Publicación · Social media · Email marketing",
    duration: "Semana 5",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Análisis y Mejora Continua",
    body: "Monitoreamos rendimiento, actualizamos contenido antiguo y escalamos los artículos que generan resultados.",
    detail: "Analytics · Content updates · Performance",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const ContenidosPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Generación de Contenidos"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Generación de Contenidos" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Generación de <span style='color: #4D32A5;'>Contenidos</span>"
          content="Contenido de calidad que posiciona en Google y atrae a tu audiencia. Blogs, artículos y landing pages optimizados para conversiones."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué el Marketing de"
        titleHighlight="Contenidos es Estratégico?"
        description="El contenido es el corazón del marketing digital moderno. Estrategia de contenido bien ejecutada posiciona tu marca, atrae tráfico orgánico de calidad, genera confianza y convierte visitantes en clientes leales."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Como generamos los"
        titleHighlight="Contenidos para tu web"
        description="Proceso probado en más de 80 proyectos. Contenido optimizado que posiciona en Google y genera resultados."
        steps={contenidosSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ContenidosPage;
