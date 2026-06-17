"use client";
import { useEffect, FC } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Image from "next/image";

interface HeroBanner4Props {
  bgimg: string;
  sutitle: string;
  title: string;
  shape1: string;
  shpae2: string;
  shpae3: string;
  shpae4: string;
  shpae5: string;
  img: string;
}

const HeroBanner4: FC<HeroBanner4Props> = ({
  bgimg,
  sutitle,
  title,
  shape1,
  shpae2,
  shpae3,
  shpae4,
  shpae5,
  img,
}) => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <div className="hero4area">
      <div className="hero4" data-background={bgimg}>
        <div className="container _relative">
          <div className="row">
            <div className="col-lg-6 m-auto text-center">
              <div className="main-heading-area">
                <span className="span">
                  <Image
                    src="/assets/img/icons/span4.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  {sutitle}
                </span>
                <h1 className="text-anime-style-3">{title}</h1>
                <div className="form-area">
                  <form action="#">
                    <input type="text" placeholder="Your Website URL" />
                    <div className="form-btn">
                      <button className="theme-btn1">
                        Analyze Website{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={shape1}
            alt="img"
            width={335}
            height={308}
            className="shape1"
          />
          <Image
            src={shpae2}
            alt="img"
            width={335}
            height={308}
            className="shape2"
          />
          <Image
            src={shpae3}
            alt="img"
            width={496}
            height={375}
            className="shape3"
          />
          <Image
            src={shpae4}
            alt="img"
            width={358}
            height={254}
            className="shape4"
          />
          <Image
            src={shpae5}
            alt="img"
            width={179}
            height={179}
            className="shape5"
          />
        </div>
        <Image
          src={img}
          alt="img"
          width={539}
          height={582}
          className="main-image"
        />
      </div>
      <div className="space100"></div>
    </div>
  );
};

export default HeroBanner4;
