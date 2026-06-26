"use client";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface ContactInfo7Props {
  title?: string;
  heading?: string;
  description?: string;
  email?: string;
  phone?: string;
  buttonText?: string;
}

const ContactInfo7: FC<ContactInfo7Props> = ({
  title = "Contáctanos IoranaSEO",
  heading = "Contáctanos Hoy",
  description = "Completa el formulario y nuestro equipo se pondrá en contacto contigo para discutir tus necesidades de SEO y marketing digital.",
  email = "seomax@gmail.com",
  phone = "+1 123 456 7890",
  buttonText = "Inicia tu Auditoría Gratis",
}) => {
  return (
    <div>
      <div
        className="faq-contact contact-page sp bg1"
        style={{ marginTop: "-50px" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="heading3"
                style={{ padding: "0", marginTop: "-50px" }}
              >
                <p className="title">
                  {" "}
                  <span className="span">
                    <OptimizedImage
                      src="/assets/img/logo/main-span3.svg"
                      alt="img"
                      width={20}
                      height={20}
                    />
                    {title}
                  </span>
                </p>
                <h2>{heading}</h2>
                <div className="space16"></div>
                <p>{description}</p>

                <div className="faq-contact-boxs">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single-box">
                        <div className="icon">
                          <OptimizedImage
                            src="/assets/img/icons/contact-icon1.svg"
                            alt="img"
                            width={33}
                            height={32}
                          />
                        </div>
                        <div className="heading">
                          <h6>Nuestro Correo</h6>
                          <a href={`mailto:${email}`}>{email}</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-box">
                        <div className="icon">
                          <OptimizedImage
                            src="/assets/img/icons/contact-icon2.svg"
                            alt="img"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="heading">
                          <h6>Teléfono</h6>
                          <a href={`tel:${phone}`}>{phone}</a>
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
                          {buttonText}{" "}
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
    </div>
  );
};

export default ContactInfo7;
