"use client";
import { OptimizedImage } from "@/components";
import PricingCard3 from "../Card/PricingCard3";
import { FC } from "react";

const Pricing5: FC = () => {
  return (
    <div className="pricing5 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading5">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/logo/span5.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  plan de precios
                </span>
              </p>
              <h2 className="text-anime-style-3">
                Planes de Precios de Marketing SEO
              </h2>
            </div>
          </div>
        </div>
        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <PricingCard3
              addclass="pricing-box"
              title="Básico"
              content="Ideal para pequeños negocios y startups que buscan establecer una presencia en línea."
              FeatureList={[
                "Optimización SEO local",
                "Optimización básica de contenido",
                "Informes de rendimiento mensual",
                "Auditoría completa del sitio web",
                "Mejoras técnicas de SEO",
                "Gestión de generación de reseñas",
              ]}
              price="$599"
              pricename="Mes"
              btnurl="/pricing"
              btnname="Elige Plan"
            ></PricingCard3>
          </div>

          <div className="col-lg-4 col-md-6">
            <PricingCard3
              addclass="pricing-box active"
              title="Premium"
              content="Ideal para pequeños negocios y startups que buscan establecer una presencia en línea."
              FeatureList={[
                "Optimización SEO local",
                "Optimización básica de contenido",
                "Informes de rendimiento mensual",
                "Auditoría completa del sitio web",
                "Mejoras técnicas de SEO",
                "Gestión de generación de reseñas",
              ]}
              price="$699"
              pricename="Mes"
              btnurl="/pricing"
              btnname="Elige Plan"
            ></PricingCard3>
          </div>

          <div className="col-lg-4 col-md-6">
            <PricingCard3
              addclass="pricing-box"
              title="Avanzado"
              content="Ideal para pequeños negocios y startups que buscan establecer una presencia en línea."
              FeatureList={[
                "Optimización SEO local",
                "Optimización básica de contenido",
                "Informes de rendimiento mensual",
                "Auditoría completa del sitio web",
                "Mejoras técnicas de SEO",
                "Gestión de generación de reseñas",
              ]}
              price="$799"
              pricename="Mes"
              btnurl="/pricing"
              btnname="Elige Plan"
            ></PricingCard3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing5;
