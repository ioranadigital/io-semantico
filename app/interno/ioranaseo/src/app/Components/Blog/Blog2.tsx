import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Blog2: FC = () => {
  return (
    <div className="blog3 sp">
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
                  nuestro blog
                </span>
              </p>
              <h2>Nuestros Últimos Artículos y Blog</h2>
            </div>
          </div>
        </div>

        <div className="space40"></div>
        <div className="col-lg-10 m-auto">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div
                className="blog-box"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <div className="image image-anime">
                  <Image
                    src="/assets/img/blog/blog3-img.png"
                    alt="img"
                    width={620}
                    height={429}
                  />
                </div>
                <div className="heading3">
                  <div className="author-area">
                    <a href="#" className="date">
                      <Image
                        src="/assets/img/icons/author.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />{" "}
                      Alex Carey
                    </a>
                    <a href="#" className="date">
                      <Image
                        src="/assets/img/icons/date.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />{" "}
                      8 de Diciembre de 2024
                    </a>
                  </div>
                  <h4>
                    <Link href="/blog/blog-details">
                      Cómo Optimizar tu Sitio Web para Búsqueda por Voz:
                      Consejos y Mejores Prácticas en SEO
                    </Link>
                  </h4>
                  <p>
                    En 2024, mantenerse al día con las tendencias de SEO es
                    crucial para mantener alta visibilidad en los resultados de
                    búsqueda, descubre diez SEO probados.
                  </p>
                  <div className="space30"></div>
                  <Link className="theme-btn2" href="/blog/blog-details">
                    Leer Más{" "}
                    <span>
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="" data-aos="fade-up" data-aos-duration="700">
                <div className="blog-box smoll">
                  <div className="heading3">
                    <div className="author-area">
                      <a href="#" className="date">
                        <Image
                          src="/assets/img/icons/author.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        Alex Roy
                      </a>
                      <a href="#" className="date">
                        <Image
                          src="/assets/img/icons/date.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        8 de Diciembre de 2024
                      </a>
                    </div>
                    <h4>
                      <Link href="/blog/blog-details">
                        La Importancia de los Backlinks y Cómo Construir un
                        Perfil de Enlace Fuerte
                      </Link>
                    </h4>
                    <Link className="theme-btn2" href="/blog/blog-details">
                      Leer Más{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="" data-aos="fade-up" data-aos-duration="700">
                <div className="blog-box smoll">
                  <div className="heading3">
                    <div className="author-area">
                      <a href="#" className="date">
                        <Image
                          src="/assets/img/icons/author.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        Alex Hales
                      </a>
                      <a href="#" className="date">
                        <Image
                          src="/assets/img/icons/date.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        8 de Diciembre de 2024
                      </a>
                    </div>
                    <h4>
                      <Link href="/blog/blog-details">
                        Rol del SEO Técnico en Mejorar el Rendimiento de tu
                        Sitio Web en SEO
                      </Link>
                    </h4>
                    <Link className="theme-btn2" href="/blog/blog-details">
                      Leer Más{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="" data-aos="fade-up" data-aos-duration="700">
                <div className="blog-box smoll">
                  <div className="heading3">
                    <div className="author-area">
                      <a href="#" className="date">
                        <Image
                          src="/assets/img/icons/author.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        Alex Carey
                      </a>
                      <a href="#" className="date">
                        <Image
                          src="/assets/img/icons/date.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        8 de Diciembre de 2024
                      </a>
                    </div>
                    <h4>
                      <Link href="/blog/blog-details">
                        Cómo Aprovechar Schema Markup para Mejor Visibilidad en
                        Motores de Búsqueda
                      </Link>
                    </h4>
                    <Link className="theme-btn2" href="/blog/blog-details">
                      Leer Más{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
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

export default Blog2;
