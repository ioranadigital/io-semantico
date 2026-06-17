import Image from "next/image";
import { FC } from "react";

const ContactInfo7: FC = () => {
  return (
    <div>
      <div className="faq-contact contact-page sp bg1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="heading3">
                <p className="title">
                  {" "}
                  <span className="span">
                    <Image
                      src="/assets/img/logo/main-span3.svg"
                      alt="img"
                      width={20}
                      height={20}
                    />
                    Contáctanos IoranaSEO
                  </span>
                </p>
                <h2>¿No Encontraste tu Respuesta? Solo Haz tus Preguntas</h2>
                <div className="space16"></div>
                <p>
                  En IoranaSEO, entendemos que navegar por las complejidades del
                  SEO y el marketing digital puede plantear numerosas preguntas.
                  Aunque hemos cubierto una amplia gama de temas en nuestras
                  Preguntas Frecuentes y comparaciones de planes SEO,
                  reconocemos que cada negocio es único y es posible que tengas
                  consultas específicas que no fueron abordadas.
                </p>

                <div className="faq-contact-boxs">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single-box">
                        <div className="icon">
                          <Image
                            src="/assets/img/icons/contact-icon1.svg"
                            alt="img"
                            width={33}
                            height={32}
                          />
                        </div>
                        <div className="heading">
                          <h6>Nuestro Correo</h6>
                          <a href="mailto:seomax@gmail.com">seomax@gmail.com</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-box">
                        <div className="icon">
                          <Image
                            src="/assets/img/icons/contact-icon2.svg"
                            alt="img"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="heading">
                          <h6>Teléfono</h6>
                          <a href="tel:+11234567890">+1 123 456 7890</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-contact-form">
                <h4>Envíanos un Mensaje</h4>
                <form action="#">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-input">
                        <input type="text" placeholder="Nombre" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input type="text" placeholder="Apellido" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input type="number" placeholder="Número de Teléfono" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="single-input">
                        <input type="email" placeholder="Correo Electrónico" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <input type="url" placeholder="URL del Sitio Web" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="single-input">
                        <textarea rows={5} placeholder="Tu Mensaje"></textarea>
                      </div>
                      <div className="space30"></div>
                      <div className="button">
                        <button className="theme-btn2">
                          Inicia tu Auditoría Gratis{" "}
                          <span>
                            <i className="bi bi-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="contact-map-page">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196064.65881483705!2d88.93201515862421!3d24.061083775097945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39febca82f6a21ed%3A0x4040980d7c6874f8!2sKushtia%20District!5e0!3m2!1sen!2sbd!4v1673751720794!5m2!1sen!2sbd"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="space100"></div>
    </div>
  );
};

export default ContactInfo7;
