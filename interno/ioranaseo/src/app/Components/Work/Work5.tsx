"use client";
import { useEffect, FC } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import { OptimizedImage } from "@/components";

const Work5: FC = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

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
          slidesToShow: 3,
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
    <div>
      <div
        className="about-team"
        data-background="/assets/img/bg/about-team-bg.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto text-center">
              <div className="heading1-w">
                <p className="title">
                  {" "}
                  <span className="span">
                    <OptimizedImage
                      src="/assets/img/icons/span1-w.svg"
                      alt="img"
                      width={20}
                      height={20}
                    />
                    Nuestro equipo de expertos
                  </span>
                </p>
                <h2>Expertos en Marketing en Redes Sociales</h2>
              </div>
            </div>
          </div>
          <OptimizedImage
            src="/assets/img/team/about-team-main.png"
            alt="Team main image"
            width={1200}
            height={600}
            className="main-img"
          />
        </div>
      </div>
      <div className="about-team-brands">
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
                      alt="img1"
                      width={120}
                      height={40}
                    />
                  </div>
                  <div className="single-logo">
                    <OptimizedImage
                      src="/assets/img/logo/about-team-logo2.png"
                      alt="img1"
                      width={120}
                      height={40}
                    />
                  </div>
                  <div className="single-logo">
                    <OptimizedImage
                      src="/assets/img/logo/about-team-logo3.png"
                      alt="img1"
                      width={120}
                      height={40}
                    />
                  </div>
                  <div className="single-logo">
                    <OptimizedImage
                      src="/assets/img/logo/about-team-logo1.png"
                      alt="img1"
                      width={120}
                      height={40}
                    />
                  </div>
                  <div className="single-logo">
                    <OptimizedImage
                      src="/assets/img/logo/about-team-logo2.png"
                      alt="img1"
                      width={120}
                      height={40}
                    />
                  </div>
                  <div className="single-logo">
                    <OptimizedImage
                      src="/assets/img/logo/about-team-logo3.png"
                      alt="img1"
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
    </div>
  );
};

export default Work5;
