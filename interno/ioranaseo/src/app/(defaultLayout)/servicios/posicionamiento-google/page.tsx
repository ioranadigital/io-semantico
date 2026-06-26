export const dynamic = "force-dynamic";
import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesSection from "@/app/Components/FeaturesSection/FeaturesSection";
import NuestroProcesoLocal from "@/app/Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const posicionamientoGoogleBenefits = [
  "Tráfico Orgánico Gratuito",
  "Posicionamiento en Primera Página",
  "Ventaja sobre Competencia",
];

const posicionamientoGoogleWhyImportant = [
  "El 39% del tráfico web proviene de búsqueda orgánica en Google — es el canal de adquisición más relevante después de redes sociales pagadas",
  "El 91.5% de clics en búsquedas van a resultados en la primera página — si no estás en la página 1, prácticamente no existes",
  "El 28% de búsquedas de productos terminan en compra dentro de 1 mes — posicionarse en SEO es inversión a largo plazo con ROI comprobado",
];

const posicionamientoGoogleFaq = [
  {
    title: "¿Cuánto tiempo tarda el SEO para posicionarme en Google?",
    desc: "El SEO no es instantáneo. Generalmente ves resultados iniciales entre 3-6 meses, pero es un proceso continuo. Nuestros clientes típicamente alcanzan la primera página en 6-12 meses dependiendo de la competencia. Los resultados son duraderos: una vez posicionado, el tráfico se mantiene con mantenimiento regular.",
  },
  {
    title: "¿Cuál es la diferencia entre SEO orgánico y Google Ads?",
    desc: "Google Ads te lleva tráfico al instante pero pagas por cada clic. SEO es más lento pero genera tráfico gratuito a largo plazo. Lo ideal es combinar ambos: Ads para resultados inmediatos mientras el SEO trabaja en el posicionamiento duradero. En 6-12 meses, el SEO generalmente reduce los costos de adquisición significativamente.",
  },
  {
    title: "¿Cómo sé que el SEO está funcionando?",
    desc: "Medimos: posición en búsquedas para tus palabras clave objetivo, aumento en tráfico orgánico, clics desde Google, conversiones, y retorno de inversión. Enviamos reportes mensuales con todas estas métricas. Usamos Google Analytics y Search Console para monitoreo en tiempo real.",
  },
  {
    title: "¿Qué pasa si dejo de hacer SEO?",
    desc: "Si dejas el SEO, gradualmente perderás posiciones en Google (típicamente en 3-6 meses). El SEO requiere mantenimiento: actualizar contenido, mantener la autoridad del sitio, adaptarse a cambios de Google. Por eso ofrecemos planes de mantenimiento tras las campañas iniciales.",
  },
  {
    title: "¿Cuál es la diferencia entre SEO Local y SEO general?",
    desc: "SEO Local se enfoca en búsquedas geográficas ('fontanero en Madrid') y es más rápido para negocios con ubicación física. SEO general trabaja para palabras clave a nivel nacional. Para tiendas online o servicios nacionales, recomendamos SEO general. Para negocio local, SEO Local genera mejores resultados.",
  },
];

const PosicionamientoGooglePage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Presencia Digital en Google"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: "Presencia Digital en Google" },
        ]}
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Servicios Digitales"
          title="Presencia Digital en <span style='color: #4D32A5;'>Google</span>"
          content="Posiciona tu negocio en Google y atrae clientes que te están buscando. Estrategias SEO probadas que generan resultados reales."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
          benefits={posicionamientoGoogleBenefits}
          whyImportant={posicionamientoGoogleWhyImportant}
        ></HeroBannerPlanes>
      </div>

      <FeaturesSection
        title="¿Es importante tener"
        titleHighlight="visibilidad en Google?"
        description="Si tu negocio no aparece en los primeros resultados de Google, tus competidores te están llevando los clientes. Nosotros te posicionamos donde te merecen encontrar."
      ></FeaturesSection>

      <NuestroProcesoLocal
        title="Como trabajamos para lograr que tu negocio tenga"
        titleHighlight="visibilidad en google"
        description="Estrategia comprobada en más de 80 empresas. Posicionamiento real, resultados reales."
      ></NuestroProcesoLocal>

      <ContactIno3 faqData={posicionamientoGoogleFaq} />
    </div>
  );
};

export default PosicionamientoGooglePage;
