"use client";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";

interface HeroBannerPlanesProps {
  subtitle: string;
  title: string;
  content: string;
  img: string;
  showBreadcrumb?: boolean;
  showImage?: boolean;
}

const HeroBannerPlanes: FC<HeroBannerPlanesProps> = ({
  subtitle,
  title,
  content,
  img,
  showBreadcrumb = true,
  showImage = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <div
        className="hero2 hero-planes"
        style={{
          minHeight: "600px",
          margin: "0",
          padding: "0",
          marginTop: "-25px",
        }}
      >
        <div className="container">
          <div className="row align-items-center" style={{ margin: "0" }}>
            <div className="col-lg-6">
              <div className="main-heading" style={{ marginTop: "-5px" }}>
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
                <div
                  data-aos="fade-right"
                  data-aos-duration="900"
                  style={{
                    marginTop: "24px",
                    marginBottom: "24px",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#4D32A5",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    Higher Conversion Rates
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#4D32A5",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    Increase Website Traffic
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#4D32A5",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    Local Market Dominance
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#4D32A5",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    24/7 Promotion
                  </span>
                </div>
                <div
                  className="form-area"
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  style={{
                    display: "flex",
                    gap: "24px",
                    flexWrap: "wrap",
                    marginTop: "100px",
                    marginLeft: "auto",
                    width: "fit-content",
                  }}
                >
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-barrido"
                    style={{
                      display: "inline-block",
                      padding: "14px 32px",
                      backgroundColor: "#FF8C00",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "24px",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>
                      <i className="bi bi-telephone"></i> Llámanos
                    </span>
                  </button>
                  <Link
                    href="/planes"
                    className="btn-barrido"
                    style={{
                      display: "inline-block",
                      padding: "14px 32px",
                      backgroundColor: "#FF8C00",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "24px",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      textDecoration: "none",
                      position: "relative",
                      overflow: "hidden",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>
                      Mira Nuestros Planes{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {showImage ? (
                <div
                  className="main-images"
                  style={{
                    position: "relative",
                    height: "600px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "-70px",
                    width: "100%",
                  }}
                  data-aos="zoom-out"
                  data-aos-duration="700"
                >
                  <div
                    className="image1"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "550px",
                      height: "550px",
                      zIndex: 0,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 288 288"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <linearGradient
                        id="imagewave-hero"
                        x1="70.711%"
                        x2="0%"
                        y1="70.711%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#4D32A5" stopOpacity="1" />
                        <stop
                          offset="100%"
                          stopColor="#7B68EE"
                          stopOpacity="1"
                        />
                      </linearGradient>
                      <path fill="url(#imagewave-hero)" d="">
                        <animate
                          repeatCount="indefinite"
                          attributeName="d"
                          dur="10s"
                          values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
                          c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
                          c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
                          c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;
                          M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4
                          c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6
                          c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8
                          C48.9,198.6,57.8,191,51,171.3z;
                          M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
                          c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
                          c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
                          c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
                        />
                      </path>
                    </svg>
                  </div>
                  <div
                    className="image2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "500px",
                      height: "500px",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src="/assets/img/work/hombre-mujer-empreendedores-online.jpg"
                      alt="Plan Inicial"
                      width={400}
                      height={400}
                      style={{
                        borderRadius: "60% 40% 50% 65% / 50% 60% 40% 65%",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: "40px 120px",
                    display: "flex",
                    alignItems: "center",
                    height: "600px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "48px",
                      borderRadius: "24px",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #e5e7eb",
                      width: "100%",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#FF8C00",
                        marginBottom: "24px",
                        margin: "0 0 24px 0",
                      }}
                    >
                      ¿Por qué importa?
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: "#22c55e",
                            fontSize: "20px",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <p
                          style={{
                            color: "#333",
                            fontSize: "15px",
                            lineHeight: "1.6",
                            margin: "0",
                          }}
                        >
                          El 46% de todas las búsquedas en Google tienen
                          intención local — tus clientes te están buscando ahora
                          mismo
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: "#22c55e",
                            fontSize: "20px",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <p
                          style={{
                            color: "#333",
                            fontSize: "15px",
                            lineHeight: "1.6",
                            margin: "0",
                          }}
                        >
                          El 76% de las personas que hacen una búsqueda local
                          visitan el negocio en 24 horas
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            color: "#22c55e",
                            fontSize: "20px",
                            fontWeight: "700",
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <p
                          style={{
                            color: "#333",
                            fontSize: "15px",
                            lineHeight: "1.6",
                            margin: "0",
                          }}
                        >
                          Los negocios en el Local Pack de Google reciben el 44%
                          de los clics totales de la página de resultados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="call-dialog"
        style={
          {
            maxWidth: "1000px",
            width: "90%",
            padding: "0",
            border: "none",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            backgroundColor: "rgba(245, 240, 250, 0.80)",
            margin: "auto",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          } as React.CSSProperties
        }
      >
        <button
          className="modal-close"
          onClick={closeModal}
          style={
            {
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "40px",
              height: "40px",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "50%",
              fontSize: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#333",
              zIndex: 10,
            } as React.CSSProperties
          }
        >
          ✕
        </button>

        <div
          className="modal-content"
          style={
            {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              padding: "40px",
              position: "relative",
            } as React.CSSProperties
          }
        >
          {/* Tarjeta Izquierda - Formulario */}
          <div
            className="modal-card form-card"
            style={
              {
                backgroundColor: "#ffffff",
                border: "2px solid #4D32A5",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              } as React.CSSProperties
            }
          >
            <h2
              className="card-title"
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 700,
                color: "#4D32A5",
              }}
            >
              Te llamamos Gratis
            </h2>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                closeModal();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#4D32A5",
                  }}
                >
                  Número de teléfono*
                </label>
                <input
                  type="tel"
                  placeholder="Número de teléfono"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = "#4D32A5";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(77, 50, 165, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <input
                  type="checkbox"
                  id="consent-call"
                  required
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "2px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <label
                  htmlFor="consent-call"
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    lineHeight: "1.6",
                    cursor: "pointer",
                    margin: 0,
                  }}
                >
                  Autorizo a contactarme comercialmente por email, teléfono y/o
                  via Whatsapp sobre los servicios y productos relativos al
                  marketing digital y directorios. Ver información sobre
                  protección de datos
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px 28px",
                  backgroundColor: "#ff6b35",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                TE LLAMAMOS
              </button>
            </form>
          </div>

          {/* Tarjeta Derecha - Información */}
          <div
            className="modal-card info-card"
            style={
              {
                backgroundColor: "#ffffff",
                border: "2px solid #4D32A5",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              } as React.CSSProperties
            }
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#4D32A5",
                  marginBottom: "8px",
                }}
              >
                Escribenos o Llámanos
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: "1.6",
                }}
              >
                Si lo prefieres puedes escribirnos o enviarnos un whatsapp a
                este numero y te contestaremos lo antes posible a tus consultas.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                borderTop: "1px solid #eee",
                paddingTop: "24px",
              }}
            >
              {/* Columna Izquierda - Llamar */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#4D32A5",
                  }}
                >
                  Llama Ahora
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                  }}
                >
                  603 149 158
                </p>
              </div>

              {/* Columna Derecha - Horario */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#4D32A5",
                  }}
                >
                  Horario
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#333",
                    lineHeight: "1.5",
                  }}
                >
                  De lunes a Viernes
                  <br />
                  <strong>de 9:00 a 19:00</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </dialog>

      <style>{`
        .btn-barrido {
          position: relative;
          overflow: hidden;
          background: #FF8C00 !important;
        }

        .btn-barrido::before {
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

        .btn-barrido:hover::before {
          left: 0;
        }

        .btn-barrido span {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  );
};

export default HeroBannerPlanes;
