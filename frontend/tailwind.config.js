/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          900: '#0a0e27',
          800: '#1a1f3a',
          700: '#2a2f4f',
          600: '#3a3f5f',
          500: '#4a4f6f',
          accent: '#d4af37',
          light: '#f5f5f5',
        },
      },
      backdropBlur: {
        glass: '10px',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      },
    },
  },
  plugins: [],
};
