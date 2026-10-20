'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  onClick
}) => {
  const cardStyle = `bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl p-6 shadow-sm ${
    onClick ? 'cursor-pointer' : ''
  } ${className}`;

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ 
          y: -4, 
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
          borderColor: '#E2E8F0'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={onClick}
        className={cardStyle}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={cardStyle}>
      {children}
    </div>
  );
};
