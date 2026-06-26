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
  Cpu,
  Clock,
  Lightbulb,
} from "lucide-react";

const iaAutomatizacionesFeatures = [
  {
    icon: <Cpu size={32} />,
    title: "IA que Piensa como Tu Experto",
    description:
      "Máquinas que aprenden y mejoran solas. Algoritmos que toman decisiones complejas en milisegundos. Sin errores humanos, sin cansancio, sin necesidad de supervisión constante. Tu equipo experto 24/7.",
  },
  {
    icon: <Clock size={32} />,
    title: "Ahorro de Tiempo que Vale Dinero",
    description:
      "Tareas que tomaban horas a tu equipo ahora se resuelven en minutos. Procesos que requerían 5 personas ahora se ejecutan solos. Reducción de 40-80% en tiempo operacional con mayor precisión.",
  },
  {
    icon: <Lightbulb size={32} />,
    title: "Decisiones Más Inteligentes con Datos",
    description:
      "IA analiza millones de datos e identifica patrones que humanos pierden. Recomendaciones automáticas basadas en realidad. Estrategia basada en datos, no en intuición, resultado = más ingresos.",
  },
];

const iaAutomatizacionesSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Procesos identificados para automatizar · Ahorro de tiempo significativo mapeado · Rentabilidad estimada por proceso",
    detail: "Process mapping · Análisis de tiempo · ROI",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Reducción de 40-60% en tareas manuales · Productividad del equipo aumentada · Decisiones mejor informadas con IA",
    detail: "Herramientas · Integración · Capacitación",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Eficiencia",
    body: "Sistemas funcionando sin interrupciones · ROI medible en los costos operacionales · Soporte continuo incluido",
    detail: "Setup · Testing · Integración API",
    duration: "Semana 3-4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Optimización y Mejora",
    body: "Monitoreamos el desempeño, ajustamos parámetros y mejoramos continuamente la precisión de tus soluciones IA.",
    detail: "Testing · Ajustes · Optimización",
    duration: "Mensual",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Soporte y Escalado",
    body: "Proveemos soporte técnico continuo y escalamos la automatización a nuevos procesos según tus necesidades.",
    detail: "Soporte 24/7 · Escalado · Mantenimiento",
    duration: "Indefinido",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const iaAutomatizacionesBenefits = [
  "Procesos Automáticos 24/7",
  "Ahorro 40-80% Tiempo",
  "Decisiones Inteligentes Datos",
];

const iaAutomatizacionesWhyImportant = [
  "Las empresas que usan automatización ahorran 25-40% de costos operacionales — tareas repetitivas que tu equipo hace manualmente",
  "Un empleado pasa 30% de su tiempo en tareas administrativas que IA resuelve en minutos — liberar tu equipo tiene ROI inmediato",
  "Procesos automatizados reducen errores humanos en 90% — calidad consistente y clientes más satisfechos sin supervisión",
];

const iaAutomatizacionesFaq = [
  {
    title: "¿Cuáles son los procesos más fáciles de automatizar?",
    desc: "Los mejores candidatos son procesos repetitivos y predecibles: atención al cliente (chatbots), procesamiento de datos, facturación, emails de seguimiento, generación de reportes, validación de formularios. Si tu equipo realiza la misma tarea más de 10 veces/semana, probablemente se puede automatizar.",
  },
  {
    title: "¿La IA puede reemplazar a mi equipo?",
    desc: "No. La IA reemplaza tareas, no personas. Libera a tu equipo de trabajo administrativo repetitivo para que se dedique a decisiones estratégicas, relaciones con clientes, creatividad. El resultado es equipo más productivo y satisfecho, no desempleo.",
  },
  {
    title: "¿Cuánto ahorro de costo voy a tener?",
    desc: "Varía por proceso. Un chatbot reduce 60-70% de respuestas manuales. Automatización de facturación ahorra 20-30 horas/mes. El ROI típico es 2-4 meses: la inversión se amortiza en poco tiempo. Ofrecemos análisis previo de ahorro estimado.",
  },
  {
    title: "¿Qué datos necesitan para entrenar la IA?",
    desc: "Depende del caso. Para chatbots: preguntas frecuentes pasadas. Para análisis: datos históricos del negocio. Para clasificación: ejemplos etiquetados. No necesitas millones de datos. La IA moderna funciona bien incluso con datasets medianos (cientos de registros).",
  },
  {
    title: "¿Es segura la IA con datos sensibles de mi empresa?",
    desc: "Sí, implementamos con máxima privacidad. Los datos se procesan en servidores privados, no en la nube pública. Cumplimos RGPD y normas de protección de datos. Opcionalmente, entrenar IA en servidores propios (on-premise) para máxima seguridad.",
  },
];

const IAAutomatizacionesPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="IA y Automatizaciones"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "IA y Automatizaciones" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementamos <span style='color: #4D32A5;'>IA y Automatizaciones</span>"
          content="Automatiza tus procesos con inteligencia artificial. Reduce tiempos, aumenta eficiencia y ahorra costos operacionales."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={iaAutomatizacionesBenefits}
          whyImportant={iaAutomatizacionesWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de implementar"
        titleHighlight="IA y Automatizaciones?"
        description="La IA multiplica tu productividad sin aumentar costos. Automatiza tareas repetitivas, reduce errores humanos, mejora la experiencia del cliente y libera a tu equipo para trabajo estratégico de alto valor."
        features={iaAutomatizacionesFeatures}
        imageSrc="/assets/img/servicios/ia-automatizaciones.png"
        imageAlt="IA y Automatizaciones"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo Implementaremos"
        titleHighlight="IA y Automatizaciones?"
        description="Proceso probado en más de 80 proyectos. Soluciones inteligentes que transforman tu operación."
        steps={iaAutomatizacionesSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={iaAutomatizacionesFaq} />
    </div>
  );
};

export default IAAutomatizacionesPage;
