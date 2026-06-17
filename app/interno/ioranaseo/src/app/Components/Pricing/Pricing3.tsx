import PricingCard from "../Card/PricingCard";
import SectionTitle2 from "../Common/SectionTitle2";
import { FC } from "react";

const Pricing3: FC = () => {
  return (
    <div className="pricing3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading3">
              <SectionTitle2
                SubTitle="plan de precios"
                Title="Elige uno de Nuestros Planes"
              ></SectionTitle2>
            </div>
          </div>
        </div>
        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <PricingCard
              addclass="pricing-box"
              title="Inicio"
              content="Perfecto para emprendedores que recién comienzan su presencia en línea."
              FeatureList={[
                "Análisis básico del sitio web",
                "Optimización de palabras clave",
                "Reporte básico mensual",
                "Optimización de títulos y metadatos",
                "Auditoría SEO inicial",
              ]}
              price="$299"
              pricename="Mes"
              btnurl="/pricing"
              btnname="Elige Plan"
            ></PricingCard>
          </div>

          <div className="col-lg-3 col-md-6">
            <PricingCard
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
            ></PricingCard>
          </div>

          <div className="col-lg-3 col-md-6">
            <PricingCard
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
            ></PricingCard>
          </div>

          <div className="col-lg-3 col-md-6">
            <PricingCard
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
            ></PricingCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing3;
