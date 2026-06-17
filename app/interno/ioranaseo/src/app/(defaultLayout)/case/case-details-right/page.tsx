import CaseDetailsRight from "@/app/Components/CaseDetails/CaseDetailsRight";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Detalles de Casos de Estudio"
      ></BreadCumb>
      <CaseDetailsRight></CaseDetailsRight>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
