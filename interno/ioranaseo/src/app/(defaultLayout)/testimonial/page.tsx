export const dynamic = "force-dynamic";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import Testimonial5 from "@/app/Components/Testimonial/Testimonial5";
import Testimonial6 from "@/app/Components/Testimonial/Testimonial6";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Testimonios"
      ></BreadCumb>
      <Testimonial5></Testimonial5>
      <Testimonial6></Testimonial6>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
