import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyle = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider';
  
  const variants = {
    primary: 'bg-blue-50 text-blue-600 border border-blue-100',
    secondary: 'bg-slate-100 text-slate-600 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border border-amber-100',
    error: 'bg-rose-50 text-rose-600 border border-rose-100',
    info: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
