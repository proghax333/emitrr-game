import defaultConfig from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,tsx,js,ts,css}"],
  theme: {
    fontFamily: {
      oswald: ["Oswald", "Arial", "sans-serif"],
      roboto: ["Roboto", "Arial", "sans-serif"],
      inter: ["Inter", "Arial", "sans-serif"],
      monserrat: ["Montserrat", "Arial", "sans-serif"],
      poppins: ["Poppins", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
