import React from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import HeroBannerPlanes from "@/app/Components/HeroBanner/HeroBannerPlanes";
import PricingComparison from "@/app/Components/PricingComparison/PricingComparison";
import AuditoriaGratis from "@/app/Components/AuditoriaGratis/AuditoriaGratis";
import ContactIno3 from "@/app/Components/ContactInfo/ContactIno3";

const ServiciosComparaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Conoce Nuestros Servicios"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Servicios Digitales"
        title="Conoce <span style='color: #4D32A5;'>Nuestros Servicios</span>"
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
