import PricingCard from "../Card/PricingCard";
import SectionTitle from "../Common/SectionTitle";
import { FC } from "react";

const Pricing1: FC = () => {
  return (
    <div className="pricing1 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading1-w">
              <SectionTitle
                SubTitle="plan de precios"
                Title="Planes de Precios de Marketing SEO"
              ></SectionTitle>
            </div>
          </div>
        </div>
        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
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

          <div className="col-lg-4 col-md-6">
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

          <div className="col-lg-4 col-md-6">
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

export default Pricing1;
