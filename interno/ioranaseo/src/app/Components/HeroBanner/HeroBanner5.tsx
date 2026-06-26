"use client";
import parse from "html-react-parser";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface HeroBanner5Props {
  subtitle: string;
  title: string;
  content: string;
  img1: string;
  img2: string;
  shape1: string;
  shape2: string;
  shape3: string;
}

const HeroBanner5: FC<HeroBanner5Props> = ({
  subtitle,
  title,
  content,
  img1,
  img2,
  shape1,
  shape2,
  shape3,
}) => {
  return (
    <div className="hero5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="main-heading">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/logo/span5.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  {subtitle}
                </span>
              </p>
              <h1 className="text-anime-style-3">{title} </h1>
              <div className="space20"></div>
              <p data-aos="fade-right" data-aos-duration="800">
                {parse(content)}
              </p>
              <div
                className="form-area"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <form action="#">
                  <input type="email" placeholder="Your Web URL" />
                  <div className="form-btn">
                    <button type="submit" className="theme-btn3">
                      Analyze Website{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="main-images">
              <div className="image1">
                <OptimizedImage src={img1} alt="img" width={471} height={472} />
              </div>
              <div className="image2 round-circle">
                <OptimizedImage src={img2} alt="img" width={608} height={604} />
              </div>
              <div className="shape1 animate1">
                <OptimizedImage
                  src={shape1}
                  alt="img"
                  width={180}
                  height={100}
                />
              </div>
              <div className="shape2 animate2">
                <OptimizedImage
                  src={shape2}
                  alt="img"
                  width={180}
                  height={99}
                />
              </div>
              <div className="shape3">
                <OptimizedImage
                  src={shape3}
                  alt="img"
                  width={180}
                  height={99}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner5;
