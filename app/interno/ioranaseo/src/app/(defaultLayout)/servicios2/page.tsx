import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import PricingComparison from "../../../Components/PricingComparison/PricingComparison";
import AuditoriaGratis from "../../../Components/AuditoriaGratis/AuditoriaGratis";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";

const ServiciosComparaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Compara Nuestros Servicios"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Servicios Digitales"
        title="Compara Nuestros Servicios"
        content="Encuentra el servicio que mejor se adapte a tu negocio y tus necesidades específicas de marketing digital."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <PricingComparison></PricingComparison>

      <AuditoriaGratis></AuditoriaGratis>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ServiciosComparaPage;
