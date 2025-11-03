/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      brand: "#00E5FF",
      dark: "#0F172A",
      light: "#F8FAFC",
      accent: "#38BDF8",
    },
  
      boxShadow: {
        soft: "0 4px 20px rgba(0, 229, 255, 0.15)",
      },
    },
  },
  plugins: [],
};
