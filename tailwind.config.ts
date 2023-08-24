import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--instrument-sans)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        "3xl": "0 0 32px 0 rgba(0, 0, 0, 0.25)",
      },
    },
    fontSize: {
      xl: ["2rem", "150%"],
      lg: ["1rem", "150%"],
      sm: ["0.75rem", "150%"],
    },
    colors: {
      alabaster: "#FAFAFA",
      white: "#FFFFFF",
      "red-orange": "#FF3939",
      "blue-chalk": "#EFEBFF",
      "smokey-grey": "#737373",
      "light-grey": "#D9D9D9",
      dune: "#333333",
      "bluish-purple": "#633CFF",
      "pale-violet": "#BEADFF",
    },
  },
  plugins: [],
};
export default config;
