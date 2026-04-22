module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f6fc',
          100: '#d9e4f7',
          200: '#b0c7ed',
          300: '#83a8e2',
          400: '#5989d6',
          500: '#356cc4',
          600: '#2053a7',
          700: '#174288',
          800: '#13366d',
          900: '#112f5c'
        },
        accent: '#3DD598',
        ink: '#1e293b'
      },
      fontFamily: {
        sans: ['\"Amadeus Neue\"', '\"Segoe UI\"', 'Inter', 'system-ui', 'sans-serif'],
        amadeus: ['\"Amadeus Neue\"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(53, 108, 196, 0.35)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
