"use client";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const ContactInfo6: FC = () => {
  return (
    <div className="faq-contact sp bg1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="heading1">
              <p className="title">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/icons/span1.svg"
                    alt="img"
                    width={21}
                    height={20}
                  />
                  Contact us IoranaSEO
                </span>
              </p>
              <h2>Not Found Your Answer? Just Ask Your Questions</h2>
              <div className="space16"></div>
              <p>
                At IoranaSEO, we understand that navigating the complexities of
                SEO and digital marketing can raise numerous questions. While we
                have covered a wide range of topics in our FAQs and plan SEO
                comparisons, we recognize that every business is unique, and you
                might have specific queries that were not addressed.
              </p>

              <div className="faq-contact-boxs">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-box">
                      <div className="icon">
                        <OptimizedImage
                          src="/assets/img/icons/contact-icon1.svg"
                          alt="img"
                          width={33}
                          height={32}
                        />
                      </div>
                      <div className="heading">
                        <h6>our Email</h6>
                        <a href="mailto:seomax@gmail.com">seomax@gmail.com</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-box">
                      <div className="icon">
                        <OptimizedImage
                          src="/assets/img/icons/contact-icon2.svg"
                          alt="img"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="heading">
                        <h6>Phone</h6>
                        <a href="tel:+11234567890">+1 123 456 7890</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="faq-contact-form">
              <h4>Send Us A Message</h4>
              <form action="#">
                <div className="row">
                  <div className="col-md-6">
                    <div className="single-input">
                      <input type="text" placeholder="First Name" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="single-input">
                      <input type="text" placeholder="Last Name" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="single-input">
                      <input type="number" placeholder="Phone Number" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="single-input">
                      <input type="email" placeholder="Email Address" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="single-input">
                      <input type="url" placeholder="Website URL" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="single-input">
                      <textarea rows={5} placeholder="Your Message"></textarea>
                    </div>
                    <div className="space30"></div>
                    <div className="button">
                      <button className="theme-btn1">
                        Start Your Free Audit{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo6;
