/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    styled: true,
    themes: ["cupcake"],
    rtl: false,
  },
  plugins: [daisyui, "@tailwindcss/typography"],
};
