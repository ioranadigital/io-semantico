"use client";
import { useEffect, FC, useState, useRef } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Image from "next/image";
import data from "../../Data/faq.json";

const ContactIno3: FC = () => {
  const accordionContentRef = useRef(null);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  const handleItemClick = (index: number) => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };

  useEffect(() => {
    loadBackgroudImages();
  }, []);

  useEffect(() => {
    if (firstItemOpen) {
      setOpenItemIndex(0);
      setFirstItemOpen(false);
    }
  }, [firstItemOpen]);

  return (
    <div
      className="cta2 cta2-no-images"
      style={{
        position: "relative",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="container _relative"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "700",
            marginBottom: "60px",
            lineHeight: "1.3",
          }}
        >
          <span style={{ color: "#1a1a1a" }}>Resolvemos</span>{" "}
          <span style={{ color: "#4D32A5" }}>tus principales dudas</span>
        </h2>
        <div className="row align-items-start">
          {/* Left Column - FAQ */}
          <div className="col-lg-6">
            <div style={{ paddingRight: "20px" }}>
              <div className="accordion accordion1" id="accordionContact">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className={`cs_accordian accordion-item ${index === openItemIndex ? "active" : ""}`}
                    data-aos="fade-up"
                    data-aos-duration="700"
                  >
                    <h2 className="accordion-header" id={`heading-${index}`}>
                      <button
                        onClick={() => handleItemClick(index)}
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded={index === openItemIndex}
                        aria-controls={`collapse-${index}`}
                      >
                        {item.title}
                      </button>
                    </h2>
                    <div
                      ref={accordionContentRef}
                      id={`collapse-${index}`}
                      className="accordion-collapse accordion-content"
                      aria-labelledby={`heading-${index}`}
                      data-bs-parent="#accordionContact"
                    >
                      <div className="accordion-body">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="col-lg-6">
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "48px",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: "#FF8C00",
                  margin: "0 0 24px 0",
                }}
              >
                ¿Listo para comenzar?
              </h3>
              <p
                style={{
                  color: "#333",
                  fontSize: "15px",
                  margin: "0 0 24px 0",
                }}
              >
                Nuestro equipo de expertos en SEO está aquí para ayudarte a
                crecer tu negocio online.
              </p>
              <form className="contact-form-planes" action="#">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Tu correo electrónico"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Tu sitio web"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Cuéntanos sobre tu negocio"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-barrido-contact"
                  style={{
                    backgroundColor: "#FF8C00",
                    color: "#ffffff",
                    padding: "14px 32px",
                    borderRadius: "24px",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    Enviar Mensaje
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        #accordionContact .accordion-item {
          border: 1px solid #D1D5DB !important;
          border-radius: 14px !important;
          background-color: rgba(237, 233, 254, 0.25) !important;
          margin-top: 16px !important;
          transition: all 0.4s !important;
        }

        #accordionContact .accordion-item button {
          border: none !important;
          background: none !important;
          padding: 20px 20px !important;
          color: #000 !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          position: relative !important;
          text-align: left !important;
          line-height: 1.4 !important;
          outline: none !important;
          box-shadow: none !important;
          min-height: 65px;
          display: flex;
          align-items: center;
        }

        #accordionContact .accordion-item button:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        #accordionContact .accordion-item button::before {
          display: none;
        }

        #accordionContact .accordion-item button::after {
          filter: brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(1000%) hue-rotate(250deg) !important;
          z-index: 3;
        }

        #accordionContact .accordion-item .accordion-body {
          color: #333 !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          line-height: 1.6 !important;
          padding: 12px 20px !important;
          text-align: start !important;
        }

        #accordionContact .accordion-item.active {
          background-color: #ffffff !important;
          transition: all 0.4s !important;
          border-color: #4D32A5 !important;
        }

        #accordionContact .accordion-item.active button {
          color: #4D32A5 !important;
        }

        #accordionContact .accordion-item.active button::before {
          background: #fff !important;
        }

        #accordionContact .accordion-item.active .accordion-body {
          color: #4D32A5 !important;
        }

        #accordionContact .accordion-item.active button::after {
          filter: brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(1000%) hue-rotate(250deg) !important;
        }

        #accordionContact {
          min-height: 400px;
        }

        .btn-barrido-contact {
          position: relative;
          overflow: hidden;
          background: #FF8C00 !important;
        }

        .btn-barrido-contact::before {
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

        .btn-barrido-contact:hover::before {
          left: 0;
        }

        .btn-barrido-contact span {
          position: relative;
          z-index: 1;
        }

        .contact-form-planes .form-group {
          margin-bottom: 20px !important;
        }

        .contact-form-planes .form-control {
          border: 2px solid #D4BFFF !important;
          border-radius: 12px !important;
          padding: 14px 16px !important;
        }

        .contact-form-planes .form-control:focus {
          border-color: #4D32A5 !important;
          box-shadow: 0 0 0 3px rgba(77, 50, 165, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default ContactIno3;
