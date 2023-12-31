/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("daisyui"),
  ],
};
