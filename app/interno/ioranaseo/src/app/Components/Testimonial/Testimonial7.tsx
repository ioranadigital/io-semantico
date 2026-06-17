"use client";
import { useRef, FC } from "react";
import Slider from "react-slick";
import data from "../../Data/testimonial2.json";
import Image from "next/image";

const Testimonial7: FC = () => {
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
    <div className="tes5 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading5">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <Image
                    src="/assets/img/logo/span5.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />{" "}
                  Testimonial
                </span>
              </p>
              <h2 className="text-anime-style-3">Customer Success Stories</h2>
            </div>
          </div>
        </div>
        <div className="space60"></div>
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div
              className="testimonial7-all"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <div className="tes7-slider">
                <Slider ref={sliderRef} {...settings}>
                  {data.map((item, i) => (
                    <div key={i} className="swiper-slide">
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
                <div onClick={previous} className="testimonial7-prev-arrow">
                  <button>
                    <i className="bi bi-chevron-up"></i>
                  </button>
                </div>
                <div onClick={next} className="testimonial7-next-arrow">
                  <button>
                    <i className="bi bi-chevron-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="iamge-slider">
              <div className="image">
                <Image
                  src="/assets/img/testimonial/tes5-img.png"
                  alt="img"
                  width={385}
                  height={396}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial7;
