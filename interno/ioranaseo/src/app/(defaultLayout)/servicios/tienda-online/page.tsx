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
  ShoppingCart,
  CreditCard,
  TrendingUp,
} from "lucide-react";

const tiendaOnlineFeatures = [
  {
    icon: <ShoppingCart size={32} />,
    title: "Vender Sin Límites Geográficos",
    description:
      "Abre tu mercado más allá de tu ciudad. Vende a cualquier lugar del país o mundo. Una tienda online multiplica tu potencial de clientes exponencialmente.",
  },
  {
    icon: <CreditCard size={32} />,
    title: "Pagos Seguros y Múltiples Opciones",
    description:
      "Integración con las principales pasarelas de pago. Tus clientes compran con confianza usando su método favorito: tarjeta, transferencia, billetera digital.",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Automatización Total de Ventas",
    description:
      "Gestión automática de inventario, pedidos y notificaciones. Mientras duermes, tu tienda sigue vendiendo y enviando confirmaciones a tus clientes.",
  },
];

const tiendaOnlineSteps = [
  {
    num: "01",
    title: "Estrategia Personalizada",
    body: "Catálogo optimizado para vender más · Múltiples pasarelas de pago seguras · Gestión de inventario automática",
    detail: "Catálogo analysis · Segmentación · Roadmap",
    duration: "Semana 1",
    color: "#ff8c00",
    icon: <Search size={32} />,
  },
  {
    num: "02",
    title: "Resultados Rápidos",
    body: "Primeras ventas en semanas · Carrito de compra optimizado para no abandonos · Notificaciones automáticas a clientes",
    detail: "Plataforma setup · Pagos · Integraciones",
    duration: "Semana 2-3",
    color: "#818cf8",
    icon: <Settings size={32} />,
  },
  {
    num: "03",
    title: "Garantía de Ventas",
    body: "Tienda segura certificada SSL · Analytics detallado de cada venta · Margen de ganancia máximo garantizado",
    detail: "UX optimizada · Mobile friendly · Checkout rápido",
    duration: "Semana 4",
    color: "#34d399",
    icon: <FileText size={32} />,
  },
  {
    num: "04",
    title: "Marketing y Promociones",
    body: "Implementamos estrategias de marketing integradas, descuentos, email marketing y programas de fidelización.",
    detail: "Email automation · Descuentos · Referrals",
    duration: "Semana 5",
    color: "#fbbf24",
    icon: <Star size={32} />,
  },
  {
    num: "05",
    title: "Monitorización y Optimización",
    body: "Monitoreamos ventas, comportamiento de usuarios y optimizamos continuamente para maximizar tus ingresos.",
    detail: "Analytics · A/B testing · Reporting mensual",
    duration: "Mensual",
    color: "#f472b6",
    icon: <BarChart3 size={32} />,
  },
];

const tiendaOnlineBenefits = [
  "Vender Online 24/7",
  "Pagos Seguros Automáticos",
  "Más Ingresos sin Límites",
];

const tiendaOnlineWhyImportant = [
  "El 87% de compradores compara precios en múltiples tiendas antes de comprar — estar online significa competencia directa con los mejores precios",
  "El 70% del carrito abandonado se debe a checkout complicado o no inspirar confianza — simplificar el proceso aumenta conversiones hasta 35%",
  "Las transacciones e-commerce crecen 15-20% anual globalmente — no vender online es dejar dinero sobre la mesa a la competencia",
];

const tiendaOnlineFaq = [
  {
    title: "¿Qué plataformas de pago integran?",
    desc: "Integramos las principales: Stripe, PayPal, redsys, Bizum, transferencia bancaria, y billeteras digitales. Los clientes eligen su método favorito. Todas están certificadas PCI-DSS para máxima seguridad. Recibes el dinero en tu cuenta en 24-48 horas.",
  },
  {
    title: "¿Pueden migrar mi catálogo de productos actual?",
    desc: "Sí, migramos tu inventario completo desde Excel, Shopify, WooCommerce o cualquier plataforma. Incluye imágenes, descripciones, precios e inventario. Si no tienes los datos organizados, te ayudamos a estructurarlos. Cero productos perdidos en la migración.",
  },
  {
    title: "¿Está incluido el mantenimiento y actualización?",
    desc: "Sí. En el plan base incluimos actualizaciones de seguridad, backups automáticos y soporte técnico. Las actualizaciones de productos las haces tú mismo desde el panel. Si necesitas cambios en el diseño o funcionalidad, ofrecemos planes de mantenimiento mensual desde €50.",
  },
  {
    title: "¿Cómo manejo el inventario?",
    desc: "Panel de inventario automático: bajas stock cuando vendes, subes cuando compras. Configuramos alertas cuando quedan pocas unidades. Se sincroniza en tiempo real con la tienda. También puedes importar cambios masivos de inventario vía Excel.",
  },
  {
    title: "¿Cuánto tiempo tarda la tienda en estar vendiendo?",
    desc: "Típicamente 4-6 semanas: migración de catálogo, integración de pagos, diseño y pruebas. Las tiendas simples (50-100 productos) están listas en 3 semanas. Hacemos pruebas exhaustivas de pagos, carrito y envíos antes del lanzamiento para que todo funcione perfecto.",
  },
];

const TiendaOnlinePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Tienda Online"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Tienda Online" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Tienda Online : <span style='color: #4D32A5;'>E-Commerce</span>"
          content="Plataformas de e-commerce seguras y escalables. Vende productos online y multiplica tus ingresos con nuestra solución integral."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={tiendaOnlineBenefits}
          whyImportant={tiendaOnlineWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Cuáles son las ventajas de tener una"
        titleHighlight="Tienda Online?"
        description="Vender online multiplica tus ingresos sin límites geográficos. Alcanza clientes 24/7, reduce costos operacionales y escala tu negocio exponencialmente. El comercio electrónico es el presente del negocio."
        features={tiendaOnlineFeatures}
        imageSrc="/assets/img/tienda-online-450.jpg"
        imageAlt="Mujer gestionando tienda online"
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Así Creamos tu"
        titleHighlight="Tienda Online"
        description="Proceso probado en más de 80 e-commerce. Venta segura, pagos integrados y máximas conversiones."
        steps={tiendaOnlineSteps}
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={tiendaOnlineFaq} />
    </div>
  );
};

export default TiendaOnlinePage;
