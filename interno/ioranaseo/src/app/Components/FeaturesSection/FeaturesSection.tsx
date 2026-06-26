"use client";
import { CheckCircle, Zap, Award } from "lucide-react";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  features?: Feature[];
  imageSrc?: string;
  imageAlt?: string;
}

const FeaturesSection: FC<FeaturesSectionProps> = ({
  title = "¿Por qué es importante el",
  titleHighlight = "SEO Local?",
  description = "Somos especialistas en posicionar negocios locales en Google. Con más de 80 proyectos exitosos, sabemos exactamente qué funciona.",
  features: customFeatures,
  imageSrc = "/assets/img/work/hombre-mujer-empreendedores-online.jpg",
  imageAlt = "Profesionales de SEO Local",
}) => {
  const defaultFeatures: Feature[] = [
    {
      icon: <CheckCircle size={32} />,
      title: "Estrategia Personalizada",
      description:
        "Diseñamos una estrategia SEO Local única para tu negocio, basada en tu sector, competencia y objetivos específicos.",
    },
    {
      icon: <Zap size={32} />,
      title: "Resultados Rápidos",
      description:
        "Implementamos técnicas probadas que generan visibilidad en Google Local dentro de las primeras semanas de trabajo.",
    },
    {
      icon: <Award size={32} />,
      title: "Garantía de Posicionamiento",
      description:
        "Te posicionamos en el Local Pack de Google o ajustamos nuestra estrategia sin costo adicional hasta lograrlo.",
    },
  ];

  const features: Feature[] = customFeatures || defaultFeatures;

  return (
    <section
      style={{
        padding: "60px 20px",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "16px",
              lineHeight: "1.3",
              margin: "0 0 16px 0",
            }}
          >
            {title} <span style={{ color: "#4D32A5" }}>{titleHighlight}</span>
          </h2>
          <div
            style={{
              height: "4px",
              width: "120px",
              backgroundColor: "#4D32A5",
              borderRadius: "2px",
              marginBottom: "24px",
            }}
          ></div>
          <p
            style={{
              maxWidth: "600px",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.6",
              margin: "0",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Left Column - Features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "40px",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "64px",
                    height: "64px",
                    minWidth: "64px",
                    borderRadius: "12px",
                    backgroundColor: "#EDE9FE",
                    color: "#4D32A5",
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "8px",
                      margin: "0 0 8px 0",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Image with Wave Effect */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: "500px",
              marginTop: "-120px",
            }}
          >
            {/* Animated Wave Background */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "550px",
                height: "550px",
                zIndex: 0,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 288 288"
                style={{ width: "100%", height: "100%" }}
              >
                <linearGradient
                  id="waveGradient"
                  x1="70.711%"
                  x2="0%"
                  y1="70.711%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#4D32A5" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7B68EE" stopOpacity="1" />
                </linearGradient>
                <path fill="url(#waveGradient)" d="">
                  <animate
                    repeatCount="indefinite"
                    attributeName="d"
                    dur="10s"
                    values="M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
                    c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
                    c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
                    c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z;
                    M51,171.3c-6.1-17.7-15.3-17.2-20.7-32c-8-21.9,0.7-54.6,20.7-67.1c19.5-12.3,32.8,5.5,67.7-3.4C145.2,62,145,49.9,173,43.4
                    c12-2.8,41.4-9.6,60.2,6.6c19,16.4,16.7,47.5,16,57.7c-1.7,22.8-10.3,25.5-9.4,46.4c1,22.5,11.2,25.8,9.1,42.6
                    c-2.2,17.6-16.3,37.5-33.5,40.8c-22,4.1-29.4-22.4-54.9-22.6c-31-0.2-40.8,39-68.3,35.7c-17.3-2-32.2-19.8-37.3-34.8
                    C48.9,198.6,57.8,191,51,171.3z;
                    M37.5,186c-12.1-10.5-11.8-32.3-7.2-46.7c4.8-15,13.1-17.8,30.1-36.7C91,68.8,83.5,56.7,103.4,45
                    c22.2-13.1,51.1-9.5,69.6-1.6c18.1,7.8,15.7,15.3,43.3,33.2c28.8,18.8,37.2,14.3,46.7,27.9c15.6,22.3,6.4,53.3,4.4,60.2
                    c-3.3,11.2-7.1,23.9-18.5,32c-16.3,11.5-29.5,0.7-48.6,11c-16.2,8.7-12.6,19.7-28.2,33.2c-22.7,19.7-63.8,25.7-79.9,9.7
                    c-15.2-15.1,0.3-41.7-16.6-54.9C63,186,49.7,196.7,37.5,186z"
                  />
                </path>
              </svg>
            </div>

            {/* Image Container */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "400px",
                height: "400px",
                backgroundColor: "#ffffff",
                borderRadius: "60% 40% 50% 65% / 50% 60% 40% 65%",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(77, 50, 165, 0.2)",
              }}
            >
              <OptimizedImage
                src={imageSrc}
                alt={imageAlt}
                width={450}
                height={450}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
