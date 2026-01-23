/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./component/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        PRIMARY: "#2563EB",
        WHITE: "#ffffff",
        BLACK: "#000000",
        GRAY: "#555",
        LIGHT_GRAY: "#ddd",
      },
    },
  },
  plugins: [],
};
