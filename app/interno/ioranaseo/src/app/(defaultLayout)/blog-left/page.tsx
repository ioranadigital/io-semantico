import BlogLeft from "@/app/Components/Blog/BlogLeft";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Blog Izquierda"
      ></BreadCumb>
      <BlogLeft></BlogLeft>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
