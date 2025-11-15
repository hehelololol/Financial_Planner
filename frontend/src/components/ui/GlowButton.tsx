import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  glow?: boolean;
}

export function GlowButton({
  children,
  variant = 'primary',
  glow = true,
  className = '',
  disabled,
  ...props
}: GlowButtonProps) {
  const baseClasses = `
    px-6 py-3 rounded-lg font-semibold
    transition-all duration-300 transform
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-500
      text-white
      ${glow ? 'shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60' : ''}
      hover:scale-105 active:scale-95
      hover:from-blue-500 hover:to-blue-400
    `,
    secondary: `
      bg-gradient-to-r from-gray-700 to-gray-600
      text-gray-100 border border-gray-600
      ${glow ? 'hover:shadow-lg hover:shadow-gray-500/30' : ''}
      hover:scale-105 active:scale-95
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-500
      text-white
      ${glow ? 'shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60' : ''}
      hover:scale-105 active:scale-95
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

