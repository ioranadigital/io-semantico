'use client';

import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container-fluid py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-semibold text-gray-900">
            Resogar
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#apartamentos-destacados" className="text-gray-700 hover:text-gray-900 font-light">Apartamentos</a>
            <a href="/#experiencias" className="text-gray-700 hover:text-gray-900 font-light">Experiencias</a>
            <a href="/#contacto" className="text-gray-700 hover:text-gray-900 font-light">Contacto</a>
            <a href="/checkout" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all">
              Reservar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="/#apartamentos-destacados" className="block text-gray-700 hover:text-gray-900 font-light">Apartamentos</a>
            <a href="/#experiencias" className="block text-gray-700 hover:text-gray-900 font-light">Experiencias</a>
            <a href="/#contacto" className="block text-gray-700 hover:text-gray-900 font-light">Contacto</a>
            <a href="/checkout" className="block w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-center">
              Reservar
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
