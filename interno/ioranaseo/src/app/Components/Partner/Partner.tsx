"use client";
import { OptimizedImage } from "@/components";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import { FC } from "react";

const Partner: FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 5,
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
    <div className="about-team-brands service-details">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 brands-bg text-center">
            <div className="heading">
              <p>10K Confiado por Principales Empresas</p>
            </div>
            <div className="team-logo-slider owl-carousel">
              <Slider {...settings}>
                <div className="single-logo">
                  <OptimizedImage
                    src="/assets/img/logo/about-team-logo1.png"
                    alt="img"
                    width={120}
                    height={40}
                  />
                </div>
                <div className="single-logo">
                  <OptimizedImage
                    src="/assets/img/logo/about-team-logo2.png"
                    alt="img"
                    width={120}
                    height={40}
                  />
                </div>
                <div className="single-logo">
                  <OptimizedImage
                    src="/assets/img/logo/about-team-logo3.png"
                    alt="img"
                    width={120}
                    height={40}
                  />
                </div>
                <div className="single-logo">
                  <OptimizedImage
                    src="/assets/img/logo/about-team-logo4.png"
                    alt="img"
                    width={120}
                    height={40}
                  />
                </div>
                <div className="single-logo">
                  <OptimizedImage
                    src="/assets/img/logo/about-team-logo5.png"
                    alt="img"
                    width={120}
                    height={40}
                  />
                </div>
                <div className="single-logo">
                  <OptimizedImage
                    src="/assets/img/logo/about-team-logo1.png"
                    alt="img"
                    width={120}
                    height={40}
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
