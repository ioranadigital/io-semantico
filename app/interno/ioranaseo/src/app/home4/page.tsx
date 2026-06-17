import React from "react";
import HeroBanner4 from "../Components/HeroBanner/HeroBanner4";
import About1 from "../Components/About/About1";
import Service2 from "../Components/Services/Service2";
import Work2 from "../Components/Work/Work2";
import CaseStudy1 from "../Components/CaseStudy/CaseStudy1";
import Pricing2 from "../Components/Pricing/Pricing2";
import Testimonial4 from "../Components/Testimonial/Testimonial4";
import ContactInfo1 from "../Components/ContactInfo/ContactInfo1";
import Faq4 from "../Components/Faq/Faq4";
import Blog4 from "../Components/Blog/Blog4";

const page = () => {
  return (
    <div>
      <HeroBanner4
        bgimg="/assets/img/bg/hero4-bg.jpg"
        sutitle="Expert Strategies With SeoMax"
        title="Maximize Your ROI with Our Best SEO Solutions"
        shape1="/assets/img/shapes/hero4-shape1.png"
        shpae2="/assets/img/shapes/hero4-shape2.png"
        shpae3="/assets/img/shapes/hero4-shape3.png"
        shpae4="/assets/img/shapes/hero4-shape4.png"
        shpae5="/assets/img/shapes/hero2-shape3.png"
        img="/assets/img/hero/hero4-main-img.png"
      ></HeroBanner4>
      <About1
        img1="/assets/img/about/about1-main-img.png"
        img2="/assets/img/about/about1-shape1.png"
        img3="/assets/img/about/about1-shape2.png"
        subtitle="WHY CHOOSE US"
        title="Business's Potential with A Leading Digital Marketing"
        content="Our team of experienced professionals is dedicated to helping  business achieve higher visibility, increased to traffic, greater."
        FeatureList={[
          "Higher Conversion Rates",
          "Increase Website Traffic",
          "Local Market Dominance",
          "24/7 Promotion",
        ]}
        btnurl="/service"
        btnname="Explore Our Services"
      ></About1>
      <Service2></Service2>
      <Work2></Work2>
      <CaseStudy1></CaseStudy1>
      <Pricing2></Pricing2>
      <Testimonial4></Testimonial4>
      <Faq4></Faq4>
      <Blog4></Blog4>
      <ContactInfo1></ContactInfo1>
    </div>
  );
};

export default page;
