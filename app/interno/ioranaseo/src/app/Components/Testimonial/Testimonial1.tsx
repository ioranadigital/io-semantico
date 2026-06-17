"use client";
import Slider from "react-slick";
import data from "../../Data/testimonial1.json";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { FC } from "react";

const Testimonial1: FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
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
    <section className="sp tes1">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 col-md-12">
            <div className="heading1">
              <SectionTitle
                SubTitle="Testimonios"
                Title="A los Clientes les Encanta Nuestros Testimonios"
              ></SectionTitle>
            </div>
          </div>
        </div>
      </div>
      <div className="space60"></div>
      <div className="container-fluid px-llg-10">
        <div
          id="testimonial"
          className="testimonial-carousel carousel slide z-index-1"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="row justify-content-center text-center">
            <div className="tes1-all-slider-area">
              <div className="testimonial-box">
                <div className="carousel-inner">
                  <Slider {...settings}>
                    {data.map((item, i) => (
                      <div key={i} className="carousel-item active">
                        <div className="tes1-box-all">
                          <div className="main-img">
                            <Image
                              src={item.img}
                              alt="img"
                              width={290}
                              height={290}
                            />
                          </div>
                          <div className="tes1-box-area">
                            <ul className="stars">
                              <li>
                                <i className="bi bi-star-fill"></i>
                              </li>
                              <li>
                                <i className="bi bi-star-fill"></i>
                              </li>
                              <li>
                                <i className="bi bi-star-fill"></i>
                              </li>
                              <li>
                                <i className="bi bi-star-fill"></i>
                              </li>
                              <li>
                                <i className="bi bi-star-fill"></i>
                              </li>
                            </ul>
                            <p>“{item.desc}”</p>
                            <div className="bottom-heading">
                              <div className="image">
                                <Image
                                  src={item.img}
                                  alt="img"
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <div className="heading1">
                                <h5>
                                  <a href="#">{item.title}</a>
                                </h5>
                                <p>{item.subTitle}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial1;
