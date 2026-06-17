import React from "react";
import Footer1 from "../Components/Footer/Footer1";
import Header1 from "../Components/Header/Header1";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="main-page-area3">
      <Header1></Header1>
      {children}
      <Footer1
        addclass="footer1"
        footerlogo="/assets/img/logo/header-logo1.png"
      ></Footer1>
    </div>
  );
};

export default layout;
