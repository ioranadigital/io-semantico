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
  Lock,
  DollarSign,
  AlertCircle,
} from "lucide-react";

const facturacionElectronicaFeatures = [
  {
    icon: <Lock size={32} />,
    title: "Cumplimiento Fiscal 100% Garantizado",
    description:
      "Sistema que cumple TODAS las normativas de Hacienda automáticamente. Cero multas por incumplimiento. Facturas digitales almacenadas según ley, respaldadas y auditables. Tranquilidad fiscal permanente.",
  },
  {
    icon: <DollarSign size={32} />,
    title: "Ahorro de Costos Operacionales Inmediato",
    description:
      "Cero papel, cero impresoras, cero tinta. Reduce 70% de costos de emisión de facturas. Sistema que se integra con tu ERP y genera reportes automáticos. Menos trabajo administrativo, más dinero en bolsillo.",
  },
  {
    icon: <AlertCircle size={32} />,
    title: "Rastreabilidad Total para Auditorías",
    description:
      "Toda factura registrada y trazable, desde emisión hasta cobro. Historial completo disponible en segundos. Auditorías internas y externas resueltas sin estrés. Base de datos que probará tu legalidad.",
  },
];

const facturacionElectronicaSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Cumplimiento 100% con normativas fiscales · Plataforma seleccionada según tu negocio · Integración con sistemas actuales",
    detail: "Auditoría fiscal · Requisitos legales · Plataforma",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Facturas electrónicas en operación en 2 semanas · Reportes fiscales automáticos · Cero errores de cumplimiento",
    detail: "Setup · Integración API · Testing",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Legalidad",
    body: "100% conforme con Hacienda · Datos protegidos y auditables · Impuestos calculados automáticamente",
    detail: "Capacitación · Manuales · Soporte inicial",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Lanzamiento y Monitoreo",
    body: "Lanzamos la facturación electrónica y monitoreamos el proceso para asegurar cumplimiento normativo.",
    detail: "Lanzamiento · Monitoreo · Validaciones",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Soporte Continuo",
    body: "Proveemos soporte permanente, actualizaciones normativas y optimización del proceso contable.",
    detail: "Soporte 24/7 · Actualizaciones · Reportes",
    duration: "Indefinido",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const facturacionElectronicaBenefits = [
  "Cumplimiento Fiscal Garantizado",
  "Cero Errores Contables",
  "Auditorías sin Estrés",
];

const facturacionElectronicaWhyImportant = [
  "La facturación electrónica es obligatoria en UE desde 2024 — cumplimiento normativo es ley, no opción",
  "Empresas con facturación electrónica reducen costos administrativos 50-70% — sin papel, sin almacenamiento, sin errores manuales",
  "Auditorías fiscales toman 90% menos tiempo con facturación digital — trazabilidad completa automática genera confianza con Hacienda",
];

const facturacionElectronicaFaq = [
  {
    title: "¿Es obligatoria la facturación electrónica en España?",
    desc: "Sí, desde el 1 de enero de 2024 es obligatoria para todas las transacciones B2B. Las empresas deben emitir y recibir facturas en formato electrónico. Las excepciones son contadas (freelancers, micropymes en casos específicos). La ley es clara: implementar es obligatorio, no opcional.",
  },
  {
    title: "¿Cuáles son los formatos aceptados?",
    desc: "Los formatos aceptados son: e-factura (formato estándar), UBL-XML, Facturae, XInvoice. El más usado en España es e-factura. El sistema que implementamos soporta todos los formatos requeridos por Hacienda. Tu cliente recibe en el formato que requiere.",
  },
  {
    title: "¿Se integra con mi software actual?",
    desc: "Sí. Si tienes ERP, CRM o software de contabilidad, lo integramos mediante API. Tus facturas se generan automáticamente sin duplicar trabajo. Si usas Excel o facturas manuales, implementamos una solución cloud que se sincroniza con Hacienda.",
  },
  {
    title: "¿Quién guarda mis facturas en Hacienda?",
    desc: "Las facturas se registran automáticamente en el Registro de Facturas Telemático (RFT) del Banco de España. Tú tienes copia digital. Hacienda tiene acceso en tiempo real. Es el archivo oficial, legal y auditado. Cero riesgo de pérdida.",
  },
  {
    title: "¿Cuánto cuesta implementar facturación electrónica?",
    desc: "Varía según complejidad. Facturación simple (hasta 500 facturas/mes): €300-500/mes. Facturación compleja con ERP integrado: €800-1,500/mes. Incluye: software, soporte, actualizaciones, cumplimiento normativo. Se amortiza en 2-3 meses por ahorro administrativo.",
  },
];

const FacturacionElectronicaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Facturación Electrónica"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Facturación Electrónica" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementamos <span style='color: #4D32A5;'>Facturación Electrónica</span>"
          content="Sistema de facturación digital seguro y cumplidor. Genera, envía y archiva facturas electrónicas de forma automática."
          img="/assets/img/servicios/facturas.jpg"
          showImage={false}
          benefits={facturacionElectronicaBenefits}
          whyImportant={facturacionElectronicaWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de la"
        titleHighlight="Facturación Electrónica?"
        description="La facturación electrónica es ley en muchos países y una ventaja competitiva. Reduce costos de papelería, acelera pagos, cumple automáticamente normativas fiscales y mejora la experiencia del cliente."
        features={facturacionElectronicaFeatures}
        imageSrc="/assets/img/servicios/facturas.jpg"
        imageAlt="Facturación Electrónica"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos"
        titleHighlight="Facturación Electrónica?"
        description="Proceso probado en más de 80 proyectos. Sistema legal y eficiente para tu negocio."
        steps={facturacionElectronicaSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={facturacionElectronicaFaq} />
    </div>
  );
};

export default FacturacionElectronicaPage;
