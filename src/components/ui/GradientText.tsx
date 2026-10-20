import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'from-blue-600 via-purple-600 via-pink-500 to-orange-400'
}) => {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};
