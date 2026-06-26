"use client";
import SectionTitle2 from "../Common/SectionTitle2";
import data from "../../Data/casestudy2.json";
import Link from "next/link";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const CaseStudy2: FC = () => {
  return (
    <div className="case3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading3">
              <SectionTitle2
                SubTitle="nuestros servicios seo"
                Title="Características Que Aman Nuestros Servicios de SEO y Marketing Digital"
              ></SectionTitle2>
            </div>
          </div>
        </div>
        <div className="space30"></div>
        <div className="row">
          {data.map((item, i) => (
            <div
              key={i}
              className="col-lg-4 col-md-6"
              data-aos="zoom-in-up"
              data-aos-duration="700"
            >
              <div className="blog-box">
                <div className="image image-anime">
                  <OptimizedImage
                    src={item.img}
                    alt="img"
                    width={416}
                    height={337}
                  />
                </div>
                <div className="heading1">
                  <a href="#" className="date">
                    {item.title}
                  </a>
                  <h5>
                    <Link href="/case/case-details">{item.desc}</Link>
                  </h5>
                  <div className="space20"></div>
                  <Link className="theme-btn2" href="/case/case-details">
                    Leer Más{" "}
                    <span>
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <OptimizedImage
        src="/assets/img/shapes/blog1-shape.png"
        alt="img"
        width={198}
        height={248}
        className="shape1 animate1"
      />
    </div>
  );
};

export default CaseStudy2;
