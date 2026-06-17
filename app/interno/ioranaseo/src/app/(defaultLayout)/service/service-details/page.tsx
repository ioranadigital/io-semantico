import About6 from "@/app/Components/About/About6";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import ContactInfo4 from "@/app/Components/ContactInfo/ContactInfo4";
import ContactInfo5 from "@/app/Components/ContactInfo/ContactInfo5";
import Faq2 from "@/app/Components/Faq/Faq2";
import Partner from "@/app/Components/Partner/Partner";
import SeoBenefit from "@/app/Components/SeoBenefit/SeoBenefit";
import Services7 from "@/app/Components/Services/Services7";
import TableAnalysis from "@/app/Components/TableAnalysis/TableAnalysis";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/comon-hero-bg.jpg"
        Title="Página de Detalles de Servicio"
      ></BreadCumb>
      <About6
        subtitle="Marketing SEO"
        title="Desbloquea el Poder del SEO para Crecer tu Negocio"
        content="En IoranaSEO, nos especializamos en ayudar a los negocios a lograr mejores rankings en los motores de búsqueda a través de marketing SEO efectivo de nuestro equipo de expertos."
        list1="Tasas de Conversión Más Altas"
        list2="Dominio del Mercado Local"
        list3="Aumentar Tráfico del Sitio Web"
        list4="Promoción 24/7"
        img1="/assets/img/service/service2-tab1.png"
        img2="/assets/img/service/service2-tab2.png"
        img3="/assets/img/service/service2-tab3.png"
        img4="/assets/img/service/service2-tab4.png"
      ></About6>
      <Partner></Partner>
      <SeoBenefit></SeoBenefit>
      <ContactInfo5></ContactInfo5>
      <TableAnalysis></TableAnalysis>
      <Faq2></Faq2>
      <Services7></Services7>
      <ContactInfo4></ContactInfo4>
    </div>
  );
};

export default page;
