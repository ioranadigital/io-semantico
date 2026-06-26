"use client";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface Work3Props {
  customImage?: string;
  customImageWidth?: number;
  customImageHeight?: number;
  title?: string;
}

const Work3: FC<Work3Props> = ({
  customImage,
  customImageWidth = 505,
  customImageHeight = 498,
  title = "Proceso de Trabajo de IoranaSEO",
}) => {
  return (
    <div className="work3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading3">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/logo/main-span3.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  Elige el Plan Inicial
                </span>
              </p>
              <h2 className="text-anime-style-3">{title}</h2>
            </div>
          </div>
        </div>

        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-12">
            <div className="" data-aos="fade-right" data-aos-duration="700">
              <div className="work-box">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon1.svg"
                      alt="img"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="icon-span">
                    <p>01</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Diagnóstico de Visibilidad</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Analizamos cómo te buscan tus clientes actuales, dónde está
                    fallando tu web y qué está haciendo tu competencia para
                    adelantarte.
                  </p>
                </div>
              </div>
            </div>

            <div className="" data-aos="fade-right" data-aos-duration="900">
              <div className="work-box active">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon2.svg"
                      alt="img"
                      width={60}
                      height={61}
                    />
                  </div>
                  <div className="icon-span">
                    <p>02</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Activación y Optimización</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Ponemos a punto tu web y tus perfiles locales. Eliminamos
                    los frenos técnicos y los sustituimos por contenido directo
                    que convence y vende.
                  </p>
                </div>
              </div>
            </div>

            <div className="" data-aos="fade-right" data-aos-duration="1200">
              <div className="work-box">
                <div className="icon-area">
                  <div className="icon">
                    <OptimizedImage
                      src="/assets/img/icons/work1-icon3.svg"
                      alt="img"
                      width={60}
                      height={61}
                    />
                  </div>
                  <div className="icon-span">
                    <p>03</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Crecimiento Sostenible</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Automatizamos el control de tus datos para asegurar que tu
                    negocio siga siendo la opción preferida, adaptándonos
                    constantemente a cómo busca la gente hoy (móviles, mapas y
                    asistentes de inteligencia artificial).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work3;
