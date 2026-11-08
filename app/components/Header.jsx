'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'DSports', href: '/en-vivo/directv-sports' },
  { name: 'ESPN 1', href: '/en-vivo/espn-1' },
  { name: 'ESPN 2', href: '/en-vivo/espn-2' },
  { name: 'ESPN 3', href: '/en-vivo/espn-3' },
  { name: 'Fox Sports', href: '/en-vivo/fox-sports-1' },
  { name: 'Fox Sports 2', href: '/en-vivo/fox-sports-2' },
  { name: 'Fox Sports 3', href: '/en-vivo/fox-sports-3' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 text-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Fútbol Libre - Inicio"
          className="flex items-center space-x-2 min-w-0"
        >
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 md:h-9 md:w-9 object-contain flex-shrink-0"
          />
          <span className="text-xl md:text-2xl font-bold text-[#167a36] truncate">
            Fútbol Libre
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Canales principales" className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className="text-sm text-gray-700 hover:text-[#167a36] font-semibold transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movil"
          className="md:hidden p-2 -mr-2 rounded text-gray-700 hover:bg-gray-100 hover:text-[#167a36] transition"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="menu-movil"
          aria-label="Canales principales (móvil)"
          className="md:hidden border-t border-gray-200 bg-white px-4 py-2 max-h-[70vh] overflow-y-auto"
        >
          <ul className="divide-y divide-gray-100">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className="block py-3 text-sm font-semibold text-gray-700 hover:text-[#167a36] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}