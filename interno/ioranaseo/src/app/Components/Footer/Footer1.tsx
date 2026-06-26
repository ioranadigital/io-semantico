"use client";
import { OptimizedImage } from "@/components";
import Link from "next/link";
import { FC } from "react";

interface Footer1Props {
  addclass: string;
  footerlogo: string;
}

const Footer1: FC<Footer1Props> = ({ addclass, footerlogo }) => {
  return (
    <div
      className={addclass}
      style={{
        backgroundColor: "#f5f5f5",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="heading1">
              <a href="index.html" className="logo">
                <OptimizedImage
                  src={footerlogo}
                  alt="img"
                  width={160}
                  height={56}
                />
              </a>
              <p>
                En Iorana SEO, estamos comprometidos a ayudar a tu negocio a
                alcanzar sus objetivos en línea a través de marketing digital
                SEO experto.
              </p>
            </div>
          </div>
          <div className="col-lg col-6">
            <div className="menu-list">
              <h3>Enlaces Rápidos</h3>
              <ul>
                <li>
                  <Link href="/about">Sobre Nosotros</Link>
                </li>
                <li>
                  <Link href="/contact">Contáctanos</Link>
                </li>
                <li>
                  <Link href="/pricing">Plan de Precios</Link>
                </li>
                <li>
                  <Link href="/blog">Nuestros Artículos</Link>
                </li>
                <li>
                  <Link href="/case">Casos de Estudio</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg col-6">
            <div className="menu-list">
              <h3>Empresa</h3>
              <ul>
                <li>
                  <a href="#">Nuestro Portafolio</a>
                </li>
                <li>
                  <a href="#">Miembro del Equipo</a>
                </li>
                <li>
                  <a href="#">Plan de Precios</a>
                </li>
                <li>
                  <a href="#">Política de Privacidad</a>
                </li>
                <li>
                  <a href="#">Asociación</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg col-6">
            <div className="menu-list">
              <h3>Servicios</h3>
              <ul>
                <li>
                  <Link href="/service/service-details">Marketing SEO</Link>
                </li>
                <li>
                  <Link href="/service/service-details">
                    Marketing de Contenidos
                  </Link>
                </li>
                <li>
                  <Link href="/service/service-details">Marketing Digital</Link>
                </li>
                <li>
                  <Link href="/service/service-details">Email Marketing</Link>
                </li>
                <li>
                  <Link href="/service/service-details">
                    Estrategia de Marketing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg col-6">
            <div className="menu-list">
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link href="/legal">Términos y Condiciones</Link>
                </li>
                <li>
                  <a href="#">Política de Privacidad</a>
                </li>
                <li>
                  <a href="#">Política de Cookies</a>
                </li>
                <li>
                  <a href="#">Aviso Legal</a>
                </li>
                <li>
                  <a href="#">Contacto Legal</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space40"></div>
        <div className="footer-border"></div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="coppyright">
              <p>Copyright 2026 Iorana SEO | Todos los Derechos Reservados</p>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="footer-social">
              <li>
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="space20"></div>
    </div>
  );
};

export default Footer1;
