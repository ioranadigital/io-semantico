"use client";
import { OptimizedImage } from "@/components";
import Link from "next/link";
import { FC } from "react";

const Work2: FC = () => {
  return (
    <div className="work2 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto text-center">
            <div className="heading1">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/icons/span1.svg"
                    alt="img"
                    width={21}
                    height={20}
                  />
                  How It works
                </span>
              </p>
              <h2 className="text-anime-style-3">Work Process Of IoranaSEO</h2>
            </div>
          </div>
        </div>

        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-6">
            <div className="" data-aos="fade-right" data-aos-duration="700">
              <div className="work-box">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon1.svg"
                      alt="img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="icon-span">
                    <p>01</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Comprehensive Website Audit</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    We begin with a detailed consultation your market business
                    goals, target audience, marketing efforts.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="" data-aos="fade-right" data-aos-duration="900">
              <div className="work-box active">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon2.svg"
                      alt="img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="icon-span">
                    <p>03</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Customized SEO Strategy</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Search Engine Optimize (SEO) best marketing is to essential
                    for boosting your website visibility in best.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="" data-aos="fade-right" data-aos-duration="1200">
              <div className="work-box">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon3.svg"
                      alt="img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="icon-span">
                    <p>02</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Customized SEO Strategy</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    We begin with a detailed consultation your market business
                    goals, target audience, marketing efforts.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="" data-aos="fade-right" data-aos-duration="1200">
              <div className="work-box">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon4.svg"
                      alt="img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="icon-span">
                    <p>04</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Reporting & Communication</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Transparency is key. We provide regular reports to detailing
                    your campaign’s performance, including
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space60"></div>
        <div className="row">
          <div className="col-12 text-center">
            <div className="buttons" data-aos="fade-up" data-aos-duration="900">
              <Link className="theme-btn1" href="/case">
                Boost Your Rankings{" "}
                <span>
                  <i className="bi bi-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work2;
