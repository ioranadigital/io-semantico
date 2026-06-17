import Blog2 from "@/app/Components/Blog/Blog2";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Grid de Blog"
      ></BreadCumb>
      <Blog2></Blog2>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
