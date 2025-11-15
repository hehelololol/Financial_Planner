import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputField({ label, error, className = '', ...props }: InputFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3
          bg-gray-900/50 border border-gray-700
          rounded-lg text-gray-100 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
          focus:border-blue-500/50 transition-all duration-300
          backdrop-blur-sm
          ${error ? 'border-red-500/50 focus:ring-red-500/50' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

