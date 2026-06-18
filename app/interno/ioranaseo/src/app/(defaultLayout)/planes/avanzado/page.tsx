import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";
import Work3 from "../../../Components/Work/Work3";
import Service3 from "../../../Components/Services/Service3";

const AvanzadoPage = () => {
  return (
    <div style={{ backgroundColor: "#F5F6FF" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
        breadcrumbBgColor="#F5F6FF"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Plan Avanzado"
        title="Elige el Plan Perfecto para tu Negocio"
        content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <Work3
        title="Elige el Plan Avanzado"
        customImage="/assets/img/work/hombre-mujer-empreendedores-online.jpg"
        customImageWidth={505}
        customImageHeight={498}
      ></Work3>

      <Service3></Service3>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default AvanzadoPage;
