/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sd-header": "url('assets/patterns/1.svg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#224429",

          secondary: "#436147",

          accent: "#57c12a",

          neutral: "#fafafa",

          "base-100": "#F9F9FB",

          info: "#6592CD",

          success: "#72E9A7",

          warning: "#E68405",

          error: "#E94951",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
