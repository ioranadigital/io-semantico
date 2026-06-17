import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import Faq1 from "@/app/Components/Faq/Faq1";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Preguntas Frecuentes"
      ></BreadCumb>
      <Faq1></Faq1>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
