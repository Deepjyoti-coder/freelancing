'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const isSurprisePage = pathname?.startsWith('/s/');

  if (isSurprisePage) return null;

  const message = encodeURIComponent('Hi Deepjyoti! I want to create a surprise website.');
  const whatsappUrl = `https://wa.me/916001746854?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      title="Chat with Deepjyoti"
    >
      <MessageCircle size={24} className="group-hover:rotate-6 transition-transform" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-semibold text-sm">
        Surprise Me!
      </span>
    </motion.a>
  );
};
