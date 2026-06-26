"use client";
import { useEffect, useRef, useState, FC } from "react";
import SectionTitle2 from "../Common/SectionTitle2";

interface FAQ {
  title: string;
  desc: string;
}

interface FaqInicioProps {
  faqData: FAQ[];
  title?: string;
}

const FaqInicio: FC<FaqInicioProps> = ({
  faqData,
  title = "Preguntas Frecuentes",
}) => {
  const [openItemIndex, setOpenItemIndex] = useState(0);

  const handleItemClick = (index: number) => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };

  return (
    <div className="faq3 sp">
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-5">
              <div className="heading3">
                <SectionTitle2
                  SubTitle="Preguntas Frecuentes"
                  Title={title}
                ></SectionTitle2>
              </div>
            </div>

            <div className="accordion accordion1" id="accordionExample">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={`cs_accordian accordion-item ${
                    index === openItemIndex ? "active" : ""
                  }`}
                  data-aos="fade-up"
                  data-aos-duration="700"
                >
                  <h2 className="accordion-header">
                    <button
                      onClick={() => handleItemClick(index)}
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded={index === openItemIndex}
                    >
                      {item.title}
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse accordion-content ${
                      index === openItemIndex ? "show" : ""
                    }`}
                    style={{
                      maxHeight: index === openItemIndex ? "1000px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease-in-out",
                    }}
                  >
                    <div className="accordion-body">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqInicio;
