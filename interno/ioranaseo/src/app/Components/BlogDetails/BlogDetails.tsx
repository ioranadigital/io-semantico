"use client";
import { OptimizedImage } from "@/components";
import Link from "next/link";
import { FC } from "react";

const BlogDetails: FC = () => {
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
                  <div className="details-tagsdates">
                    <ul>
                      <li className="tag">
                        <a href="#">#Digital Marketing</a>
                      </li>
                      <li className="date">
                        <a href="#">
                          <OptimizedImage
                            src="/assets/img/icons/details-date.svg"
                            alt="img"
                            width={20}
                            height={20}
                          />{" "}
                          10 October 2023
                        </a>
                      </li>
                      <li className="date">
                        <a href="#">
                          <OptimizedImage
                            src="/assets/img/icons/details-comment.svg"
                            alt="img"
                            width={20}
                            height={20}
                          />{" "}
                          2 Comments
                        </a>
                      </li>
                    </ul>
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
                    <h3>Maximize Your SEO Digital Marketing Impact</h3>
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

              <div className="details-border"></div>
              <div className="details-social-area">
                <div className="row">
                  <div className="col-md-6">
                    <div className="tags-area">
                      <ul>
                        <li className="text">Posts Tags:</li>
                        <li className="tag">
                          <a href="#">Digital Marketing</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="social-area">
                      <ul>
                        <li className="text">Share On:</li>
                        <li className="icon">
                          <a href="#">
                            <i className="bi bi-twitter"></i>
                          </a>
                        </li>
                        <li className="icon">
                          <a href="#">
                            <i className="bi bi-linkedin"></i>
                          </a>
                        </li>
                        <li className="icon">
                          <a href="#">
                            <i className="bi bi-instagram"></i>
                          </a>
                        </li>
                        <li className="icon">
                          <a href="#">
                            <i className="bi bi-facebook"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space60"></div>
              <div className="comment-boxs">
                <div className="heading1">
                  <h3>Blog Comments (2)</h3>
                </div>
                <div className="comment-box">
                  <div className="outhor-area-all">
                    <div className="author-area">
                      <div className="image">
                        <OptimizedImage
                          src="/assets/img/blog/comment-img1.png"
                          alt="img"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="heading">
                        <a href="#" className="date">
                          <OptimizedImage
                            src="/assets/img/icons/date.svg"
                            alt="img"
                            width={20}
                            height={20}
                          />
                          8 December 2024
                        </a>
                        <h4>
                          <a href="#">Alex Robertson</a>
                        </h4>
                      </div>
                    </div>
                    <div className="reply-btn">
                      <a href="#">
                        <i className="fa-solid fa-reply"></i> Reply
                      </a>
                    </div>
                  </div>
                  <p>
                    SEO and digital marketing are crucial components of a
                    successful online strategy. SEO, or Search Engine
                    Optimization, involves optimizing your website to improve
                    its visibility on search engines like Google.{" "}
                  </p>
                </div>

                <div className="comment-box">
                  <div className="outhor-area-all">
                    <div className="author-area">
                      <div className="image">
                        <OptimizedImage
                          src="/assets/img/blog/comment-img1.png"
                          alt="img"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="heading">
                        <a href="#" className="date">
                          <OptimizedImage
                            src="/assets/img/icons/date.svg"
                            alt="img"
                            width={20}
                            height={20}
                          />{" "}
                          8 December 2024
                        </a>
                        <h4>
                          <a href="#">Alex Robertson</a>
                        </h4>
                      </div>
                    </div>
                    <div className="reply-btn">
                      <a href="#">
                        <i className="fa-solid fa-reply"></i> Reply
                      </a>
                    </div>
                  </div>
                  <p>
                    SEO and digital marketing are crucial components of a
                    successful online strategy. SEO, or Search Engine
                    Optimization, involves optimizing your website to improve
                    its visibility on search engines like Google.{" "}
                  </p>
                </div>
              </div>

              <div className="space60"></div>
              <div className="details-contact-area">
                <div className="heading1">
                  <h3>Leave A Reply Now</h3>
                </div>
                <div className="space30"></div>

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
                          <textarea
                            rows={5}
                            placeholder="Your Message"
                          ></textarea>
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
      </div>
    </div>
  );
};

export default BlogDetails;
