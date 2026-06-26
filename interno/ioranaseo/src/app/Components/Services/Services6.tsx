"use client";
import Link from "next/link";
import data from "../../Data/services2.json";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const Services6: FC = () => {
  return (
    <div className="service3 service-page sp">
      <div className="container">
        <div className="row">
          {data.map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="service3-box">
                <div className="image">
                  <OptimizedImage
                    src={item.icon}
                    alt="img"
                    width={250}
                    height={250}
                  />
                </div>
                <div className="heading3">
                  <h4>
                    <Link href={item.btnLink}>{item.title}</Link>
                  </h4>
                  <div className="space16"></div>
                  <p>{item.desc}</p>
                  <Link href={item.btnLink} className="learn">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services6;
