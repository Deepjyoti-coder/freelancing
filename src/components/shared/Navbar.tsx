'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Don't show header on active client surprise experiences to keep them fully immersive
  const isSurprisePage = pathname?.startsWith('/s/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isSurprisePage) return null;

  const navLinks = [
    { label: 'Experiences', href: '/experiences' },
    { label: 'Showcase', href: '/#portfolio' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100/80 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group select-none">
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            MOMENTS
          </span>
          <span className="text-[10px] tracking-widest font-semibold text-slate-400 uppercase -mt-1 pl-0.5">
            by Deepjyoti
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                pathname === link.href ? 'text-slate-900 font-semibold' : 'text-slate-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/order">
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              Create a Surprise <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-1 transition-colors ${
                    pathname === link.href ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Link href="/order" onClick={() => setIsOpen(false)}>
                  <Button variant="gradient" size="md" fullWidth className="flex items-center justify-center gap-2">
                    Create a Surprise <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
