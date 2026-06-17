import React from "react";
import HeroBanner5 from "../Components/HeroBanner/HeroBanner5";
import About5 from "../Components/About/About5";
import Services4 from "../Components/Services/Services4";
import Work4 from "../Components/Work/Work4";
import ContactIno3 from "../Components/ContactInfo/ContactIno3";
import Pricing5 from "../Components/Pricing/Pricing5";
import Blog5 from "../Components/Blog/Blog5";
import Testimonial7 from "../Components/Testimonial/Testimonial7";

const page = () => {
  return (
    <div>
      <HeroBanner5
        subtitle="Expert Strategies With SeoMax"
        title="The Best Digital Of Marketing Agency"
        content="Our dedicated team of SEO professionals committed <br> to driving targeted traffic to your website, increasing."
        img1="/assets/img/hero/hero5-img1.png"
        img2="/assets/img/hero/hero5-img2.png"
        shape1="/assets/img/shapes/hero5-shape1.png"
        shape2="/assets/img/shapes/hero5-shape2.png"
        shape3="/assets/img/shapes/hero5-shape2.png"
      ></HeroBanner5>
      <About5
        shape="/assets/img/shapes/about1-bg-shape.png"
        img1="/assets/img/about/about5-img1.png"
        img2="/assets/img/about/about5-img2.png"
        subtitle="WHY CHOOSE US"
        title="Business's Potential with A Leading Digital Marketing"
        content="Our team of experienced professionals is dedicated to helping <br> business achieve higher visibility, increased to traffic, greater."
        FeatureList={[
          "Higher Conversion Rates",
          "Increase Website Traffic",
          "Local Market Dominance",
          "24/7 Promotion",
        ]}
        btnname="Explore Our Services"
        btnurl="/service"
      ></About5>
      <Services4></Services4>
      <Work4></Work4>
      <Pricing5></Pricing5>
      <Testimonial7></Testimonial7>
      <Blog5></Blog5>
      <ContactIno3></ContactIno3>
    </div>
  );
};

export default page;
