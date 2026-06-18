import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

const gestionDocumentalSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Documentos organizados y clasificados · Acceso controlado por usuario · Políticas de retención definidas",
    detail: "Inventario · Clasificación · Políticas",
    duration: "Semana 1-2",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Sistema operativo en 3-4 semanas · Búsqueda de documentos en segundos · Auditoría completa disponible",
    detail: "Setup · Configuración · Seguridad",
    duration: "Semana 3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Seguridad",
    body: "Documentos protegidos y respaldados · Compliance con normativas · Reducción de riesgos legales",
    detail: "Digitalización · Organización · Etiquetado",
    duration: "Semana 4-5",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Capacitación de Usuarios",
    body: "Entrenamos a tu equipo en el uso del sistema, búsqueda, carga de documentos y control de accesos.",
    detail: "Capacitación · Manuales · Support",
    duration: "Semana 6",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Governance y Optimización",
    body: "Establecemos políticas de gestión, backup automático y auditoría para mantener documentos seguros.",
    detail: "Políticas · Backup · Auditoría · Compliance",
    duration: "Indefinido",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const GestionDocumentalPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Gestión Documental"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Gestión Documental" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Gestión Documental de tu <span style='color: #4D32A5;'>Negocio</span>"
          content="Gestión eficiente de documentación. Sistema de control de versiones y acceso seguro para tu equipo."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Gestión Documental Profesional?"
        description="La gestión documental centralizada protege tu información, mejora colaboración, reduce riesgos legales y cumple automáticamente normativas. Control total de tus documentos en un único lugar seguro."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cual es nuestra estrategia para crear tu sistema de"
        titleHighlight="Gestión Documental?"
        description="Proceso probado en más de 80 proyectos. Sistema documentario que organiza y protege tu información."
        steps={gestionDocumentalSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default GestionDocumentalPage;
