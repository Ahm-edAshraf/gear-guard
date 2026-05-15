'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Package2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Equipment', path: '/equipment' },
    { name: 'Book', path: '/book' },
    { name: 'My Bookings', path: '/my-bookings' },
    { name: 'Admin', path: '/admin' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent text-black p-2 transform group-hover:rotate-12 transition-transform">
            <Package2 size={24} strokeWidth={2.5} />
          </div>
          <span className="font-sans font-black text-2xl tracking-tighter uppercase">
            Gear<span className="text-accent">Guard</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                className={clsx(
                  "font-mono text-sm uppercase tracking-widest font-bold transition-colors relative py-2",
                  isActive ? "text-accent" : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-b-2 border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "font-mono text-lg uppercase tracking-widest font-bold py-2 border-b border-border",
                      isActive ? "text-accent" : "text-gray-400"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
