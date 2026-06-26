"use client";
import Link from "next/link";
import data from "../../Data/services4.json";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const Services5: FC = () => {
  return (
    <div className="service1-page sp">
      <div className="container">
        <div className="row">
          {data.map((item, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-6"
              data-aos="zoom-in-up"
              data-aos-duration="700"
            >
              <div className={item.addclass}>
                <div className="icon">
                  <OptimizedImage
                    src={item.icon}
                    alt="img"
                    width={36}
                    height={36}
                  />
                </div>
                <div className="heading3">
                  <h4>
                    <Link href={item.btnLink}>{item.title}</Link>
                  </h4>
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

export default Services5;
