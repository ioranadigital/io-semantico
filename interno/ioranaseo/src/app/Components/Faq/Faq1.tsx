"use client";
import { useEffect, useRef, useState, FC } from "react";
import data from "../../Data/faq.json";
import SectionTitle2 from "../Common/SectionTitle2";

interface FAQ {
  title: string;
  desc: string;
}

interface Faq1Props {
  faqData?: FAQ[];
  title?: string;
}

const Faq1: FC<Faq1Props> = ({ faqData, title = "Preguntas Frecuentes" }) => {
  const accordionContentRef = useRef(null);
  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  const handleItemClick = (index: number) => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };
  useEffect(() => {
    if (firstItemOpen) {
      setOpenItemIndex(0);
      setFirstItemOpen(false);
    }
  }, [firstItemOpen]);

  return (
    <div className="faq3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto text-center">
            <div className="heading3">
              <SectionTitle2
                SubTitle="Preguntas Frecuentes"
                Title={title}
              ></SectionTitle2>
            </div>

            <div className="space40"></div>

            <div className="accordion accordion1" id="accordionExample">
              {(faqData || data).map((item, index) => (
                <div
                  key={index}
                  className={`cs_accordian accordion-item ${index === openItemIndex ? "active" : ""}`}
                  data-aos="fade-up"
                  data-aos-duration="700"
                >
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      onClick={() => handleItemClick(index)}
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {item.title}
                    </button>
                  </h2>
                  <div
                    ref={accordionContentRef}
                    id="collapseOne"
                    className="accordion-collapse accordion-content"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
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

export default Faq1;
