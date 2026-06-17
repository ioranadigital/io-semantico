import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";
import Work3 from "../../../Components/Work/Work3";
import Service3 from "../../../Components/Services/Service3";
import Faq1 from "../../../Components/Faq/Faq1";

const PlanesInicio = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Plan Inicial"
        title="Apúntate a Nuestro<br/><span style='color: #4D32A5;'>Plan Inicial</span>"
        content="Aparece más en búsquedas locales, gana visibilidad online y atrae más clientes desde una única plataforma con el respaldo de nuestros expertos"
        img="/assets/img/hero/hero3-main-img.png"
        showBreadcrumb={false}
      ></HeroBannerPlanes>

      <Work3
        title="¿Por qué elegir Plan Inicial?"
        customImage="/assets/img/work/hombre-mujer-empreendedores-online.jpg"
        customImageWidth={505}
        customImageHeight={498}
      ></Work3>

      <Service3></Service3>

      <Faq1></Faq1>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PlanesInicio;
