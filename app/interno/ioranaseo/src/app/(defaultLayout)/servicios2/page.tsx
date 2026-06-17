import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import FeaturesCardsSection from "@/app/Components/Services/FeaturesCardsSection";
import Work1 from "@/app/Components/Work/Work1";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Nuestros Servicios"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Servicios Digitales"
        title="Potencia tu Presencia Online con Nuestros Servicios SEO"
        content="Te ayudamos a posicionar tu sitio web en Google, aumentar tráfico orgánico y convertir visitantes en clientes con estrategias SEO comprobadas."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <FeaturesCardsSection></FeaturesCardsSection>
      <Work1></Work1>
    </div>
  );
};

export default page;
