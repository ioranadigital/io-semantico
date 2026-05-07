'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? 'text-amber-600 font-semibold' : 'text-gray-700 hover:text-amber-600';

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-amber-700">
          Resogar
        </Link>

        <div className="flex gap-8">
          <Link href="/" className={`transition ${isActive('/')}`}>
            Home
          </Link>
          <Link href="/apartamentos" className={`transition ${isActive('/apartamentos')}`}>
            Apartamentos
          </Link>
          <Link href="/contacto" className={`transition ${isActive('/contacto')}`}>
            Contacto
          </Link>
          <Link href="/admin" className={`transition ${isActive('/admin')}`}>
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
