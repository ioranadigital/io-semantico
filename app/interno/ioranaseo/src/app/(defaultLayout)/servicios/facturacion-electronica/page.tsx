import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

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
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de la"
        titleHighlight="Facturación Electrónica?"
        description="La facturación electrónica es ley en muchos países y una ventaja competitiva. Reduce costos de papelería, acelera pagos, cumple automáticamente normativas fiscales y mejora la experiencia del cliente."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos"
        titleHighlight="Facturación Electrónica?"
        description="Proceso probado en más de 80 proyectos. Sistema legal y eficiente para tu negocio."
        steps={facturacionElectronicaSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default FacturacionElectronicaPage;
