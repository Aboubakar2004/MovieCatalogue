// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "midnight-green": "#0E3845", // Ajout de la couleur 'midnight-green' avec un code hexadécimal correct
      },
    },
  },
  plugins: [],
});
