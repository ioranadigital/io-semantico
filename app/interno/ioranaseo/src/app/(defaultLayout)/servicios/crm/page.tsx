import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";
import { Search, Settings, FileText, Star, BarChart3 } from "lucide-react";

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
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son los beneficios de un"
        titleHighlight="CRM Profesional?"
        description="Un CRM transformador centraliza toda la información de clientes, automatiza flujos de ventas, mejora colaboración del equipo y aumenta ingresos hasta 300%. Tu arma competitiva en el comercio moderno."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos tu"
        titleHighlight="CRM?"
        description="Proceso probado en más de 80 proyectos. Sistema relacional que crece con tu negocio."
        steps={crmSteps}
      ></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default CRMPage;
