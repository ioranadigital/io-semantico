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
  Globe,
  Smartphone,
  DollarSign,
} from "lucide-react";

const paginaWebFeatures = [
  {
    icon: <Globe size={32} />,
    title: "Presencia Profesional 24/7",
    description:
      "El 93% de clientes investiga online antes de comprar. Sin página web, pierdes esas ventas. Tu web es tu mejor vendedor trabajando sin descanso para ti.",
  },
  {
    icon: <Smartphone size={32} />,
    title: "Funciona en Todos los Dispositivos",
    description:
      "Diseño responsivo que se adapta perfectamente a móvil, tablet y desktop. Los clientes pueden verte desde cualquier lugar, en cualquier momento.",
  },
  {
    icon: <DollarSign size={32} />,
    title: "Convertir Visitantes en Clientes",
    description:
      "No es solo una página bonita, es una máquina de generar leads. Con CTAs optimizados y formularios estratégicos, cada visitante es un cliente potencial.",
  },
];

const paginaWebSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Diseño único que refleja tu marca · Estructura optimizada para conversiones · Responsivo en todos los dispositivos",
    detail: "Análisis de negocio · UX/UI strategy · Wireframes",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Página web profesional en semanas, no meses · Seguimiento de visitantes desde el primer día · Posicionamiento inmediato en Google",
    detail: "Diseño responsive · Brand guidelines · Mockups",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Desempeño",
    body: "Página rápida y segura garantizada · Soporte técnico 24/7 permanente · Optimización continua para más conversiones",
    detail: "On-page SEO · Performance · Indexación",
    duration: "Semana 4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Integración de Conversiones",
    body: "Configuramos formularios, botones CTA y herramientas de análisis para convertir visitantes en leads y clientes.",
    detail: "Formularios · Integración CRM · Analytics",
    duration: "Semana 5",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Mantenimiento y Soporte",
    body: "Lanzamos tu web y la mantenemos segura, actualizada y optimizada. Soporte continuo para tu éxito.",
    detail: "Hosting · Seguridad · Backup · Soporte 24/7",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const PaginaWebPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Diseñamos tu Página Web"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Diseñamos tu Página Web" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Diseñamos tu <span style='color: #4D32A5;'>Página Web</span>"
          content="Páginas web modernas, rápidas y optimizadas que convierten visitantes en clientes. Diseño responsivo y SEO friendly."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Página Web Profesional?"
        description="El 93% de los clientes investigan online antes de comprar. Una página web bien diseñada genera confianza, aumenta tus ventas y te posiciona por encima de la competencia. Tu mejor vendedor trabajando 24/7."
        features={paginaWebFeatures}
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Así Desarrollaremos tu"
        titleHighlight="Página Web"
        description="Proceso probado en más de 80 proyectos. Diseño moderno, funcional y orientado a conversiones."
        steps={paginaWebSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PaginaWebPage;
