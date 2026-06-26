import PricingCard2 from "../Card/PricingCard2";
import SectionTitle from "../Common/SectionTitle";
import { FC } from "react";

const Pricing2: FC = () => {
  return (
    <div className="pricing2 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading1">
              <SectionTitle
                SubTitle="plan de precios"
                Title="Planes de Precios de Marketing SEO"
              ></SectionTitle>
            </div>
          </div>
        </div>

        <div className="space30"></div>
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-duration="800">
            <PricingCard2
              title="Plan Básico"
              price="$599"
              duration="Mes"
              content="Ideal para pequeños negocios y startups que buscan establecerse."
              btnname="Elige Plan"
              btnurl="/pricing"
              FeatureList={[
                "Optimización SEO local",
                "Optimización básica de contenido",
                "Informes de rendimiento mensual",
                "Auditoría completa del sitio web",
                "Mejoras técnicas de SEO",
              ]}
            ></PricingCard2>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-duration="800">
            <PricingCard2
              title="Plan Pro"
              price="$999"
              duration="Mes"
              content="Ideal para pequeños negocios y startups que buscan establecerse."
              btnname="Elige Plan"
              btnurl="/pricing"
              FeatureList={[
                "Optimización SEO local",
                "Optimización básica de contenido",
                "Informes de rendimiento mensual",
                "Auditoría completa del sitio web",
                "Mejoras técnicas de SEO",
              ]}
            ></PricingCard2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing2;
