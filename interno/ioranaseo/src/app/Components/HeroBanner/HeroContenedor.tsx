"use client";
import parse from "html-react-parser";
import { FC } from "react";
import BreadcrumbInline from "./BreadcrumbInline";

interface HeroContenedorProps {
  subtitle: string;
  title: string;
  content: string;
  containerTitle: string;
  containerDescription: string;
}

const HeroContenedor: FC<HeroContenedorProps> = ({
  subtitle,
  title,
  content,
  containerTitle,
  containerDescription,
}) => {
  return (
    <>
      <div
        className="hero2 hero-planes"
        style={{ minHeight: "600px", margin: "0", padding: "0" }}
      >
        <div className="container">
          <div
            className="breadcrumb-container"
            style={{
              width: "100%",
              paddingLeft: "470px",
              paddingRight: "15px",
              paddingTop: "50px",
              paddingBottom: "10px",
              backgroundColor: "#f9fafb",
            }}
          >
            <BreadcrumbInline
              items={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
            />
          </div>
          <div className="row align-items-center" style={{ margin: "0" }}>
            <div className="col-lg-6">
              <div className="main-heading" style={{ marginTop: "-5px" }}>
                <p
                  style={{
                    color: "#4D32A5",
                    fontSize: "14px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                    textAlign: "left",
                  }}
                >
                  {subtitle}
                </p>
                <h1
                  className="text-anime-style-3"
                  style={{ fontWeight: "bold" }}
                >
                  {parse(title)}
                </h1>
                <div className="space20"></div>
                <p data-aos="fade-right" data-aos-duration="800">
                  {parse(content)}
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div style={{ padding: "40px 20px" }}>
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "48px",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                    textAlign: "center",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "16px",
                    }}
                  >
                    {containerTitle}
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      lineHeight: "1.6",
                      marginBottom: "0",
                    }}
                  >
                    {containerDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroContenedor;
