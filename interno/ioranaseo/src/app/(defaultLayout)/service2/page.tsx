export const dynamic = "force-dynamic";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import Service3 from "@/app/Components/Services/Service3";
import Skill from "@/app/Components/Skill/Skill";
import Work1 from "@/app/Components/Work/Work1";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Nuestros Servicios"
      ></BreadCumb>
      <Service3></Service3>
      <Skill></Skill>
      <Work1></Work1>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
