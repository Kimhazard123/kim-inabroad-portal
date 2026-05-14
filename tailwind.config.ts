import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#057C8E",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#0B4F6C",
          foreground: "#ffffff"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(11, 79, 108, 0.14)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
