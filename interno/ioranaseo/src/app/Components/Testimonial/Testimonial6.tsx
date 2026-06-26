"use client";
import { OptimizedImage } from "@/components";
import data from "../../Data/testimonial3.json";
import SectionTitle2 from "../Common/SectionTitle2";
import { FC } from "react";

const Testimonial6: FC = () => {
  return (
    <div className="testimonial-page-sec sp">
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
        <div className="space30"></div>
        <div className="row">
          {data.map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="tes-box">
                <div className="stars">
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
                <p> {item.desc}</p>
                <div className="bottom">
                  <div className="image">
                    <OptimizedImage
                      src="/assets/img/testimonial/tes-img1.png"
                      alt="img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="content">
                    <h5>
                      <a href="#">{item.title}</a>
                    </h5>
                    <p>{item.subTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial6;
