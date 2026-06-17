import Link from "next/link";
import data from "../../Data/counter.json";
import Image from "next/image";
import { FC } from "react";

interface About3Props {
  subtitle: string;
  title: string;
  content: string;
  FeatureList?: string[];
  btnurl: string;
  btnname: string;
}

const About3: FC<About3Props> = ({
  subtitle,
  title,
  content,
  FeatureList,
  btnurl,
  btnname,
}) => {
  return (
    <div className="about1 sp">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about3-boxs">
              <div className="row">
                {data.map((item, i) => (
                  <div
                    key={i}
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-duration="600"
                  >
                    <div className="about3-box">
                      <div className="icon">
                        <Image
                          src={item.img}
                          alt="img"
                          width={44}
                          height={44}
                        />
                      </div>
                      <div className="heading">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="heading3">
              <p className="title" data-aos="fade-left" data-aos-duration="800">
                {" "}
                <span className="span">
                  <Image
                    src="/assets/img/logo/main-span3.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                  {subtitle}
                </span>
              </p>
              <h2 className="text-anime-style-3">{title}</h2>
              <div className="space16"></div>
              <p data-aos="fade-left" data-aos-duration="900">
                {content}
              </p>
              <ul
                className="about-list"
                data-aos="fade-left"
                data-aos-duration="900"
              >
                {FeatureList?.map((item, index) => (
                  <li key={index}>
                    <span>
                      <i className="bi bi-check-lg"></i>
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space30"></div>
              <div className="" data-aos="fade-left" data-aos-duration="700">
                <Link className="theme-btn2" href={btnurl}>
                  {btnname}{" "}
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
  );
};

export default About3;
