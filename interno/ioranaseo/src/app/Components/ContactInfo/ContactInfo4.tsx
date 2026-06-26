"use client";
import { useEffect, FC } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import { OptimizedImage } from "@/components";

const ContactInfo4: FC = () => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return (
    <div className="cta2" data-background="/assets/img/bg/cta2-bg.jpg">
      <div className="container _relative">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading">
              <h2>Maximiza tu ROI con Nuestras Mejores Soluciones SEO</h2>
              <div className="form-area">
                <form action="#">
                  <input type="email" placeholder="Tu URL del Sitio Web" />
                  <div className="form-btn">
                    <button className="theme-btn1">
                      Analizar Sitio Web{" "}
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
        <OptimizedImage
          src="/assets/img/others/cta2-img1.png"
          alt="img"
          width={238}
          height={226}
          className="image1"
        />
        <OptimizedImage
          src="/assets/img/others/cta2-img2.png"
          alt="img"
          width={238}
          height={226}
          className="image2"
        />
      </div>
    </div>
  );
};

export default ContactInfo4;
