import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import Pricing3 from "@/app/Components/Pricing/Pricing3";
import Pricing4 from "@/app/Components/Pricing/Pricing4";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Plan de Precios"
      ></BreadCumb>
      <Pricing3></Pricing3>
      <Pricing4></Pricing4>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
