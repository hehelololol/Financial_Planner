import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function Card({ children, className = '', glow = false, hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-gradient-to-br from-gray-900/90 to-gray-800/90
        backdrop-blur-xl border border-gray-700/50
        rounded-xl p-6 shadow-2xl
        ${glow ? 'shadow-blue-500/20 ring-1 ring-blue-500/30' : ''}
        ${hover ? 'hover:shadow-blue-500/30 hover:ring-blue-500/50 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

