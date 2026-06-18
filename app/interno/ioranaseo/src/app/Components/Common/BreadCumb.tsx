"use client";
import { useEffect, FC } from "react";
import loadBackgroudImages from "./loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbInline from "../HeroBanner/BreadcrumbInline";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadCumbProps {
  bgimg: string;
  Title: string;
  breadcrumbs?: BreadcrumbItem[];
}

const BreadCumb: FC<BreadCumbProps> = ({ bgimg, Title, breadcrumbs }) => {
  useEffect(() => {
    loadBackgroudImages();
  }, []);

  // Default breadcrumbs if not provided
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: "Inicio", href: "/" },
    { label: Title },
  ];

  const items = breadcrumbs || defaultBreadcrumbs;

  return (
    <div
      className="common-hero"
      data-background={bgimg}
      style={{ marginTop: "25px" }}
    >
      <div className="breadcrumb-container" style={{ padding: "0" }}>
        <div className="container">
          <BreadcrumbInline items={items} />
        </div>
      </div>
    </div>
  );
};

export default BreadCumb;
