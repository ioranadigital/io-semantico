import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import PricingComparison from "../../../Components/PricingComparison/PricingComparison";
import AuditoriaGratis from "../../../Components/AuditoriaGratis/AuditoriaGratis";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";

const ComparaPlanesPage = () => {
  return (
    <div style={{ backgroundColor: "#F5F6FF" }}>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Compara Nuestros Planes"
        breadcrumbBgColor="#F5F6FF"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Planes y Precios"
        title="Compara <span style='color: #4D32A5;'>Nuestros Planes</span>"
        content="Encuentra el plan que mejor se adapte a tu negocio y tus necesidades específicas."
        img="/assets/img/hero/hero3-main-img.png"
      ></HeroBannerPlanes>

      <PricingComparison></PricingComparison>

      <AuditoriaGratis></AuditoriaGratis>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default ComparaPlanesPage;
