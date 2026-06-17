import Link from "next/link";
import { FC } from "react";

interface BreadcrumbInlineProps {
  items: Array<{ label: string; href?: string }>;
}

const BreadcrumbInline: FC<BreadcrumbInlineProps> = ({ items }) => {
  return (
    <div className="breadcrumb-inline">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="breadcrumb-separator"> &gt; </span>
          )}
        </span>
      ))}
    </div>
  );
};

export default BreadcrumbInline;
