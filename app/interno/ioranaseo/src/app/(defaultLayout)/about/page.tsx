import About1 from "@/app/Components/About/About1";
import About4 from "@/app/Components/About/About4";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import Skill from "@/app/Components/Skill/Skill";
import Team2 from "@/app/Components/Team/Team2";
import Testimonial1 from "@/app/Components/Testimonial/Testimonial1";
import Work5 from "@/app/Components/Work/Work5";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Sobre IoranaSEO"
      ></BreadCumb>
      <About1
        img1="/assets/img/about/about1-main-img.png"
        img2="/assets/img/about/about1-shape1.png"
        img3="/assets/img/about/about1-shape2.png"
        subtitle="POR QUÉ ELEGIRNOS"
        title="Potencial de tu Negocio con Marketing Digital Lider"
        content="Nuestro equipo de profesionales experimentados se dedica a ayudar a tu negocio a alcanzar mayor visibilidad, aumento de tráfico, mayor."
        FeatureList={[
          "Tasas de Conversión Más Altas",
          "Aumentar Tráfico del Sitio Web",
          "Dominio del Mercado Local",
          "Promoción 24/7",
        ]}
        btnurl="/service"
        btnname="Explora Nuestros Servicios"
      ></About1>
      <About4
        subtitle="Sobre Nosotros"
        title="Experimenta el Poder de un SEO Estratégico y Digital"
        content="Nuestro equipo de profesionales experimentados se dedica a ayudar a los negocios a lograr mayor visibilidad, más tráfico, mayor impacto."
        list1="Marketing SEO"
        list2="Análisis SEO"
        img1="/assets/img/about/about2-main-img.png"
        img2="/assets/img/about/about1-shape1.png"
        img3="/assets/img/about/about1-shape2.png"
      ></About4>
      <Skill></Skill>
      <Work5></Work5>
      <Team2></Team2>
      <Testimonial1></Testimonial1>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
