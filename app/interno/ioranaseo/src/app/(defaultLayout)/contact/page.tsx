import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import ContactInfo7 from "@/app/Components/ContactInfo/ContactInfo7";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Contacto"
      ></BreadCumb>
      <ContactInfo7></ContactInfo7>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
