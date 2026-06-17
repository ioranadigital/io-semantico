import React from "react";
import Footer1 from "../Components/Footer/Footer1";
import Header3 from "../Components/Header/Header3";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="main-page-area3">
      <Header3></Header3>
      {children}
      <Footer1
        addclass="footer5"
        footerlogo="/assets/img/logo/header-logo5.png"
      ></Footer1>
    </div>
  );
};

export default layout;
