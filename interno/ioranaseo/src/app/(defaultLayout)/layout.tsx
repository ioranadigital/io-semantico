import React from "react";
import ClientLayout from "../Components/ClientLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DefalultLayout({ children }: LayoutProps) {
  return <ClientLayout>{children}</ClientLayout>;
}
