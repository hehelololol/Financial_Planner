import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, icon, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-4 mb-2">
        {icon && (
          <div className="text-blue-400">{icon}</div>
        )}
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
      </div>
      {subtitle && (
        <p className="text-gray-400 text-lg ml-10">{subtitle}</p>
      )}
    </div>
  );
}

