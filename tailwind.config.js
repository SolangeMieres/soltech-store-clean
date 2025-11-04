/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0e172a",
        light: "#e2e8f0",
        brand: "#00e5ff",
        accent: "#14b8a6"
      },
      boxShadow: {
        soft: "0 4px 25px rgba(0, 229, 255, 0.2)"
      }
    }
  },
  plugins: [],
}
