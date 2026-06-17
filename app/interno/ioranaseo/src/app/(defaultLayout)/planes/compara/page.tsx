import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import PricingComparison from "../../../Components/PricingComparison/PricingComparison";
import AuditoriaGratis from "../../../Components/AuditoriaGratis/AuditoriaGratis";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";

const ComparaPlanesPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Compara los Planes"
      ></BreadCumb>

      <HeroBannerPlanes
        subtitle="Planes y Precios"
        title="Compara los Planes"
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
