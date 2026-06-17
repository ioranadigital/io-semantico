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
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Presencia Digital en Google y en hasta 50 plataformas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
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
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Campañas de Google Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
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
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Páginas Web
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
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
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Factura Electrónica
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="mega-menu-column">
            {/* Grupo Superior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Gestión de redes sociales</h3>
              <ul className="mega-menu-links">
                <li>
                  <Link
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Herramienta de Gestión de Redes Sociales
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
                    onClick={handleLinkClick}
                    className="mega-menu-link"
                  >
                    Community Manager
                  </Link>
                </li>
              </ul>
            </div>

            {/* Grupo Inferior */}
            <div className="mega-menu-group">
              <h3 className="mega-menu-title">Otros servicios</h3>
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
