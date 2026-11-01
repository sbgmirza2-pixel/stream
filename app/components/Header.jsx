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
    <header className="bg-white border-b border-gray-200 text-gray-900 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="Fútbol Libre"
          width={36}
          height={36}
          priority
          className="h-9 w-9 object-contain"
        />
        <span className="text-2xl font-bold text-[#167a36]">
          Fútbol Libre
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-700 hover:text-[#167a36] font-semibold transition"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}