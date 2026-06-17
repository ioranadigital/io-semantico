import React from "react";
import HeroBanner3 from "../Components/HeroBanner/HeroBanner3";
import About3 from "../Components/About/About3";
import Service3 from "../Components/Services/Service3";
import Work3 from "../Components/Work/Work3";
import CaseStudy2 from "../Components/CaseStudy/CaseStudy2";
import Pricing3 from "../Components/Pricing/Pricing3";
import Testimonial3 from "../Components/Testimonial/Testimonial3";
import Faq1 from "../Components/Faq/Faq1";
import Blog2 from "../Components/Blog/Blog2";
import ContactIno3 from "../Components/ContactInfo/ContactIno3";

const page = () => {
  return (
    <div>
      <HeroBanner3
        subtitle="Expert Strategies With SeoMax"
        title="The Best Digital Of Marketing Agency"
        content="Our dedicated team of SEO professionals committed <br> to driving targeted traffic to your website, increasing."
        img1="/assets/img/shapes/hero3-shape1.png"
        img2="/assets/img/shapes/hero3-shape2.png"
        img3="/assets/img/hero/hero3-mobile-main.png"
        img4="/assets/img/hero/hero3-main-img.png"
      ></HeroBanner3>
      <About3
        subtitle="About Company"
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
      ></About3>
      <Service3></Service3>
      <Work3></Work3>
      <CaseStudy2></CaseStudy2>
      <Pricing3></Pricing3>
      <Testimonial3></Testimonial3>
      <Faq1></Faq1>
      <Blog2></Blog2>
      <ContactIno3></ContactIno3>
    </div>
  );
};

export default page;
