const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: { DEFAULT: colors.slate[500], ...colors.slate },
      amber: { DEFAULT: colors.amber[500], ...colors.amber },
      emerald: { DEFAULT: colors.emerald[500], ...colors.emerald },
    }),
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.gray.300", "currentColor"),
      }),
    },
  },
  plugins: [],
};
