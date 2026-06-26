"use client";
import Link from "next/link";
import data from "../../Data/blog1.json";
import SectionTitle from "../Common/SectionTitle";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const Blog1: FC = () => {
  return (
    <div className="blog1 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading1">
              <SectionTitle
                SubTitle="nuestro blog"
                Title="Nuestros Últimos Artículos y Blog"
              ></SectionTitle>
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
                <div className="image">
                  <OptimizedImage
                    src={item.img}
                    alt="img"
                    width={416}
                    height={315}
                  />
                </div>
                <div className="heading1">
                  <div className="author-area">
                    <a href="#" className="date">
                      <OptimizedImage
                        src="/assets/img/icons/author.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />{" "}
                      Alex Roy
                    </a>
                    <a href="#" className="date">
                      <OptimizedImage
                        src="/assets/img/icons/date.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />{" "}
                      8 de Diciembre de 2024
                    </a>
                  </div>
                  <h5>
                    <Link href="/blog/blog-details">{item.title}</Link>
                  </h5>
                  <div className="space20"></div>
                  <Link className="theme-btn1" href="/blog/blog-details">
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

export default Blog1;
