/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: { container: false },
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        shadowsIntoLight: ["Shadows Into Light"],
      },
      boxShadow: {
        DEFAULT: "0px 0px 8px 0.02px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        main: {
          DEFAULT: "rgb(244,111,44)",
          hover: "rgb(210,94,36)",
        },
      },
    },
  },
  plugins: [],
};
