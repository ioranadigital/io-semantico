"use client";
import { useEffect, FC } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { OptimizedImage } from "@/components";

const ContactInfo5: FC = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <div
      className="service-details-others"
      data-background="/assets/img/bg/service-details-others-bg.png"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading1-w">
              <h2>Análisis de Competidores SEO</h2>
              <div className="space16"></div>
              <p>
                El análisis de competidores es un aspecto fundamental del
                desarrollo empresarial estratégico que implica un examen
                exhaustivo de tus rivales para entender sus fortalezas,
                debilidades y mercado.
              </p>

              <div className="form-area">
                <div className="row">
                  <div className="col-md-6">
                    <div className="single-input">
                      <input type="text" placeholder="https:// tusitio.com" />
                      <OptimizedImage
                        className="icon"
                        src="/assets/img/icons/service-details-form-icon1.svg"
                        alt="img"
                        width={21}
                        height={20}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="single-input">
                      <input type="text" placeholder="tucorreo@dominio.com" />
                      <OptimizedImage
                        className="icon"
                        src="/assets/img/icons/service-details-form-icon2.svg"
                        alt="img"
                        width={21}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="space30"></div>
                  <div className="form-btn">
                    <button className="theme-btn1">
                      Analizar Sitio Web{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo5;
