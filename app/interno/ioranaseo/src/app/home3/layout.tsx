import React from "react";
import Header2 from "../Components/Header/Header2";
import Footer1 from "../Components/Footer/Footer1";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="main-page-area3">
      <Header2></Header2>
      {children}
      <Footer1
        addclass="footer3"
        footerlogo="/assets/img/logo/header-logo3.png"
      ></Footer1>
    </div>
  );
};

export default layout;
