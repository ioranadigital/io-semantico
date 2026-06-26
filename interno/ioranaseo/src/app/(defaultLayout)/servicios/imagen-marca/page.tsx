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
  Palette,
  Zap,
  Shield,
} from "lucide-react";

const imagenMarcaFeatures = [
  {
    icon: <Palette size={32} />,
    title: "Identidad Visual que Te Diferencia",
    description:
      "Tu logo es tu firma en el mercado. Diseño único que refleja quién eres y qué ofreces. Mientras competidores usan logos genéricos, tú destacas con identidad propia que clientes reconocen de inmediato.",
  },
  {
    icon: <Zap size={32} />,
    title: "Primera Impresión que Genera Ventas",
    description:
      "El 94% de decisiones de compra se basan en primeras impresiones. Marca profesional transmite calidad, confianza y seriedad. Cliente ve tu logo y piensa en ti como referente, no como competencia menor.",
  },
  {
    icon: <Shield size={32} />,
    title: "Consistencia que Construye Lealtad",
    description:
      "Paleta de colores, tipografía y elementos coherentes en todos lados. Clientes te reconocen sin leer tu nombre. Marca consistente genera 80% más reconocimiento y fidelización garantizada.",
  },
];

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

const imagenMarcaBenefits = [
  "Identidad Visual Única",
  "Diferenciarse de Competencia",
  "Clientes te Reconocen Siempre",
];

const imagenMarcaWhyImportant = [
  "El 94% de decisiones de compra se basan en primeras impresiones visuales — marca profesional es tu mayor activo de diferenciación",
  "Empresas con identidad de marca consistente generan 20-30% más ingresos — clientes pagan más por marcas reconocibles y confiables",
  "Se necesitan 5-7 exposiciones visuales para recordar una marca — logo y colores consistentes crean reconocimiento automático",
];

const imagenMarcaFaq = [
  {
    title: "¿Cuánto cuesta crear una identidad visual completa?",
    desc: "Una identidad visual básica (logo + paleta de colores) cuesta €600-1,200. Identidad completa incluye: logo, colores, tipografía, guía de marca y aplicaciones iniciales: €1,500-2,500. Esto es inversión única que durará años. Comparado con publicidad continua, es muy rentable.",
  },
  {
    title: "¿Cuántas opciones de logo recibo?",
    desc: "Ofrecemos mínimo 3 conceptos diferentes para elegir. Cada concepto tiene 2-3 variaciones. Incluye revisiones ilimitadas en el concepto elegido hasta que quedes 100% satisfecho. También entregas el logo en múltiples formatos: PNG, SVG, PDF, para que lo uses en cualquier medio.",
  },
  {
    title: "¿Qué incluye exactamente la guía de marca?",
    desc: "La guía incluye: logo con espacios mínimos, colores en RGB/HEX, tipografías principales y secundarias, patrones, texturas, ejemplos de uso correcto e incorrecto, y recomendaciones de aplicación. Documento PDF completo que sirve de referencia para cualquier trabajo futuro de diseño.",
  },
  {
    title: "¿Pueden diseñar mi marca si ya tengo logo?",
    desc: "Sí. Si tienes logo pero no identidad visual definida, te ayudamos a crear paleta de colores, tipografía y guía de marca alrededor de tu logo. O si tu logo necesita actualización, lo rediseñamos manteniendo esencia de tu marca.",
  },
  {
    title: "¿Qué significa que la marca sea escalable?",
    desc: "Significa que tu logo se ve bien desde miniatura (favicon) hasta cartelón grande (valla publicitaria). Un buen logo no pierde características en tamaños pequeños. Probamos en todos los tamaños: web, redes, print, para garantizar que funcione en todos lados.",
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
          benefits={imagenMarcaBenefits}
          whyImportant={imagenMarcaWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Imagen de Marca Única?"
        description="Tu imagen de marca es tu primera impresión y tu ventaja competitivo. Una identidad visual fuerte genera confianza, te diferencia de la competencia y se graba en la mente de tus clientes para siempre."
        features={imagenMarcaFeatures}
        imageSrc="/assets/img/imagen-marca-450.jpg"
        imageAlt="Mujer con imagen de marca profesional"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Trabajaremos en tu"
        titleHighlight="Imagen de Marca?"
        description="Proceso probado en más de 80 proyectos. Identidad visual que comunica y diferencia tu marca."
        steps={imagenMarcaSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={imagenMarcaFaq} />
    </div>
  );
};

export default ImagenMarcaPage;
