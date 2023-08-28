/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: "'Clash Display', sans-serif",
        dm: "'DM Sans', sans-serif",
        inter: "'Inter', sans-serif",
      },
    },
  },
  plugins: [],
}

