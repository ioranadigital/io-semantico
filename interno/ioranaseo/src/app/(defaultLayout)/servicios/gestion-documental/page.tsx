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
  Layers,
  Eye,
  Zap,
} from "lucide-react";

const gestionDocumentalFeatures = [
  {
    icon: <Layers size={32} />,
    title: "Documentos Organizados y Accesibles",
    description:
      "Caos documental resuelto. Sistema de carpetas lógico y búsqueda inteligente. Encuentra cualquier documento en segundos, no en horas. Equipo completo puede acceder desde cualquier lugar, en tiempo real.",
  },
  {
    icon: <Eye size={32} />,
    title: "Seguridad y Control de Acceso Total",
    description:
      "Documentos protegidos con encriptación. Control de quién ve qué, quién edita, quién descarga. Cada acción auditada completamente. Datos confidenciales seguros garantizado. Cumplimiento GDPR automático.",
  },
  {
    icon: <Zap size={32} />,
    title: "Eficiencia Operacional Comprobada",
    description:
      "Reduce tiempo de búsqueda 80%. Flujos de aprobación automáticos. Versionamiento de documentos impide errores. Backup automático evita pérdidas. Productividad aumenta, costos bajan, riesgos desaparecen.",
  },
];

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

const gestionDocumentalBenefits = [
  "Documentos Organizados Segundos",
  "Seguridad Encriptada Total",
  "Auditoría Completa Siempre",
];

const gestionDocumentalWhyImportant = [
  "El tiempo promedio buscando documentos es 30% de la jornada laboral — gestión documental profesional recupera ese tiempo en productividad",
  "El 60% de pérdidas de documentos son por mala organización — sistema centralizado evita errores costosos y cumple normativas",
  "Acceso controlado reduce riesgos legales 90% — seguridad de datos y auditoría completa protegen tu negocio",
];

const gestionDocumentalFaq = [
  {
    title: "¿Qué documentos debo gestionar digitalmente?",
    desc: "Todos: contratos, invoices, facturas, recursos humanos, informes, propuestas, manuales, registros ISO. Cualquier documento que tu equipo necesite compartir o encontrar. Digitalización reduce riesgos de pérdida, cumple legales y acelera procesos.",
  },
  {
    title: "¿Puedo digitalizar documentos en papel?",
    desc: "Sí. Ofrecemos servicio de escaneo profesional o guiamos tu proceso. Documentos escaneados se indexan automáticamente por OCR para búsqueda por texto. Mantienes originales papeles si los necesitas, pero digitales son tu fuente oficial.",
  },
  {
    title: "¿Es complejo cambiar de gestión documental antigua?",
    desc: "No. Migramos tus documentos actuales (carpetas compartidas, servidor, OneDrive) al nuevo sistema. Preservamos estructura, agregamos búsqueda inteligente. Equipo ve mejora inmediata: documentos encontrados en segundos, no en minutos.",
  },
  {
    title: "¿Cuánto espacio en nube necesito?",
    desc: "Típicamente 100-500 GB según volumen. Los precios de cloud son económicos: €10-50/mes. Si tu empresa tiene miles de documentos, ofrecemos soluciones de compresión y archivo automático para documentos antiguos. Escalas según necesidad.",
  },
  {
    title: "¿Qué pasa si alguien borra un documento?",
    desc: "Está protegido: 1) Control de acceso previene borrados no autorizados, 2) Papelera de reciclaje recupera eliminaciones accidentales, 3) Historial de versiones mantiene todo cambio. Además, backup automático diario. Documentos imposibles de perder.",
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
          benefits={gestionDocumentalBenefits}
          whyImportant={gestionDocumentalWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Por qué tu negocio necesita una"
        titleHighlight="Gestión Documental Profesional?"
        description="La gestión documental centralizada protege tu información, mejora colaboración, reduce riesgos legales y cumple automáticamente normativas. Control total de tus documentos en un único lugar seguro."
        features={gestionDocumentalFeatures}
        imageSrc="/assets/img/servicios/gestion-documental.png"
        imageAlt="Gestión Documental"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cual es nuestra estrategia para crear tu sistema de"
        titleHighlight="Gestión Documental?"
        description="Proceso probado en más de 80 proyectos. Sistema documentario que organiza y protege tu información."
        steps={gestionDocumentalSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={gestionDocumentalFaq} />
    </div>
  );
};

export default GestionDocumentalPage;
