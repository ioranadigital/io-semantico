import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const imagenMarcaSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Logo único que te diferencia de competencia · Identidad visual coherente y profesional · Mensaje claro de tu negocio",
    detail: "Entrevistas · Análisis competitivo · Posicionamiento",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Logo profesional en 2-3 semanas · Guía de marca completa lista · Aplicaciones en redes sociales inmediatas",
    detail: "Concepto · Variantes · Usos permitidos",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Impacto",
    body: "Marca recordable y profesional garantizada · Presencia consistente en todas plataformas · Valor agregado a tu negocio",
    detail: "Colores primarios · Secundarios · Tipografía",
    duration: "Semana 4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Guía de Marca Completa",
    body: "Creamos guía de identidad visual detallada para uso consistente en todos tus materiales y plataformas.",
    detail: "Guía completa · Uso de logo · Templates",
    duration: "Semana 5",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Aplicaciones Iniciales",
    body: "Diseñamos tus primeras aplicaciones de marca: tarjetas, papelería, redes sociales y materiales de marketing.",
    detail: "Tarjetas · Social media · Marketing materials",
    duration: "Semana 6",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const ImagenMarcaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Imagen de Marca"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Imagen de Marca" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Trabajamos tu <span style='color: #4D32A5;'>Imagen de Marca</span>"
          content="Crea una identidad visual única y memorable. Diseño de logo, paleta de colores y guía de marca coherente."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Imagen de Marca Única?"
        description="Tu imagen de marca es tu primera impresión y tu ventaja competitiva. Una identidad visual fuerte genera confianza, te diferencia de la competencia y se graba en la mente de tus clientes para siempre."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Trabajaremos en tu"
        titleHighlight="Imagen de Marca?"
        description="Proceso probado en más de 80 proyectos. Identidad visual que comunica y diferencia tu marca."
        steps={imagenMarcaSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ImagenMarcaPage;
