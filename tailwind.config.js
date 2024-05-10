/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        starry:
          "url('https://www.transparenttextures.com/patterns/stardust.png')",
      }),
    },
  },
  plugins: [],
};
