"use client";
import Slider from "react-slick";
import SectionTitle from "../Common/SectionTitle";
import data from "../../Data/casestudy1.json";
import { useRef, FC } from "react";
import Link from "next/link";
import Image from "next/image";

const CaseStudy1: FC = () => {
  const sliderRef = useRef<any>(null);

  const next = () => {
    sliderRef.current!.slickNext();
  };

  const previous = () => {
    sliderRef.current!.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="case1 sp bg1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="heading1">
              <SectionTitle
                SubTitle="casos de estudio"
                Title="Casos de Estudio IoranaSEO"
              ></SectionTitle>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="case1-buttons"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <button onClick={previous} className="testimonial-prev-arrow1">
                <i className="bi bi-arrow-left"></i>
              </button>
              <button onClick={next} className="testimonial-next-arrow1">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="space60"></div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="case1-slider common-space-area"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <Slider ref={sliderRef} {...settings}>
                {data.map((item, i) => (
                  <div key={i} className="single-slider">
                    <div className="image">
                      <Image
                        src={item.img}
                        alt="img"
                        width={412}
                        height={445}
                      />
                    </div>
                    <div className="heading-area">
                      <p>{item.title}</p>
                      <h4>
                        <Link href="/case/case-details">{item.desc}</Link>
                      </h4>
                      <Link href="/case/case-details" className="arrow-right">
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy1;
