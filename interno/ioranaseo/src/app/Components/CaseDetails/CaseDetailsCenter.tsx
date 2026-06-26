"use client";
import { useEffect, useRef, useState, FC } from "react";
import data from "../../Data/faq.json";
import { OptimizedImage } from "@/components";

const CaseDetailsCenter: FC = () => {
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
    <div className="blog-details-area sp _relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="details-posts right">
              <article>
                <div className="details-post-single">
                  <div className="image image-anime">
                    <OptimizedImage
                      src="/assets/img/case/case-details-img1.png"
                      alt="img"
                      width={826}
                      height={555}
                    />
                  </div>
                  <div className="space30"></div>
                  <div className="heading1">
                    <h3>SEO Tracking Analysis</h3>
                    <div className="space16"></div>
                    <p>
                      SEO tracking is a multifaceted process that involves the
                      continuous monitoring of key performance indicators
                      (KPIs). These KPIs encompass organic traffic, keyword
                      rankings, bounce rates, click-through rates (CTR), and
                      conversion rates. Organic to traffic, for instance,
                      measures the number of visitors arriving at a website from
                      an search engines, providing a clear indication of how
                      well the site is performing in the organic search results.
                      An upward trend in organic traffic is a of effective SEO
                      best strategies, signaling increased visibility and
                      engagement SEO tracking analysis.
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <ul className="details-list">
                        <li>
                          <span className="check">
                            <i className="bi bi-check-lg"></i>
                          </span>{" "}
                          Advanced Reporting & Analytics
                        </li>
                        <li>
                          <span className="check">
                            <i className="bi bi-check-lg"></i>
                          </span>{" "}
                          Customizable Branding Options
                        </li>
                        <li>
                          <span className="check">
                            <i className="bi bi-check-lg"></i>
                          </span>{" "}
                          Start Your Journey To Success
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-7">
                      <ul className="details-list">
                        <li>
                          <span className="check">
                            <i className="bi bi-check-lg"></i>
                          </span>{" "}
                          User-Friendly Interface
                        </li>
                        <li>
                          <span className="check">
                            <i className="bi bi-check-lg"></i>
                          </span>{" "}
                          Role-Based Access Control
                        </li>
                        <li>
                          <span className="check">
                            <i className="bi bi-check-lg"></i>
                          </span>{" "}
                          API Access For Seamless
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              <div className="space70"></div>
              <article>
                <div className="details-post-single">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="image image-anime">
                        <OptimizedImage
                          src="/assets/img/case/case-details-img2.png"
                          alt="img"
                          width={401}
                          height={347}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="image image-anime">
                        <OptimizedImage
                          src="/assets/img/case/case-details-img3.png"
                          alt="img"
                          width={401}
                          height={347}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space30"></div>
                  <div className="heading1">
                    <h3>E-commerce SEO And Digital Marketing</h3>
                    <div className="space16"></div>
                    <p>
                      In the highly competitive world of e-commerce, SEO and
                      digital marketing are critical tools for driving traffic,
                      increasing visibility, and boosting sales. Effective
                      e-commerce SEO involves optimizing a website so that it
                      ranks higher in search.
                    </p>
                  </div>
                </div>
              </article>

              <div className="space60"></div>
              <div className="heading1">
                <h3>Frequently Asked Questions (FAQs)</h3>
              </div>
              <div className="space10"></div>
              <div className="details-accodion">
                <div className="accordion accordion1" id="accordionExample">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className={`cs_accordian accordion-item ${index === openItemIndex ? "active" : ""}`}
                    >
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          onClick={() => handleItemClick(index)}
                          className="accordion-button"
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
      </div>
    </div>
  );
};

export default CaseDetailsCenter;
