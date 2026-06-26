import Link from "next/link";
import { FC } from "react";

interface MegaMenuServiciosProps {
  isOpen: boolean;
  setMobileToggle?: (value: boolean) => void;
}

const MegaMenuServicios: FC<MegaMenuServiciosProps> = ({
  isOpen,
  setMobileToggle,
}) => {
  const handleLinkClick = () => {
    if (setMobileToggle) {
      setMobileToggle(false);
    }
  };

  return (
    <div className={`mega-menu-servicios ${isOpen ? "mega-menu-active" : ""}`}>
      <div className="mega-menu-content">
        <div className="mega-menu-grid">
          {/* Columna 1 */}
          <div className="mega-menu-column">
            {/* Grupo Superior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Visibilidad online general</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/servicios/posicionamiento-google"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Presencia Digital en Google
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/seo-local-prueba"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Servicio SEO Local
                  </Link>
                </li>
              </ul>
            </div>

            {/* Grupo Inferior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Campañas Publicitarias</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/servicios/google-ads"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Campañas de Google Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/facebook-ads"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Campañas de Facebook Ads
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="mega-menu-column">
            {/* Grupo Superior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Visibilidad online propia</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/servicios/pagina-web"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Diseñamos tu Página Web
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/tienda-online"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Tienda Online (e-Commerce)
                  </Link>
                </li>
              </ul>
            </div>

            {/* Grupo Inferior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Marketing automatizado</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/servicios/contenidos"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Contenidos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/whatsapp"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Notificaciones WhatsApp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/reservas-online"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Reservas Online
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="mega-menu-column">
            {/* Grupo Superior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Branding y estrategia</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/servicios/imagen-marca"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Imagen de Marca
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios/documentacion"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Documentación Controlada
                  </Link>
                </li>
              </ul>
            </div>

            {/* Grupo Inferior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Recursos</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Academia Beedigital
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Europages
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuServicios;
