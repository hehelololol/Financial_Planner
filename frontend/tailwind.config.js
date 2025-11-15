/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fidelity: {
          green: '#007A33',
          'green-dark': '#005A29',
          'green-light': '#26A65B',
          'gray-dark': '#2E2E2E',
          'gray-medium': '#757575',
          'gray-light': '#F5F5F5',
        },
        border: {
          'fidelity': '#E0E0E0',
          'fidelity-input': '#D5D5D5',
        },
        // Modern fintech color palette
        dark: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
        },
        neon: {
          blue: '#3B82F6',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
        },
      },
      boxShadow: {
        'fidelity': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

