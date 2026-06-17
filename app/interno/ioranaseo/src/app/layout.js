import { Outfit } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "./assets/main.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--body-color-font",
});

export const metadata = {
  title: {
    absolute: "",
    default: "Seomax - SEO & Digital Marketing Agency NextJS Template",
    template: "%s | Seomax - SEO & Digital Marketing Agency NextJS Template",
  },
  description: "Seomax - SEO & Digital Marketing Agency NextJS Template",
  openGraph: {
    title: "Seomax - SEO & Digital Marketing Agency NextJS Template",
    description: "Seomax - SEO & Digital Marketing Agency NextJS Template",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${outfit.variable}`}>{children}</body>
    </html>
  );
}
