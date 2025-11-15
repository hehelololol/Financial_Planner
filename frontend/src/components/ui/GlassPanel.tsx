import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassPanel({ children, className = '', glow = false }: GlassPanelProps) {
  return (
    <div
      className={`
        bg-gradient-to-br from-gray-900/40 to-gray-800/40
        backdrop-blur-2xl border border-white/10
        rounded-2xl shadow-2xl
        ${glow ? 'shadow-blue-500/30 ring-1 ring-blue-500/40' : 'shadow-black/50'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

