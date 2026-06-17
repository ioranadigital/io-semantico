import React from "react";
import BreadCumb from "../../../Components/Common/BreadCumb";
import HeroBannerPlanes from "../../../Components/HeroBanner/HeroBannerPlanes";
import PymesProcess from "../../../Components/PymesProcess";
import Faq1 from "../../../Components/Faq/Faq1";
import ContactIno3 from "../../../Components/ContactInfo/ContactIno3";

const SeoLocalPage = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="SEO Local"
      ></BreadCumb>

      <div style={{ fontSize: "0.85em" }} className="ficha-hero">
        <HeroBannerPlanes
          subtitle="Planes y Precios"
          title="Servicio SEO Local"
          content="Nuestros planes están diseñados para adaptarse a las necesidades de tu empresa, desde startups hasta grandes corporaciones."
          img="/assets/img/hero/hero3-main-img.png"
        ></HeroBannerPlanes>
      </div>

      <PymesProcess></PymesProcess>

      <Faq1></Faq1>

      <ContactIno3></ContactIno3>
    </div>
  );
};

export default SeoLocalPage;
