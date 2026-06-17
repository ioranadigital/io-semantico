import parse from "html-react-parser";
import Image from "next/image";
import { FC } from "react";

interface HeroBanner3Props {
  subtitle: string;
  title: string;
  content: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}

const HeroBanner3: FC<HeroBanner3Props> = ({
  subtitle,
  title,
  content,
  img1,
  img2,
  img3,
  img4,
}) => {
  return (
    <div className="hero3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="main-heading">
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
              <h1 className="text-anime-style-3">{title} </h1>
              <div className="space20"></div>
              <p data-aos="fade-right" data-aos-duration="800">
                {parse(content)}
              </p>
              <div
                className="form-area"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <form action="#">
                  <input type="email" placeholder="Your Web URL" />
                  <div className="form-btn">
                    <button type="submit" className="theme-btn2">
                      Analyze Website{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="main-images"
              data-aos="zoom-out"
              data-aos-duration="700"
            >
              <div className="shape1 animate1">
                <Image src={img1} alt="img" width={160} height={160} />
              </div>
              <div className="shape2 animate3">
                <Image src={img2} alt="img" width={225} height={196} />
              </div>
              <div className="main-img">
                <Image src={img3} alt="img" width={552} height={530} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="image1">
        <Image src={img4} alt="img" width={752} height={748} />
      </div>
    </div>
  );
};

export default HeroBanner3;
