"use client";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const ContactInfo1: FC = () => {
  return (
    <div className="contact1 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading1">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/icons/span1.svg"
                    alt="img"
                    width={21}
                    height={20}
                  />
                  Contáctanos IoranaSEO
                </span>
              </p>
              <h2 className="text-anime-style-3">
                Desbloquea el Poder del SEO y Marketing Digital Hoy
              </h2>
            </div>
            <div className="space30"></div>

            <div
              className="form-area-all"
              data-aos="zoom-out"
              data-aos-duration="900"
            >
              <div className="form-content">
                <form action="#">
                  <div className="single-input">
                    <label>Nombre*</label>
                    <input type="text" placeholder="Tu Nombre" />
                    <span className="icon">
                      <OptimizedImage
                        src="/assets/img/icons/contact1-input1.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />
                    </span>
                  </div>
                  <div className="single-input">
                    <label>Correo Electrónico*</label>
                    <input type="text" placeholder="Tu Correo" />
                    <span className="icon">
                      <OptimizedImage
                        src="/assets/img/icons/contact1-input2.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />
                    </span>
                  </div>
                  <div className="single-input">
                    <label>URL del Sitio Web*</label>
                    <input type="text" placeholder="Tusitio.com" />
                    <span className="icon">
                      <OptimizedImage
                        src="/assets/img/icons/contact1-input3.svg"
                        alt="img"
                        width={18}
                        height={18}
                      />
                    </span>
                  </div>

                  <div className="form-btn">
                    <button type="submit" className="theme-btn1">
                      Inicia tu Auditoría Gratis{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="shape1">
                <OptimizedImage
                  src="/assets/img/shapes/contact1-shape1.png"
                  alt="img"
                  width={204}
                  height={204}
                />
              </div>
              <div className="shape2">
                <OptimizedImage
                  src="/assets/img/shapes/contact1-shape2.png"
                  alt="img"
                  width={190}
                  height={190}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="contact1-box">
              <div className="icon">
                <OptimizedImage
                  src="/assets/img/icons/contact1-icon1.svg"
                  alt="img"
                  width={25}
                  height={32}
                />
              </div>
              <div className="heading">
                <h4>Dirección</h4>
                <a href="#">4201 Allen, New Mexico 4233</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="contact1-box">
              <div className="icon">
                <OptimizedImage
                  src="/assets/img/icons/contact1-icon2.svg"
                  alt="img"
                  width={32}
                  height={32}
                />
              </div>
              <div className="heading">
                <h4>Correo Electrónico</h4>
                <a href="mailto:seomax@gmail.com">seomax@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="contact1-box">
              <div className="icon">
                <OptimizedImage
                  src="/assets/img/icons/contact1-icon3.svg"
                  alt="img"
                  width={32}
                  height={32}
                />
              </div>
              <div className="heading">
                <h4>Teléfono</h4>
                <a href="tel:+11234567890">+1 123 456 7890</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo1;
