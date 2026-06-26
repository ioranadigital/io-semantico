"use client";
import { useState, FC } from "react";
import ServiceCard from "../Card/ServiceCard";
import { OptimizedImage } from "@/components";

const Service2: FC = () => {
  const [isActive, setIsActive] = useState("tab2");

  return (
    <div className="service2 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto text-center">
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
                  nuestros servicios seo
                </span>
              </p>
              <h2 className="text-anime-style-3">
                Servicios de SEO y Marketing Digital
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 m-auto text-center">
            <div className="service2-all-tabs">
              <div className="tabs-buttons">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li
                    className={`nav-item ${isActive === "tab1" ? "active" : ""}`}
                    onClick={() => setIsActive("tab1")}
                    role="presentation"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                  >
                    <button
                      className="nav-link"
                      id="service2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#service2"
                      type="button"
                      role="tab"
                      aria-controls="service2"
                      aria-selected="true"
                    >
                      <span className="icon">
                        <OptimizedImage
                          src="/assets/img/icons/service2-icon1.svg"
                          alt="img"
                          width={37}
                          height={36}
                        />
                      </span>
                      <span className="text-box">
                        <span>Marketing SEO</span>
                      </span>
                    </button>
                  </li>
                  <li
                    className={`nav-item ${isActive === "tab2" ? "active" : ""}`}
                    onClick={() => setIsActive("tab2")}
                    role="presentation"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <button
                      className="nav-link"
                      id="service3-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#service3"
                      type="button"
                      role="tab"
                      aria-controls="service3"
                      aria-selected="false"
                    >
                      <span className="icon">
                        <OptimizedImage
                          src="/assets/img/icons/service2-icon2.svg"
                          alt="img"
                          width={36}
                          height={36}
                        />
                      </span>
                      <span className="text-box">
                        <span>Marketing de Contenidos</span>
                      </span>
                    </button>
                  </li>
                  <li
                    className={`nav-item ${isActive === "tab3" ? "active" : ""}`}
                    onClick={() => setIsActive("tab3")}
                    role="presentation"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    <button
                      className="nav-link"
                      id="service4-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#service4"
                      type="button"
                      role="tab"
                      aria-controls="service4"
                      aria-selected="false"
                    >
                      <span className="icon">
                        <OptimizedImage
                          src="/assets/img/icons/service2-icon3.svg"
                          alt="img"
                          width={40}
                          height={40}
                        />
                      </span>
                      <span className="text-box">
                        <span>Marketing Digital</span>
                      </span>
                    </button>
                  </li>
                  <li
                    className={`nav-item ${isActive === "tab4" ? "active" : ""}`}
                    onClick={() => setIsActive("tab4")}
                    role="presentation"
                    data-aos="fade-up"
                    data-aos-duration="700"
                  >
                    <button
                      className="nav-link"
                      id="service5-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#service5"
                      type="button"
                      role="tab"
                      aria-controls="service5"
                      aria-selected="false"
                    >
                      <span className="icon">
                        <OptimizedImage
                          src="/assets/img/icons/service2-icon4.svg"
                          alt="img"
                          width={36}
                          height={36}
                        />
                      </span>
                      <span className="text-box">
                        <span>Email Marketing</span>
                      </span>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tabs-contents">
                <div
                  className="tab-content"
                  id="pills-tabContent"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <div
                    className={`cs_tab tab-pane ${isActive === "tab1" ? "active" : ""}`}
                    id="service2"
                    role="tabpanel"
                    aria-labelledby="service2-tab"
                  >
                    <ServiceCard
                      subtitle="Marketing SEO"
                      title="Desbloquea el Poder del SEO para Crecer tu Negocio"
                      content="En IoranaSEO, nos especializamos en ayudar a los negocios a lograr mejores rankings en los motores de búsqueda a través de marketing SEO efectivo de nuestro equipo de expertos."
                      list1="Aumento del Tráfico del Sitio Web"
                      list2="Marketing Rentable"
                      btnname="Leer Más"
                      btnurl="/service"
                      img1="/assets/img/service/service2-tab1.png"
                      img2="/assets/img/service/service2-tab2.png"
                      img3="/assets/img/service/service2-tab3.png"
                      img4="/assets/img/service/service2-tab4.png"
                    ></ServiceCard>
                  </div>
                  <div
                    className={`cs_tab tab-pane ${isActive === "tab2" ? "active" : ""}`}
                    id="service3"
                    role="tabpanel"
                    aria-labelledby="service3-tab"
                  >
                    <ServiceCard
                      subtitle="Marketing de Contenidos"
                      title="Desbloquea el Poder del SEO para Crecer tu Negocio"
                      content="En IoranaSEO, nos especializamos en ayudar a los negocios a lograr mejores rankings en los motores de búsqueda a través de marketing SEO efectivo de nuestro equipo de expertos."
                      list1="Aumento del Tráfico del Sitio Web"
                      list2="Marketing Rentable"
                      btnname="Leer Más"
                      btnurl="/service"
                      img1="/assets/img/service/service2-tab1.png"
                      img2="/assets/img/service/service2-tab2.png"
                      img3="/assets/img/service/service2-tab3.png"
                      img4="/assets/img/service/service2-tab4.png"
                    ></ServiceCard>
                  </div>
                  <div
                    className={`cs_tab tab-pane ${isActive === "tab3" ? "active" : ""}`}
                    id="service4"
                    role="tabpanel"
                    aria-labelledby="service4-tab"
                  >
                    <ServiceCard
                      subtitle="Marketing Digital"
                      title="Desbloquea el Poder del SEO para Crecer tu Negocio"
                      content="En IoranaSEO, nos especializamos en ayudar a los negocios a lograr mejores rankings en los motores de búsqueda a través de marketing SEO efectivo de nuestro equipo de expertos."
                      list1="Aumento del Tráfico del Sitio Web"
                      list2="Marketing Rentable"
                      btnname="Leer Más"
                      btnurl="/service"
                      img1="/assets/img/service/service2-tab1.png"
                      img2="/assets/img/service/service2-tab2.png"
                      img3="/assets/img/service/service2-tab3.png"
                      img4="/assets/img/service/service2-tab4.png"
                    ></ServiceCard>
                  </div>
                  <div
                    className={`cs_tab tab-pane ${isActive === "tab4" ? "active" : ""}`}
                    id="service5"
                    role="tabpanel"
                    aria-labelledby="service5-tab"
                  >
                    <ServiceCard
                      subtitle="Email Marketing"
                      title="Desbloquea el Poder del SEO para Crecer tu Negocio"
                      content="En IoranaSEO, nos especializamos en ayudar a los negocios a lograr mejores rankings en los motores de búsqueda a través de marketing SEO efectivo de nuestro equipo de expertos."
                      list1="Aumento del Tráfico del Sitio Web"
                      list2="Marketing Rentable"
                      btnname="Leer Más"
                      btnurl="/service"
                      img1="/assets/img/service/service2-tab1.png"
                      img2="/assets/img/service/service2-tab2.png"
                      img3="/assets/img/service/service2-tab3.png"
                      img4="/assets/img/service/service2-tab4.png"
                    ></ServiceCard>
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

export default Service2;
