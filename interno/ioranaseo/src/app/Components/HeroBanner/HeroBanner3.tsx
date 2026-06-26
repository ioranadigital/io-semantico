"use client";
import parse from "html-react-parser";
import { OptimizedImage } from "@/components";
import { FC } from "react";
import Link from "next/link";

interface HeroBanner3Props {
  subtitle: string;
  title: string;
  content: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}

const HeroBanner3: FC<HeroBanner3Props> = ({
  subtitle,
  title,
  content,
  img1,
  img2,
  img3,
  img4,
}) => {
  return (
    <div className="hero3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="main-heading">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/logo/main-span3.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  {subtitle}
                </span>
              </p>
              <h1 className="text-anime-style-3">{title} </h1>
              <div className="space20"></div>
              <p data-aos="fade-right" data-aos-duration="800">
                {parse(content)}
              </p>
              <div
                className="form-area"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <div className="form-btn">
                  <Link
                    href="/informe-gratuito"
                    className="btn-barrido-contact"
                    style={{
                      display: "inline-block",
                      backgroundColor: "#FF8C00",
                      color: "#ffffff",
                      padding: "14px 32px",
                      borderRadius: "24px",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>
                      Informe Gratuito de tu Web →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-6"
          style={{
            marginRight: "-10px",
            width: "calc(50% + 10px)",
            display: "flex",
            alignItems: "stretch",
            backgroundImage: "url('/assets/img/hero/carpintero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "absolute",
            right: "0",
            top: "0",
            bottom: "0",
          }}
        >
          <div
            className="main-images"
            data-aos="zoom-out"
            data-aos-duration="700"
            style={{ position: "relative" }}
          >
            <div className="main-img">
              <OptimizedImage src={img3} alt="img" width={552} height={530} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner3;
