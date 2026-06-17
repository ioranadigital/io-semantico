import { FC } from "react";

const ContactPlanesInicio: FC = () => {
  return (
    <section className="contact-planes-inicio-section">
      <div className="section-container">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-content-box">
                <h2>¿Listo para comenzar?</h2>
                <p>
                  Nuestro equipo de expertos en SEO está aquí para ayudarte a
                  crecer tu negocio online.
                </p>

                <form className="contact-form-planes" action="#">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Tu correo electrónico"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Tu sitio web"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Cuéntanos sobre tu negocio"
                    ></textarea>
                  </div>
                  <button type="submit" className="theme-btn1">
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPlanesInicio;
