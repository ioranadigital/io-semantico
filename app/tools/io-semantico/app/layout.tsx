import type { Metadata } from "next";
import "../src/styles/globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "io-Semántico",
  description: "SEO Automático",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-[#1a1a1a]">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r border-[#c8e6d4] bg-white flex flex-col overflow-hidden">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-[#fafafa]">{children}</main>
        </div>
      </body>
    </html>
  );
}
