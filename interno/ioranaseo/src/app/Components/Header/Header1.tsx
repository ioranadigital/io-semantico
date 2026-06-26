"use client";
import { useEffect, useState, FC } from "react";
import Nav from "./Nav";
import Link from "next/link";
import { OptimizedImage } from "@/components";
import BreadcrumbInline from "../HeroBanner/BreadcrumbInline";

interface Header1Props {
  variant?: string;
}

const Header1: FC<Header1Props> = ({ variant }) => {
  const [mobileToggle, setMobileToggle] = useState<boolean>(false);

  useEffect(() => {
    // Header siempre fijo y visible
  }, []);

  return (
    <header
      className={`cs_site_header header_style_2 cs_style_1 ${
        variant ? variant : ""
      } cs_sticky_header cs_site_header_full_width ${
        mobileToggle ? "cs_mobile_toggle_active" : ""
      }`}
    >
      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link href="/" className="cs_site_branding">
                <OptimizedImage
                  src="/assets/img/logo/iorana-logo.svg"
                  alt="IoranaSEO Logo"
                  width={130}
                  height={50}
                />
              </Link>
              <nav className="cs_nav cs_primary_font fw-medium">
                <span
                  className={
                    mobileToggle
                      ? "cs-munu_toggle cs_teggle_active"
                      : "cs-munu_toggle"
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
                <Nav setMobileToggle={setMobileToggle} />
              </nav>
            </div>
            <div className="cs_main_header_right">
              <div className="cs_header_contact">
                <div className="header-btn">
                  <div className="button">
                    <Link
                      href="/contacto"
                      className="btn-barrido-header"
                      style={{
                        backgroundColor: "#FF8C00",
                        color: "#ffffff",
                        padding: "12px 24px",
                        borderRadius: "24px",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "14px",
                        display: "inline-block",
                        cursor: "pointer",
                        border: "none",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <span style={{ position: "relative", zIndex: 1 }}>
                        Ponte en Contacto{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .btn-barrido-header {
          position: relative;
          overflow: hidden;
          background: #FF8C00 !important;
        }

        .btn-barrido-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #4D32A5;
          transition: left 0.4s ease;
          z-index: 0;
        }

        .btn-barrido-header:hover::before {
          left: 0;
        }

        .btn-barrido-header span {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </header>
  );
};

export default Header1;
