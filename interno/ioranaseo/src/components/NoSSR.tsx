"use client";
import dynamic from "next/dynamic";
import React from "react";

const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default dynamic(() => Promise.resolve(NoSSRWrapper), { ssr: false });
