import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        bar: {
          "0%, 100%": { height: "1rem" },
          "50%": { height: "3rem" },       
        },
      },
      animation: {
        bar: "bar 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};