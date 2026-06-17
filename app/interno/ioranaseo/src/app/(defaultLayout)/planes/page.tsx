import React from "react";
import BreadCumb from "../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../Components/HeroBanner/HeroBannerPlanes";
import Pricing3 from "../../Components/Pricing/Pricing3";
import ContactIno3 from "../../Components/ContactInfo/ContactIno3";

const PlanesPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Planes y Precios"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Planes y Precios"
        title="Elige el Plan Perfecto para tu Negocio"
        content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <Pricing3></Pricing3>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default PlanesPage;
