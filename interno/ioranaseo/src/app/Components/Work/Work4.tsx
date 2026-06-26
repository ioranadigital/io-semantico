"use client";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const Work4: FC = () => {
  return (
    <div className="what-we-do5 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="heading5">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/logo/span5.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  What we do
                </span>
              </p>
              <h2 className="text-anime-style-3">
                Proven Social Media Marketing Tactics
              </h2>
              <div className="space16"></div>
              <p data-aos="fade-left" data-aos-duration="700">
                Transform your brands online presence with our seo expert social
                media marketing services. At IoranaSEO, we specialize a crafting
                strategic, data-driven social.
              </p>
              <div className="space30"></div>
              <div className="" data-aos="fade-left" data-aos-duration="1000">
                <a className="theme-btn3" href="service1.html">
                  Explore Our Services{" "}
                  <span>
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-6">
            <div className="boxs-all">
              <div className="row">
                <div className="col-lg-6">
                  <div className="space30"></div>
                  <div
                    className="single-boxs"
                    data-aos="zoom-out"
                    data-aos-duration="700"
                  >
                    <h3>13K</h3>
                    <p>Project Complete</p>
                  </div>
                  <div
                    className="single-boxs"
                    data-aos="zoom-out"
                    data-aos-duration="900"
                  >
                    <h3>49+</h3>
                    <p>Awards Winning</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="single-boxs"
                    data-aos="zoom-out"
                    data-aos-duration="1100"
                  >
                    <h3>12K</h3>
                    <p>Happy Client</p>
                  </div>
                  <div
                    className="single-boxs"
                    data-aos="zoom-out"
                    data-aos-duration="1300"
                  >
                    <h3>98%</h3>
                    <p>Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="what-we-do5-images">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4">
              <div className="image image-anime reveal">
                <OptimizedImage
                  src="/assets/img/service/what-we-do5-img1.png"
                  alt="img"
                  width={306}
                  height={385}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="image image-anime reveal">
                <OptimizedImage
                  src="/assets/img/service/what-we-do5-img2.png"
                  alt="img"
                  width={636}
                  height={463}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="image image-anime reveal">
                <OptimizedImage
                  src="/assets/img/service/what-we-do5-img3.png"
                  alt="img"
                  width={306}
                  height={385}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work4;
