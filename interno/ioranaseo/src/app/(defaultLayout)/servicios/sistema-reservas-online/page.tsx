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
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";

const sistemaReservasOnlineFeatures = [
  {
    icon: <Calendar size={32} />,
    title: "Reservas 24/7 Sin Intervención Manual",
    description:
      "Clientes reservan cuando quieren, sin llamar. App o web que funciona mientras duermes. Calendario sincronizado automáticamente. Cero gestión manual de citas, cero errores de dobles reservas.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Máxima Ocupación Garantizada",
    description:
      "Reduce no-shows hasta 90% con recordatorios automáticos. Sistema inteligente que rellena huecos disponibles. Utilización de capacidad aumenta 40-60%. Ingresos suben sin vender más.",
  },
  {
    icon: <Clock size={32} />,
    title: "Ahorro de Tiempo Administrativo Masivo",
    description:
      "Termina con gestión manual de citas. Confirmaciones automáticas, recordatorios, pagos integrados. Tu equipo se enfoca en servicio, no en agenda. Ahorro de 10+ horas semanales garantizado.",
  },
];

const sistemaReservasOnlineSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Calendario sincronizado automáticamente · Servicios y horarios configurados · Reglas de reserva inteligentes",
    detail: "Servicios setup · Horarios · Reglas",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Reservas online en segundos desde app o web · Pagos seguros integrados · Notificaciones automáticas a clientes",
    detail: "Plataforma setup · Calendario · Confirmación",
    duration: "Semana 2",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Ocupación",
    body: "Reducción de no-shows hasta 90% · Análisis de ocupación en tiempo real · Máxima utilización de tu capacidad",
    detail: "Pagos setup · Gateways · Seguridad",
    duration: "Semana 3",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Notificaciones Automáticas",
    body: "Implementamos notificaciones por email y SMS para confirmación, recordatorio y seguimiento post-reserva.",
    detail: "Email setup · SMS · Recordatorios",
    duration: "Semana 4",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Analytics y Mejora",
    body: "Monitoreamos tasa de reservas, no-shows y optimizamos sistema para maximizar utilización de tu capacidad.",
    detail: "Analytics · No-show tracking · Optimización",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const sistemaReservasOnlineBenefits = [
  "Reservas 24/7 Automáticas",
  "Reduce No-Shows 90%",
  "Ocupación Máxima Garantizada",
];

const sistemaReservasOnlineWhyImportant = [
  "El 47% de usuarios abandona negocio si no puede reservar online — falta de comodidad es perdida directa de clientes",
  "Recordatorios automáticos reducen no-shows 75-90% — cada no-show es dinero perdido que recordatorios evitan",
  "Empresas con reservas online ocupan 40-60% más de su capacidad — maximizar utilización sin costo adicional",
];

const sistemaReservasOnlineFaq = [
  {
    title: "¿Puedo integrar el sistema con mi calendario actual?",
    desc: "Sí. Sincronizamos con Google Calendar, Outlook, Apple Calendar. Tus reservas aparecen automáticamente en tu calendario personal. Si usas otro sistema (agenda papel), migramos manualmente. Sincronización bidireccional: cambio en web = cambio en tu calendario.",
  },
  {
    title: "¿Qué pasa si un cliente cancela o reschedulea?",
    desc: "Automático. Cliente cancela online → horario se libera → otro cliente puede reservar. Si es última hora, automáticamente notificamos a lista de espera (si la hay). Reembolso automático según políticas. Cero trabajo manual, todo fluye solo.",
  },
  {
    title: "¿Cuánto cuesta un sistema de reservas?",
    desc: "Plataforma básica: €50-150/mes (hasta 100 reservas/mes). Intermedia: €200-400/mes (hasta 1,000 reservas). Enterprise: €500+/mes (ilimitado). Incluye: calendario, notificaciones, pagos integrados, reportes. Implementación: €500-2,000 una sola vez.",
  },
  {
    title: "¿Los clientes pagan online para reservar?",
    desc: "Opcional. Puedes requerir depósito (30-50% del servicio) para confirmar, o gratis si confías. Si requieres prepago: Stripe, PayPal, Redsys integrados. Si es gratis: cliente solo completa formulario. Flexibilidad total según tu negocio.",
  },
  {
    title: "¿Puedo tener múltiples servicios con precios distintos?",
    desc: "Sí, claro. Corte cabello €25, tinte €40, tratamiento €60. Cada uno con duración distinta, personal asignado, precio. Sistema automáticamente calcula disponibilidad según duración. Cliente elige servicio → elige hora → paga → listo.",
  },
];

const SistemaReservasOnlinePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Reservas Online"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Reservas Online" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Implementa un Sistema de <span style='color: #4D32A5;'>Reservas Online</span>"
          content="Sistema de reservas y citas online para tu negocio. Facilita que tus clientes reserven sin necesidad de llamadas."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={sistemaReservasOnlineBenefits}
          whyImportant={sistemaReservasOnlineWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de un"
        titleHighlight="Sistema de Reservas Online?"
        description="Un sistema de reservas automatizado reduce carga administrativa, mejora experiencia del cliente, aumenta ingresos y permite que tus clientes reserven 24/7 sin intervención manual. Eficiencia y conveniencia total."
        features={sistemaReservasOnlineFeatures}
        imageSrc="/assets/img/servicios/reservas-online.png"
        imageAlt="Sistema de Reservas Online"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="¿Cual es la metodologia para implementar tu sistema de"
        titleHighlight="Reservas Online?"
        description="Proceso probado en más de 80 proyectos. Sistema de reservas que gestiona automáticamente tus citas."
        steps={sistemaReservasOnlineSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={sistemaReservasOnlineFaq} />
    </div>
  );
};

export default SistemaReservasOnlinePage;
