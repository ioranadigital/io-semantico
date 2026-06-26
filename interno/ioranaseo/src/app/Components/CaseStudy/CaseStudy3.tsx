"use client";
import Link from "next/link";
import data from "../../Data/casestudy1.json";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const CaseStudy3: FC = () => {
  return (
    <div className="case-page sp">
      <div className="container">
        <div className="row">
          {data.map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div className="single-slider">
                <div className="image">
                  <OptimizedImage
                    src={item.img}
                    alt="img"
                    width={396}
                    height={428}
                  />
                </div>
                <div className="heading-area">
                  <p>{item.title}</p>
                  <h4>
                    <Link href="/case/case-details">{item.desc}</Link>
                  </h4>
                  <Link href="/case/case-details" className="arrow-right">
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

export default CaseStudy3;
