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
  Users,
  Rocket,
  Target,
} from "lucide-react";

const crmFeatures = [
  {
    icon: <Users size={32} />,
    title: "Todo Sobre Cada Cliente en Un Lugar",
    description:
      "Historial completo de cada cliente centralizado. Compras, comportamiento, comunicaciones, preferencias. Tu equipo de ventas sabe exactamente qué necesita cada cliente sin perder tiempo buscando información.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Ventas Más Rápidas y Automatizadas",
    description:
      "Pipeline de ventas visible en tiempo real. Flujos automáticos que mueven leads sin intervención manual. Seguimiento automático de oportunidades. Ciclo de ventas 30-40% más rápido garantizado.",
  },
  {
    icon: <Target size={32} />,
    title: "Decisiones Basadas en Datos Reales",
    description:
      "Reportes automáticos de cada ejecutivo, cada etapa, cada producto. Identifica qué funciona y qué no instantáneamente. Estrategia sales basada en datos, no en intuición. Ingresos predecibles y escalables.",
  },
];

const crmSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Flujo de ventas optimizado para tu proceso · Campos personalizados según necesidades · Métricas claras definidas",
    detail: "Process mapping · Sales flow · CRM selection",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Aumento en cierre de ventas del 30-40% · Tiempo de ciclo de ventas reducido · Datos de clientes centralizados",
    detail: "Setup · Customización · Integraciones",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Crecimiento",
    body: "Equipo de ventas más productivo · Reportes automáticos por ejecutivo · Escalabilidad para crecer",
    detail: "Data migration · Limpieza · Validación",
    duration: "Semana 4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Capacitación del Equipo",
    body: "Entrenamos a tu equipo de ventas en el uso del CRM para maximizar adopción y resultados.",
    detail: "Capacitación · Manuales · Best practices",
    duration: "Semana 5",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Optimización y Reporting",
    body: "Monitoreamos métricas clave, optimizamos flujos y generamos reportes que aceleren tus ventas.",
    detail: "KPI tracking · Optimización · Reportes diarios",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const crmBenefits = [
  "Todo Cliente en Un Lugar",
  "Ventas 30-40% Más Rápidas",
  "Decisiones Datos Reales",
];

const crmWhyImportant = [
  "Empresas con CRM aumentan ventas 30-40% — pipeline visible e información centralizada acelera decisiones de cierre",
  "El 72% de empresas usan CRM para mejorar retención de clientes — información histórica reduce fricción en ventas",
  "CRM automatiza 25% del tiempo manual de ventas — tu equipo vende en lugar de administrar, ROI en 6-12 meses",
];

const crmFaq = [
  {
    title: "¿Qué CRM es el mejor para mi negocio?",
    desc: "Depende del tamaño y tipo. Startups: HubSpot o Pipedrive (intuitivos, baratos). PYMEs: Salesforce o Zoho (más features). Empresas: SAP o Dynamics (enterprise). Analizamos tu operación y recomendamos la mejor opción. Instalamos, configuramos y entrenamos tu equipo.",
  },
  {
    title: "¿Perderé datos al migrar a CRM?",
    desc: "No. Migramos todo: clientes, contactos, historial de vendidos, comunicaciones. Limpiamos y validamos datos antes. Si tienes información en Excel, Salesforce anterior o ERP, lo importamos completo. Cero datos perdidos, 100% validado.",
  },
  {
    title: "¿Cuánto tiempo tarda implementar un CRM?",
    desc: "Implementación básica: 2-4 semanas. Implementación compleja con integraciones: 6-8 semanas. El proceso: configuración, capacitación, pruebas, lanzamiento. Tu equipo empieza a ver valor en primeras 2 semanas. Soporte continuo después del lanzamiento.",
  },
  {
    title: "¿El CRM ralentiza a mi equipo?",
    desc: "Al principio parece lento porque es nuevo. La adopción toma 2-4 semanas. Después, acelera. Capturo de datos toma menos tiempo, búsqueda de información es instantánea, pipelines visibles. A los 2 meses, tu equipo es 30-40% más productivo.",
  },
  {
    title: "¿Qué costo tiene un CRM mensualmente?",
    desc: "Varía: Pipedrive €25-125/usuario/mes, HubSpot €50-3,200/mes, Salesforce €165-300/usuario/mes. Además: implementación (€3,000-15,000), capacitación (€1,000-3,000), integraciones (€2,000-8,000). ROI típico 6-12 meses. Se amortiza en ventas adicionales.",
  },
];

const CRMPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="CRM"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "CRM" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementamos <span style='color: #4D32A5;'>CRM</span>"
          content="Gestión integral de relaciones con clientes. Organiza, automatiza y mejora tus procesos de ventas y servicio al cliente."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={crmBenefits}
          whyImportant={crmWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de un"
        titleHighlight="CRM Profesional?"
        description="Un CRM transformador centraliza toda la información de clientes, automatiza flujos de ventas, mejora colaboración del equipo y aumenta ingresos hasta 300%. Tu arma competitiva en el comercio moderno."
        features={crmFeatures}
        imageSrc="/assets/img/servicios/crm.png"
        imageAlt="CRM Profesional"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos tu"
        titleHighlight="CRM?"
        description="Proceso probado en más de 80 proyectos. Sistema relacional que crece con tu negocio."
        steps={crmSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={crmFaq} />
    </div>
  );
};

export default CRMPage;
