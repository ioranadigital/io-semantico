import React from "react";
import HeroBanner2 from "../Components/HeroBanner/HeroBanner2";
import About1 from "../Components/About/About1";
import Service2 from "../Components/Services/Service2";
import Work2 from "../Components/Work/Work2";
import CaseStudy1 from "../Components/CaseStudy/CaseStudy1";
import Pricing2 from "../Components/Pricing/Pricing2";
import Testimonial2 from "../Components/Testimonial/Testimonial2";
import Team1 from "../Components/Team/Team1";
import Blog1 from "../Components/Blog/Blog1";
import ContactInfo2 from "../Components/ContactInfo/ContactInfo2";

const page = () => {
  return (
    <div>
      <HeroBanner2
        subtitle="Expert Strategies With SeoMax"
        title="The Best Digital Of Marketing Agency"
        content="Our dedicated team of SEO professionals committed <br> to driving targeted traffic to your website, increasing."
        shape1="/assets/img/shapes/hero2-shape1.png"
        shape2="/assets/img/shapes/hero2-shape2.png"
        shape3="/assets/img/shapes/hero2-shape3.png"
        img1="/assets/img/hero/hero2-main-image.png"
        img2="/assets/img/shapes/hero2-left-shape.png"
      ></HeroBanner2>
      <About1
        img1="/assets/img/about/about2-main-img.png"
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
      <Testimonial2></Testimonial2>
      <Team1></Team1>
      <Blog1></Blog1>
      <ContactInfo2></ContactInfo2>
    </div>
  );
};

export default page;
