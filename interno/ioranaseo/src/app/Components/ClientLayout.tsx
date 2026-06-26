"use client";
import React from "react";
import Header1 from "./Header/Header1";
import Footer1 from "./Footer/Footer1";
import RGPDModal from "./Common/RGPDModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="main-page-area">
      <RGPDModal />
      <Header1 />
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
      />
      {children}
      <Footer1
        addclass="footer1"
        footerlogo="/assets/img/logo/iorana-logo.svg"
      />
    </div>
  );
}
