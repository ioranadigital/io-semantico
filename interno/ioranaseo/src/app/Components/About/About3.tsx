"use client";
import Link from "next/link";
import data from "../../Data/counter.json";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface About3Props {
  subtitle: string;
  title: string;
  content: string;
  FeatureList?: string[];
  btnurl: string;
  btnname: string;
}

const About3: FC<About3Props> = ({
  subtitle,
  title,
  content,
  FeatureList,
  btnurl,
  btnname,
}) => {
  return (
    <div className="about1 sp" style={{ backgroundColor: "#f9f7ff" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column - Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {data.map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-duration={600 + i * 100}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(77, 50, 165, 0.08)",
                  border: "1px solid #ede9fe",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(77, 50, 165, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(77, 50, 165, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "#EDE9FE",
                    color: "#4D32A5",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      margin: "0",
                      fontWeight: "500",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Content & CTA */}
          <div
            data-aos="fade-left"
            data-aos-duration="600"
            style={{ display: "flex", flexDirection: "column", gap: "0" }}
          >
            {subtitle && (
              <p className="title" style={{ margin: "0 0 16px 0" }}>
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
            )}
            <h2
              className="text-anime-style-3"
              style={{
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              {title}
            </h2>
            <p
              style={{
                color: "#333",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "1.7",
                margin: "16px 0 24px 0",
              }}
            >
              {content}
            </p>
            <div style={{ marginTop: "0", textAlign: "right" }}>
              <Link
                className="btn-barrido-contact"
                href={btnurl}
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
                  {btnname} →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About3;
