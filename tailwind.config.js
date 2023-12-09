/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg--Wrapper': '#FFFFFF',
        'br--Input': '#28A4DA',
        'ct--Blue': '#009ddf',
      },
    },
  },
  plugins: [],
}
