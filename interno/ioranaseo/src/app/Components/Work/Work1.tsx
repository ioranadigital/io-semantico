"use client";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface Work1Props {
  title?: string;
  subtitle?: string;
}

const Work1: FC<Work1Props> = ({
  title = "Proceso de Trabajo de IoranaSEO",
  subtitle = "Cómo Funciona",
}) => {
  return (
    <div className="work1 sp">
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
                  {subtitle}
                </span>
              </p>
              <h2 className="text-anime-style-3">{title}</h2>
            </div>
          </div>
        </div>

        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-6">
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
                    <a href="case-details.html">
                      Auditoría Completa del Sitio Web
                    </a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Comenzamos con una consulta detallada de tus objetivos
                    comerciales, audiencia objetivo, esfuerzos de
                    marketing.{" "}
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
                    <p>01</p>
                  </div>
                </div>
                <div className="heading1">
                  <h4>
                    <a href="case-details.html">Estrategia SEO Personalizada</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Optimización en Motores de Búsqueda (SEO) es esencial para
                    mejorar la visibilidad de tu sitio web.{" "}
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
                    <a href="case-details.html">Optimización Continua</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Nuestro equipo realiza investigación exhaustiva para
                    analizar tu industria, competidores y comportamiento de
                    audiencia.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="work-images">
              <div className="image1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 288 288"
                >
                  <linearGradient
                    id="imagewave2"
                    x1="70.711%"
                    x2="0%"
                    y1="70.711%"
                    y2="0%"
                  >
                    <stop className="stop-color2" offset="0%" stopOpacity="1" />
                    <stop
                      className="stop-color1"
                      offset="100%"
                      stopOpacity="1"
                    />
                  </linearGradient>
                  <path fill="url(#imagewave2)" d="">
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
                  c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z  "
                    />
                  </path>
                </svg>
              </div>
              <div className="image2">
                <OptimizedImage
                  src="/assets/img/work/hombre-mujer-empreendedores-online.jpg"
                  alt="Por qué elegir este plan"
                  width={505}
                  height={498}
                />
              </div>
              <div className="image3 animate1">
                <OptimizedImage
                  src="/assets/img/work/work-img2.png"
                  alt="img"
                  width={300}
                  height={304}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work1;
