/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        mocha: {
          DEFAULT: '#B18F6A',
          50: '#F5F0EA',
          100: '#EBE2D6',
          200: '#D8C7AD',
          300: '#C5AC85',
          400: '#B18F6A',
          500: '#997B56',
          600: '#7D6446',
          700: '#614D36',
          800: '#453626',
          900: '#291F16'
        },
        charcoal: '#3C3C3C',
        muted: '#666666'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}