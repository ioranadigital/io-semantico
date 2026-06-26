export const dynamic = "force-dynamic";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo7 from "@/app/Components/ContactInfo/ContactInfo7";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Contacto"
      ></BreadCumb>
      <ContactInfo7
        title="Contáctanos IoranaSEO"
        heading="¿No Encontraste tu Respuesta? Solo Haz tus Preguntas"
        description="En IoranaSEO, entendemos que navegar por las complejidades del SEO y el marketing digital puede plantear numerosas preguntas. Aunque hemos cubierto una amplia gama de temas en nuestras Preguntas Frecuentes y comparaciones de planes SEO, reconocemos que cada negocio es único y es posible que tengas consultas específicas que no fueron abordadas. Subelo y dejalo alineado con el formulario de la derecha"
      ></ContactInfo7>
    </div>
  );
};

export default page;
