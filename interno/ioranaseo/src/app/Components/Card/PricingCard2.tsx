import Link from "next/link";
import { FC } from "react";

interface PricingCard2Props {
  title: string;
  price: string;
  duration: string;
  content: string;
  btnname: string;
  btnurl: string;
  FeatureList?: string[];
}

const PricingCard2: FC<PricingCard2Props> = ({
  title,
  price,
  duration,
  content,
  btnname,
  btnurl,
  FeatureList,
}) => {
  return (
    <div className="pricing2-box">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="heading">
            <h6>{title}</h6>
            <h3>
              {price}
              <span>/{duration}</span>
            </h3>
            <p>{content}</p>
            <div className="space30"></div>
            <Link className="theme-btn1" href={btnurl}>
              {btnname}{" "}
              <span>
                <i className="bi bi-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <ul className="pricing-list">
            {FeatureList?.map((item, index) => (
              <li key={index}>
                <span>
                  <i className="bi bi-check-lg"></i>
                </span>{" "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingCard2;
