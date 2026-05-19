import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          900: "#07102B",
          800: "#0D1F50",
          700: "#1535A0",
          600: "#014E9F",
          500: "#2653E8",
          400: "#5079EE",
        },
        silver: {
          300: "#F0F2F5",
          400: "#D4DAE4",
          500: "#A8B4C4",
          600: "#7A8EA0",
          700: "#737373",
        },
        black: {
          500: "rgb(25, 25, 25)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
