"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface NavLink {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    href: "/",
    label: "Dashboard",
    description: "Resumen general",
    icon: <BarChart3 size={15} strokeWidth={1.5} />,
  },
  {
    href: "/optimizador",
    label: "Optimizador",
    description: "Herramienta de optimización",
    icon: <Zap size={15} strokeWidth={1.5} />,
  },
  {
    href: "/clientes",
    label: "Clientes",
    description: "Auditorías SEO",
    icon: <Users size={15} strokeWidth={1.5} />,
  },
  {
    href: "/optimizaciones",
    label: "Optimizaciones",
    description: "Propuestas generadas",
    icon: <Sparkles size={15} strokeWidth={1.5} />,
  },
];

const settingsLinks: NavLink[] = [
  {
    href: "/configuracion",
    label: "Configuración",
    description: "Ajustes del sistema",
    icon: <Settings size={15} strokeWidth={1.5} />,
  },
  {
    href: "/ayuda",
    label: "Ayuda",
    description: "Centro de soporte",
    icon: <HelpCircle size={15} strokeWidth={1.5} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Logo Area */}
      <div className="px-6 py-6 flex flex-col gap-4 border-b border-[#c8e6d4]">
        {/* Logo Icon + Brand Name */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#4aa87a] flex items-center justify-center text-white font-bold text-sm">
            io
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#1a1a1a]">io-Semántico</h1>
            <p className="text-[10px] text-[#6b7280]">SEO Automático</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {/* Main Navigation */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b9e80] px-2 mb-2">
            Principal
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-3 rounded-lg transition-all duration-200 flex gap-3 items-start group",
                isActive(link.href)
                  ? "bg-[#4aa87a] border-r-4 border-[#3d9068]"
                  : "hover:bg-[#d4ece0]",
              )}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "flex-shrink-0 mt-0.5",
                  isActive(link.href)
                    ? "text-white"
                    : "text-[#2d2d2d] group-hover:text-[#4aa87a]",
                )}
              >
                {link.icon}
              </div>

              {/* Text Container */}
              <div className="flex-1 flex flex-col gap-0.5">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive(link.href) ? "text-white" : "text-[#2d2d2d]",
                  )}
                >
                  {link.label}
                </span>
                <span
                  className={cn(
                    "text-[11px]",
                    isActive(link.href)
                      ? "text-white text-opacity-75"
                      : "text-[#6b7280]",
                  )}
                >
                  {link.description}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="my-4 border-t border-[#c8e6d4]" />

        {/* Settings Section */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b9e80] px-2 mb-2">
            Sistema
          </p>
          {settingsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-3 rounded-lg transition-all duration-200 flex gap-3 items-start group",
                isActive(link.href)
                  ? "bg-[#4aa87a] border-r-4 border-[#3d9068]"
                  : "hover:bg-[#d4ece0]",
              )}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "flex-shrink-0 mt-0.5",
                  isActive(link.href)
                    ? "text-white"
                    : "text-[#2d2d2d] group-hover:text-[#4aa87a]",
                )}
              >
                {link.icon}
              </div>

              {/* Text Container */}
              <div className="flex-1 flex flex-col gap-0.5">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive(link.href) ? "text-white" : "text-[#2d2d2d]",
                  )}
                >
                  {link.label}
                </span>
                <span
                  className={cn(
                    "text-[11px]",
                    isActive(link.href)
                      ? "text-white text-opacity-75"
                      : "text-[#6b7280]",
                  )}
                >
                  {link.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#c8e6d4] flex flex-col gap-3">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#d4ece0] hover:bg-[#c8e6d4] text-[#1a1a1a] text-sm font-medium transition-colors duration-200">
          <LogOut size={15} />
          Cerrar sesión
        </button>
        <p className="text-[11px] text-[#6b7280] text-center">
          v1.0.0 • Iorana Digital
        </p>
      </div>
    </>
  );
}
