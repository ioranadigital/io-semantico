import Image from "next/image";
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
                  <Image
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
                    <Image
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
                      Auditoría Integral del Sitio Web
                    </a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    Comenzamos con una consulta detallada sobre tus objetivos
                    empresariales, audiencia objetivo y esfuerzos de marketing.
                  </p>
                </div>
              </div>
            </div>

            <div className="" data-aos="fade-right" data-aos-duration="900">
              <div className="work-box active">
                <div className="icon-area">
                  <div className="icon">
                    <Image
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
                    <a href="case-details.html">Estrategia SEO Personalizada</a>
                  </h4>
                  <div className="space16"></div>
                  <p>
                    La optimización en motores de búsqueda (SEO) es esencial
                    para impulsar la visibilidad de tu sitio web en resultados.
                  </p>
                </div>
              </div>
            </div>

            <div className="" data-aos="fade-right" data-aos-duration="1200">
              <div className="work-box">
                <div className="icon-area">
                  <div className="icon">
                    <Image
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
                    Realizamos optimización continua y análisis detallado para
                    asegurar el mejor rendimiento de tu sitio web.
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
