"use client";
import { OptimizedImage } from "@/components";
import Link from "next/link";
import { FC } from "react";

interface About5Props {
  shape: string;
  img1: string;
  img2: string;
  subtitle: string;
  title: string;
  content: string;
  FeatureList?: string[];
  btnname: string;
  btnurl: string;
}

const About5: FC<About5Props> = ({
  shape,
  img1,
  img2,
  subtitle,
  title,
  content,
  FeatureList,
  btnname,
  btnurl,
}) => {
  return (
    <div className="about5 sp">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="images-all">
              <div className="shape-bg1">
                <OptimizedImage
                  src={shape}
                  alt="img"
                  width={782}
                  height={743}
                />
              </div>
              <div
                className="image1"
                data-aos="zoom-out"
                data-aos-duration="700"
              >
                <OptimizedImage src={img1} alt="img" width={470} height={530} />
              </div>
              <div className="image2 animate2">
                <OptimizedImage src={img2} alt="img" width={477} height={375} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
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
                  {subtitle}
                </span>
              </p>
              <h2 className="text-anime-style-3">{title}</h2>
              <div className="space16"></div>
              <p data-aos="fade-left" data-aos-duration="900">
                {content}
              </p>
              <ul
                className="about-list"
                data-aos="fade-left"
                data-aos-duration="900"
              >
                {FeatureList?.map((item, index) => (
                  <li key={index}>
                    <span>
                      <i className="bi bi-check-lg"></i>
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space30"></div>
              <div className="" data-aos="fade-left" data-aos-duration="700">
                <Link className="theme-btn3" href={btnurl}>
                  {btnname}{" "}
                  <span>
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About5;
