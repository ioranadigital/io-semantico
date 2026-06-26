"use client";
import Link from "next/link";
import data from "../../Data/blog2.json";
import { OptimizedImage } from "@/components";
import { FC } from "react";

const BlogLeft: FC = () => {
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
                <h3>Popular Tags</h3>
                <div className="blog-writers">
                  <ul>
                    <li>
                      <OptimizedImage
                        src="/assets/img/blog/blog-writer1.png"
                        alt="img"
                        width={56}
                        height={56}
                      />
                    </li>
                    <li>
                      <OptimizedImage
                        src="/assets/img/blog/blog-writer2.png"
                        alt="img"
                        width={56}
                        height={56}
                      />
                    </li>
                    <li>
                      <OptimizedImage
                        src="/assets/img/blog/blog-writer3.png"
                        alt="img"
                        width={56}
                        height={56}
                      />
                    </li>
                    <li>
                      <OptimizedImage
                        src="/assets/img/blog/blog-writer4.png"
                        alt="img"
                        width={56}
                        height={56}
                      />
                    </li>
                    <li>
                      <OptimizedImage
                        src="/assets/img/blog/blog-writer5.png"
                        alt="img"
                        width={56}
                        height={56}
                      />
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
            <div className="blog1 row blog2 blog-page left-space30">
              {data.slice(0, 6).map((item, i) => (
                <div key={i} className="col-md-6">
                  <div className="blog-box">
                    <div className="image image-anime">
                      <OptimizedImage
                        src={item.img}
                        alt="img"
                        width={401}
                        height={303}
                      />
                    </div>
                    <div className="heading1">
                      <div className="author-area">
                        <a href="#" className="date">
                          <OptimizedImage
                            src="/assets/img/icons/author.svg"
                            alt="img"
                            width={20}
                            height={20}
                          />{" "}
                          Alex Roy
                        </a>
                        <a href="#" className="date">
                          <OptimizedImage
                            src="/assets/img/icons/date.svg"
                            alt="img"
                            width={20}
                            height={20}
                          />{" "}
                          8 December 2024
                        </a>
                      </div>
                      <h5>
                        <Link href="/blog/blog-details">{item.title}</Link>
                      </h5>
                      <div className="space20"></div>
                      <Link className="theme-btn1" href="/blog/blog-details">
                        Read More{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
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

export default BlogLeft;
