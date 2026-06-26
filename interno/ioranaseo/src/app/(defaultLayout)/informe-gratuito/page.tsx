export const dynamic = "force-dynamic";
import React from "react";
import BreadcrumbInline from "../../Components/HeroBanner/BreadcrumbInline";
import AuditoriaGratis from "../../Components/AuditoriaGratis/AuditoriaGratis";

const InformeGratuito = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          paddingLeft: "470px",
          paddingRight: "15px",
          paddingTop: "50px",
          paddingBottom: "10px",
          backgroundColor: "#f9fafb",
        }}
      >
        <BreadcrumbInline
          items={[
            { label: "Inicio", href: "/" },
            { label: "Informe Gratuito" },
          ]}
        />
      </div>

      <AuditoriaGratis></AuditoriaGratis>
    </div>
  );
};

export default InformeGratuito;
