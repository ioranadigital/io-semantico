import React from "react";
import "../globals.css";
import Header1 from "../Components/Header/Header1";
import Footer1 from "../Components/Footer/Footer1";
import RGPDModal from "../Components/Common/RGPDModal";

interface LayoutProps {
  children: React.ReactNode;
}

const DefalultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="main-page-area">
      <RGPDModal></RGPDModal>
      <Header1></Header1>
      <div
        className="common-hero"
        style={{
          height: "40px",
          backgroundColor: "#FFD700",
          width: "100%",
          display: "flex",
          alignItems: "center",
          margin: "0",
          padding: "0",
        }}
      ></div>
      {children}
      <Footer1
        addclass="footer1"
        footerlogo="/assets/img/logo/iorana-logo.svg"
      ></Footer1>
    </div>
  );
};

export default DefalultLayout;
