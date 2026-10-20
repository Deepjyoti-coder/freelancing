'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isSurprisePage = pathname?.startsWith('/s/');

  if (isSurprisePage) return null;

  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand info */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex flex-col select-none">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              MOMENTS
            </span>
            <span className="text-xs tracking-widest font-semibold text-slate-400 uppercase -mt-1 pl-0.5">
              by Deepjyoti
            </span>
          </Link>
          <p className="text-sm text-slate-500 max-w-xs italic font-medium">
            &ldquo;You bring the moment. I build the magic.&rdquo;
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Navigation</h4>
          <nav className="flex flex-col space-y-2">
            <Link href="/experiences" className="text-sm text-slate-500 hover:text-slate-900 transition">
              Experiences
            </Link>
            <Link href="/#portfolio" className="text-sm text-slate-500 hover:text-slate-900 transition">
              Client Showcase
            </Link>
            <Link href="/pricing" className="text-sm text-slate-500 hover:text-slate-900 transition">
              Pricing
            </Link>
            <Link href="/about" className="text-sm text-slate-500 hover:text-slate-900 transition">
              About
            </Link>
            <Link href="/contact" className="text-sm text-slate-500 hover:text-slate-900 transition">
              Contact
            </Link>
            <Link href="/admin/login" className="text-xs text-slate-400 hover:text-slate-600 transition">
              Admin Portal
            </Link>
          </nav>
        </div>

        {/* Contact/WhatsApp */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Say Hello</h4>
          <div className="space-y-2 text-sm text-slate-500">
            <p className="font-semibold text-slate-800">Deepjyoti Saha</p>
            <p>Gemini Certified Student</p>
            <p>Phone: +91 6001746854</p>
            <a
              href="https://wa.me/916001746854?text=Hi%20Deepjyoti!%20I%20want%20to%20create%20a%20surprise%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
            >
              <MessageCircle size={16} /> WhatsApp Me
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>&copy; {new Date().getFullYear()} Moments by Deepjyoti. All rights reserved.</p>
        <p>Crafted for moments that matter.</p>
      </div>
    </footer>
  );
};
