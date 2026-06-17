import Link from "next/link";
import DropDown from "./DropDown";
import { FC } from "react";

interface NavProps {
  setMobileToggle: (value: boolean) => void;
}

const Nav: FC<NavProps> = ({ setMobileToggle }) => {
  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link href="/" onClick={() => setMobileToggle(false)}>
          Inicio
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link href="/servicios" onClick={() => setMobileToggle(false)}>
          Servicios
        </Link>
        <DropDown>
          <ul>
            <li className="menu-item-has-children">
              <Link href="#">SEO & Visibilidad</Link>
              <DropDown>
                <ul>
                  <li>
                    <Link
                      href="/servicios/posicionamiento-google"
                      onClick={() => setMobileToggle(false)}
                    >
                      Presencia Digital en Google
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicios/seo-local-prueba"
                      onClick={() => setMobileToggle(false)}
                    >
                      SEO Local
                    </Link>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li className="menu-item-has-children">
              <Link href="#">Visibilidad Web</Link>
              <DropDown>
                <ul>
                  <li>
                    <Link
                      href="/servicios/pagina-web"
                      onClick={() => setMobileToggle(false)}
                    >
                      Páginas Web
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicios/tienda-online"
                      onClick={() => setMobileToggle(false)}
                    >
                      Tienda Online (e-commerce)
                    </Link>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li className="menu-item-has-children">
              <Link href="#">Campañas Publicitarias</Link>
              <DropDown>
                <ul>
                  <li>
                    <Link
                      href="/servicios/google-ads"
                      onClick={() => setMobileToggle(false)}
                    >
                      Campañas de Google Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicios/facebook-ads"
                      onClick={() => setMobileToggle(false)}
                    >
                      Campañas de Facebook Ads
                    </Link>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li className="menu-item-has-children">
              <Link href="#">Marca y Contenidos</Link>
              <DropDown>
                <ul>
                  <li>
                    <Link
                      href="/servicios/contenidos"
                      onClick={() => setMobileToggle(false)}
                    >
                      Contenidos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicios/imagen-marca"
                      onClick={() => setMobileToggle(false)}
                    >
                      Imagen de Marca
                    </Link>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li className="menu-item-has-children">
              <Link href="#">Automatizaciones</Link>
              <DropDown>
                <ul>
                  <li>
                    <Link
                      href="/service"
                      onClick={() => setMobileToggle(false)}
                    >
                      IA y Automatizaciones
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/service"
                      onClick={() => setMobileToggle(false)}
                    >
                      Factura Electrónica
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/service"
                      onClick={() => setMobileToggle(false)}
                    >
                      CRM
                    </Link>
                  </li>
                </ul>
              </DropDown>
            </li>
            <li className="menu-item-has-children">
              <Link href="#">Soluciones Inteligentes</Link>
              <DropDown>
                <ul>
                  <li>
                    <Link
                      href="/servicios/documentacion"
                      onClick={() => setMobileToggle(false)}
                    >
                      Documentación Controlada
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicios/whatsapp"
                      onClick={() => setMobileToggle(false)}
                    >
                      Notificaciones WhatsApp
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicios/reservas-online"
                      onClick={() => setMobileToggle(false)}
                    >
                      Reservas Online
                    </Link>
                  </li>
                </ul>
              </DropDown>
            </li>
          </ul>
        </DropDown>
      </li>
      <li>
        <Link href="/informe-gratuito" onClick={() => setMobileToggle(false)}>
          Informe
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link href="/planes" onClick={() => setMobileToggle(false)}>
          Planes
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link
                href="/planes/compara"
                onClick={() => setMobileToggle(false)}
              >
                Compara los Planes
              </Link>
            </li>
            <li>
              <Link
                href="/planes/inicio"
                onClick={() => setMobileToggle(false)}
              >
                Plan Inicial
              </Link>
            </li>
            <li>
              <Link
                href="/planes/basico"
                onClick={() => setMobileToggle(false)}
              >
                Plan Básico
              </Link>
            </li>
            <li>
              <Link
                href="/planes/avanzado"
                onClick={() => setMobileToggle(false)}
              >
                Plan Avanzado
              </Link>
            </li>
            <li>
              <Link
                href="/planes/premium"
                onClick={() => setMobileToggle(false)}
              >
                Plan Premium
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li className="menu-item-has-children">
        <Link href="/case" onClick={() => setMobileToggle(false)}>
          Casos de Estudio
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/case" onClick={() => setMobileToggle(false)}>
                Casos de Estudio
              </Link>
            </li>
            <li>
              <Link
                href="/case/case-details"
                onClick={() => setMobileToggle(false)}
              >
                Detalles de Caso Izquierda
              </Link>
            </li>
            <li>
              <Link
                href="/case/case-details-right"
                onClick={() => setMobileToggle(false)}
              >
                Detalles de Caso Derecha
              </Link>
            </li>
            <li>
              <Link
                href="/case/case-details-center"
                onClick={() => setMobileToggle(false)}
              >
                Detalles de Caso Centro
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li className="menu-item-has-children">
        <Link href="/blog" onClick={() => setMobileToggle(false)}>
          Blog
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/blog" onClick={() => setMobileToggle(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/blog-right" onClick={() => setMobileToggle(false)}>
                Blog Barra Lateral Derecha
              </Link>
            </li>
            <li>
              <Link href="/blog-left" onClick={() => setMobileToggle(false)}>
                Blog Barra Lateral Izquierda
              </Link>
            </li>
            <li>
              <Link
                href="/blog/blog-details"
                onClick={() => setMobileToggle(false)}
              >
                Detalles de Blog
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li>
        <Link href="/contact" onClick={() => setMobileToggle(false)}>
          Contacto
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link href="#">Páginas</Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/about" onClick={() => setMobileToggle(false)}>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/testimonial" onClick={() => setMobileToggle(false)}>
                Testimonios
              </Link>
            </li>
            <li>
              <Link href="/pricing" onClick={() => setMobileToggle(false)}>
                Precios
              </Link>
            </li>
            <li>
              <Link href="/faq" onClick={() => setMobileToggle(false)}>
                Preguntas Frecuentes
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
    </ul>
  );
};

export default Nav;
