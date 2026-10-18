/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          primary:  '#C07340',
          dark:     '#8B4513',
          darker:   '#6B3410',
          light:    '#D4853A',
          gold:     '#D4A847',
          cream:    '#F5EDD6',
          bg:       '#faf8f5',
          surface:  '#F0EBE3',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-coffee': 'linear-gradient(135deg, #C07340 0%, #D4853A 50%, #B5622E 100%)',
        'gradient-gold':   'linear-gradient(135deg, #D4A847 0%, #C07340 100%)',
        'gradient-dark':   'linear-gradient(135deg, #1a0e07 0%, #2d1a0e 100%)',
      },
      boxShadow: {
        'coffee-sm': '0 4px 14px rgba(192,115,64,0.35)',
        'coffee-md': '0 8px 24px rgba(192,115,64,0.45)',
        'coffee-lg': '0 12px 36px rgba(192,115,64,0.5)',
        'card':      '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover':'0 16px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(192,115,64,0.1)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'scale-in':  'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'float':     'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'shimmer':   'shimmer 2.5s linear infinite',
        'pulse-ring':'pulse-ring 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
}
