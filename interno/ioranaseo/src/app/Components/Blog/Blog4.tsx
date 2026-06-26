"use client";
import { OptimizedImage } from "@/components";
import Link from "next/link";
import { FC } from "react";

const Blog4: FC = () => {
  return (
    <div className="blog3 sp">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto text-center">
            <div className="heading1">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <OptimizedImage
                    src="/assets/img/icons/span1.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  our blog
                </span>
              </p>
              <h2 className="text-anime-style-3">Our Latest Articles & Blog</h2>
            </div>
          </div>
        </div>

        <div className="space40"></div>
        <div className="col-lg-10 m-auto">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div
                className="blog-box"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <div className="image image-anime">
                  <OptimizedImage
                    src="/assets/img/blog/blog3-img.png"
                    alt="img"
                    width={620}
                    height={429}
                  />
                </div>
                <div className="heading3">
                  <div className="author-area">
                    <a href="#" className="date">
                      <OptimizedImage
                        src="/assets/img/icons/author.svg"
                        alt="img"
                        width={20}
                        height={20}
                      />{" "}
                      Alex Carey
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
                  <h4>
                    <Link href="/blog/blog-details">
                      How to Optimize Your Website for Voice Search: Tips and
                      Best Practices in SEO
                    </Link>
                  </h4>
                  <p>
                    In 2024, staying ahead of SEO trends is crucial for
                    maintaining high visibility in search engine results,
                    discover ten proven SEO.
                  </p>
                  <div className="space30"></div>
                  <Link className="theme-btn1" href="/blog/blog-details">
                    Read More{" "}
                    <span>
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="" data-aos="fade-up" data-aos-duration="700">
                <div className="blog-box smoll">
                  <div className="heading3">
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
                    <h4>
                      <Link href="/blog/blog-details">
                        The Importance of Backlinks and How to Build a Strong
                        Link Profile
                      </Link>
                    </h4>
                    <Link className="theme-btn1" href="/blog/blog-details">
                      Read More{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="" data-aos="fade-up" data-aos-duration="700">
                <div className="blog-box smoll">
                  <div className="heading3">
                    <div className="author-area">
                      <a href="#" className="date">
                        <OptimizedImage
                          src="/assets/img/icons/author.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        Alex Hales
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
                    <h4>
                      <Link href="/blog/blog-details">
                        Role of Technical SEO in Improving Your Website’s
                        Performance in SEO
                      </Link>
                    </h4>
                    <Link className="theme-btn1" href="/blog/blog-details">
                      Read More{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="" data-aos="fade-up" data-aos-duration="700">
                <div className="blog-box smoll">
                  <div className="heading3">
                    <div className="author-area">
                      <a href="#" className="date">
                        <OptimizedImage
                          src="/assets/img/icons/author.svg"
                          alt="img"
                          width={20}
                          height={20}
                        />{" "}
                        Alex Carey
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
                    <h4>
                      <Link href="/blog/blog-details">
                        How to Leverage Schema Markup for Better Search Engine
                        Visibility
                      </Link>
                    </h4>
                    <Link className="theme-btn1" href="/blog/blog-details">
                      Read More{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog4;
