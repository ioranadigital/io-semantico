"use client";
import parse from "html-react-parser";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface SectionTitleProps {
  Title: string;
  SubTitle: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ Title, SubTitle }) => {
  return (
    <div>
      <p className="title" data-aos="fade-left" data-aos-duration="800">
        {" "}
        <span className="span">
          <OptimizedImage
            src="/assets/img/icons/span1.svg"
            alt="img"
            width={21}
            height={20}
          />
          {parse(SubTitle)}
        </span>
      </p>
      <h2 className="text-anime-style-3">{parse(Title)}</h2>
    </div>
  );
};

export default SectionTitle;
