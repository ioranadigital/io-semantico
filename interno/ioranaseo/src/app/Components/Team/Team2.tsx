"use client";
import { OptimizedImage } from "@/components";
import data from "../../Data/team1.json";
import { FC } from "react";

const Team2: FC = () => {
  return (
    <div className="team1 tean-two-area">
      <div className="container">
        <div className="row">
          {data.map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div
                className="team-box"
                data-aos="zoom-in-up"
                data-aos-duration="700"
              >
                <div className="image image-anime">
                  <OptimizedImage
                    src={item.img}
                    alt="img"
                    width={416}
                    height={382}
                  />
                </div>
                <div className="heading-area">
                  <div className="heading1">
                    <h4>
                      <a href="#">{item.title}</a>
                    </h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="icon-area">
                    <a href="#" className="icon">
                      <OptimizedImage
                        src="/assets/img/icons/shere.svg"
                        alt="img"
                        width={24}
                        height={24}
                      />
                    </a>
                    <ul className="icon-list">
                      <li>
                        <a href={item.twitter}>
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.linkedin}>
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.instagram}>
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href={item.facebook}>
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                    </ul>
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

export default Team2;
