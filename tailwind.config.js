/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      gray: "rgb(199, 199, 204)",
      white: "#ffffff",
      "bg-2": "#ECECEC",
      primary: "#D0810A",
      error: "#FF2323",
      gray2: "#ECECEC",
    },
    extend: {},
  },
  plugins: [],
};
