"use client";
import { useEffect, FC } from "react";
import loadBackgroudImages from "./loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";

interface BreadCumbProps {
  bgimg: string;
  Title: string;
}

const BreadCumb: FC<BreadCumbProps> = ({ bgimg, Title }) => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  return <div className="common-hero" data-background={bgimg}></div>;
};

export default BreadCumb;
