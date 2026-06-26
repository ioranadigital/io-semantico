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
  MessageCircle,
  Zap,
  Brain,
} from "lucide-react";

const notificacionesWhatsappFeatures = [
  {
    icon: <MessageCircle size={32} />,
    title: "Comunicación Directa con 98% de Apertura",
    description:
      "WhatsApp llega donde email no lo hace. 98% de mensajes abiertos en minutos. Tus clientes leen y responden instantáneamente. Canal de comunicación que funciona como nada antes ha funcionado.",
  },
  {
    icon: <Zap size={32} />,
    title: "Automatización que Vende Sin Parar",
    description:
      "Confirmaciones automáticas, recordatorios de reserva, actualizaciones de pedidos. Chatbot responde preguntas frecuentes 24/7. Clientes satisfechos sin tocar un dedo. Sistema que trabaja mientras duermes.",
  },
  {
    icon: <Brain size={32} />,
    title: "IA Inteligente que Califica Leads",
    description:
      "Chatbot con IA que entiende intención del cliente. Califica leads automáticamente antes que tu equipo. Escala preguntas complejas a humano. Eficiencia máxima, conversión garantizada, sin pérdida de oportunidades.",
  },
];

const notificacionesWhatsappSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Canal de comunicación directo con clientes · Número verificado listo para operar · Integración con tus sistemas",
    detail: "Cuenta setup · Número verificado · API access",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Tasa de apertura de 98% de mensajes · Aumenta ventas en 30-40% · Respuestas automáticas 24/7",
    detail: "API integration · Webhooks · Testing",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Engagement",
    body: "Clientes conectados constantemente · Chatbot inteligente operando · Métricas de conversación detalladas",
    detail: "Flujos · Mensajes · Plantillas",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Chatbot Inteligente",
    body: "Implementamos chatbot con IA que responde preguntas frecuentes y cualifica leads 24/7.",
    detail: "Chatbot setup · IA responses · Escalonamiento",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Monitoreo y Optimización",
    body: "Monitoreamos tasas de entrega, respuesta y optimizamos mensajes para máximo engagement.",
    detail: "Analytics · A/B testing · Optimization",
    duration: "Diario",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const notificacionesWhatsappBenefits = [
  "98% Apertura Mensajes",
  "Chatbot IA 24/7",
  "Ventas Automáticas Siempre",
];

const notificacionesWhatsappWhyImportant = [
  "WhatsApp tiene 2 billones de usuarios y 98% de apertura de mensajes — 40x más efectivo que email (4% apertura)",
  "El 68% de clientes prefiere comunicarse con marcas por WhatsApp — es donde tu audiencia QUIERE hablar contigo",
  "Las empresas ganan 25-35% más con WhatsApp Business — automatización de notificaciones aumenta lealtad y ventas",
];

const notificacionesWhatsappFaq = [
  {
    title: "¿Es legal usar WhatsApp para marketing?",
    desc: "Sí, con condiciones. Necesitas consentimiento previo del cliente. No puedes enviar spam. WhatsApp Business está diseñado para esto: notificaciones, confirmaciones, recordatorios. El spamming viola términos y bloquean tu cuenta. Usamos best practices: mensajes relevantes, opción unsubscribe.",
  },
  {
    title: "¿Cómo consigo los números de mis clientes?",
    desc: "Los clientes dan números al comprar, registrarse o solicitar. También puedes pedir explícitamente: 'Deseas recibir notificaciones por WhatsApp? Sí/No'. Importante: consentimiento = legal. Números obtenidos sin consentimiento = bloqueo de cuenta.",
  },
  {
    title: "¿Cuánto cuesta implementar WhatsApp Business?",
    desc: "La aplicación de WhatsApp es gratis. El costo está en API: €0.06-0.12 por mensaje saliente. Si envías 10,000/mes = €600-1,200/mes. Chatbot con IA: €500-1,000/mes. Total típico: €500-2,000/mes según volumen. ROI positivo inmediato: aumenta ventas 25-35%.",
  },
  {
    title: "¿Pueden responder los clientes automáticamente?",
    desc: "Sí. Configuramos flujos: cliente escribe → chatbot entiende → responde automático o escala a humano. IA clasificar preguntas simples (estado pedido) vs complejas (reclamos). Así evitas perder chats y cliente siempre tiene respuesta.",
  },
  {
    title: "¿Qué métricas puedo medir?",
    desc: "Mensajes enviados, tasa de entrega, tasa de lectura, tasa de respuesta, tiempo promedio de respuesta, conversiones generadas. Reportes en tiempo real en dashboard. Así ves qué funciona: horario, tipo mensaje, contenido. Optimizas basado en datos.",
  },
];

const NotificacionesWhatsappPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Notificaciones WhatsApp"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Notificaciones WhatsApp" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementa <span style='color: #4D32A5;'>Notificaciones WhatsApp</span>"
          content="Comunica con tus clientes directamente por WhatsApp. Automatiza mensajes y aumenta la interacción con tu audiencia."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={notificacionesWhatsappBenefits}
          whyImportant={notificacionesWhatsappWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de"
        titleHighlight="Notificaciones WhatsApp?"
        description="WhatsApp es el canal más directo con tus clientes con 98% de tasa de apertura. Notificaciones automáticas mejoran experiencia, aumentan conversiones y crean una relación cercana con tu audiencia."
        features={notificacionesWhatsappFeatures}
        imageSrc="/assets/img/servicios/whatsapp-notificaciones.png"
        imageAlt="Notificaciones WhatsApp"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cómo implementaremos el sistema de"
        titleHighlight="Notificaciones de Whatsapp?"
        description="Proceso probado en más de 80 proyectos. Sistema de notificaciones que conecta con tus clientes."
        steps={notificacionesWhatsappSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={notificacionesWhatsappFaq} />
    </div>
  );
};

export default NotificacionesWhatsappPage;
