/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marsa: {
          blue: '#003A6B',
          'blue-light': '#4A90E2',
          'blue-dark': '#002B4F',
        }
      }
    },
  },
  plugins: [],
}
