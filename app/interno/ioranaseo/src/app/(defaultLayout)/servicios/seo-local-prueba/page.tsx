import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import NuestroProcesoLocal from "../../../Components/NuestroProcesoLocal/NuestroProcesoLocal";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";

const SeoLocalPruebaPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="SEO Local Prueba"
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Planes y Precios"
          title="Servicio SEO Local"
          content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
          img="/assets/img/hero/hero3-main-img.png"
          showImage={false}
        ></HeroBannerPlanes>
      </div>

      <NuestroProcesoLocal></NuestroProcesoLocal>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default SeoLocalPruebaPage;
