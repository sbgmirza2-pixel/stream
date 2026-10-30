'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'DSports', href: '/en-vivo/directv-sports' },
    { name: 'ESPN 1', href: '/en-vivo/espn-1' },
    { name: 'ESPN 2', href: '/en-vivo/espn-2' },
    { name: 'ESPN 3', href: '/en-vivo/espn-3' },
    { name: 'Fox Sports', href: '/en-vivo/fox-sports-1' },
    { name: 'Fox Sports 2', href: '/en-vivo/fox-sports-2' },
    { name: 'Fox Sports 3', href: '/en-vivo/fox-sports-3' },
  ];

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-green-500 group-hover:text-green-400 transition">
            Futbol Stream HD
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-green-400 font-medium transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-white focus:outline-none p-1 rounded hover:bg-slate-800 transition"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="bg-slate-900 w-72 h-full p-6 shadow-2xl relative flex flex-col border-l border-slate-800">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-gray-400 hover:text-white mb-6 p-1"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base text-gray-200 hover:text-green-400 font-medium py-2 border-b border-slate-800"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}