import CaseStudy2 from "@/app/Components/CaseStudy/CaseStudy2";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Casos de Estudio"
      ></BreadCumb>
      <CaseStudy2></CaseStudy2>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
