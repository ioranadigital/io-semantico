"use client";
import Slider from "react-slick";
import SectionTitle2 from "../Common/SectionTitle2";
import data from "../../Data/testimonial2.json";
import { useRef, FC } from "react";
import Image from "next/image";

const Testimonial3: FC = () => {
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
    <div className="tes3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading3">
              <SectionTitle2
                SubTitle="Testimonial"
                Title="Client Loved Our Testimonial"
              ></SectionTitle2>
            </div>
          </div>
        </div>
        <div className="space60"></div>
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div
              className="main-image"
              data-aos="fade-up"
              data-aos-duration="700"
            >
              <Image
                src="/assets/img/testimonial/tes3-image.png"
                alt="img"
                width={365}
                height={325}
              />
            </div>
          </div>

          <div className="col-lg-7">
            <div
              className="testimonial7-all"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div className="tes3-slider">
                <Slider ref={sliderRef} {...settings}>
                  {data.map((item, i) => (
                    <div key={i} className="slide">
                      <div className="testimonials-box-2">
                        <div className="star">
                          <ul>
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
                        </div>
                        <p className="text">{item.desc}</p>
                        <div className="bottom">
                          <div className="info">
                            <div className="image">
                              <Image
                                src={item.img}
                                alt="img"
                                width={61}
                                height={61}
                              />
                            </div>
                            <div className="content">
                              <h6 className="name">
                                <a href="#">{item.title}</a>
                              </h6>
                              <p className="position">{item.subTitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="pagination-buttons">
                <div onClick={previous} className="testimonial3-prev-arrow">
                  <button>
                    <i className="bi bi-arrow-up"></i>
                  </button>
                </div>
                <div onClick={next} className="testimonial3-next-arrow">
                  <button>
                    <i className="bi bi-arrow-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial3;
