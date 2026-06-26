"use client";
import { useEffect, useRef, useState, FC } from "react";
import data from "../../Data/faq.json";
import { OptimizedImage } from "@/components";
import Link from "next/link";

const CaseDetailsLeft: FC = () => {
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
          <div className="col-lg-4">
            <div className="side-all">
              <div className="details-sidebox">
                <h3>Search</h3>
                <div className="search-area">
                  <form action="#">
                    <input type="search" placeholder="Search..." />
                    <div className="button">
                      <button type="submit">
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="details-sidebox">
                <h3>Case Studies Category</h3>
                <div className="categorys">
                  <ul>
                    <li>
                      <Link href="/case/case-details">
                        SEO & Digital Marketing{" "}
                        <span className="arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/case/case-details">
                        Pay-Per-Click Strategy{" "}
                        <span className="arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/case/case-details">
                        Social Media Success{" "}
                        <span className="arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/case/case-details">
                        Social Media Campaigns{" "}
                        <span className="arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/case/case-details">
                        Local Business Marketing{" "}
                        <span className="arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/case/case-details">
                        E-commerce SEO{" "}
                        <span className="arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="details-sidebox">
                <h3>Popular Tags</h3>
                <div className="tags">
                  <ul>
                    <li>
                      <a href="#">#Digital Marketing</a>
                    </li>
                    <li>
                      <a href="#">#SEO Strategies</a>
                    </li>
                    <li>
                      <a href="#">#SEO Success Story</a>
                    </li>
                    <li>
                      <a href="#">#Client Success</a>
                    </li>
                    <li>
                      <a href="#">Online Marketing</a>
                    </li>
                    <li>
                      <a href="#">Marketing Results</a>
                    </li>
                    <li>
                      <a href="#">Business Growth</a>
                    </li>
                    <li>
                      <a href="#">SEO Strategies</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="details-sidebox">
                <h3>If You Need Any SEO And Digital Marketing Help ?</h3>
                <div className="phone-btn">
                  <a href="tel:(123)3344567890">
                    <OptimizedImage
                      src="/assets/img/icons/details-call-icon.svg"
                      alt="img"
                      width={24}
                      height={24}
                    />{" "}
                    (123) 334 456 7890
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="details-posts left">
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

export default CaseDetailsLeft;
