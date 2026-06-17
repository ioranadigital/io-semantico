import BreadCumb from "@/app/Components/Common/BreadCumb";
import Services5 from "@/app/Components/Services/Services5";
import FeaturesCardsSection from "@/app/Components/Services/FeaturesCardsSection";
import Work1 from "@/app/Components/Work/Work1";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Nuestros Servicios"
      ></BreadCumb>
      <Services5></Services5>
      <FeaturesCardsSection></FeaturesCardsSection>
      <Work1></Work1>
    </div>
  );
};

export default page;
