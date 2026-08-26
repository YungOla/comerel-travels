import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#6B2D3A", // Primary Brand
          light: "#8C3542",
          dark: "#4A1A22",
        },
        gold: {
          DEFAULT: "#C9AA5C", // Secondary Brand
          light: "#D8C9A4", // Champagne Gold
          dark: "#8C6D30",
        },
        beige: {
          DEFAULT: "#CFC5B0", // Warm Beige
          light: "#E8E4D8",
          dark: "#A39780",
        },
        luxury: {
          white: "#FFFFFF",
          black: "#111111",
          soft: "#F8FAFC",
          border: "#E5E7EB",
          textPrimary: "#0F172A",
          textSecondary: "#64748B",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
      animation: {
        "flight-path": "flight-path 4s linear infinite",
        "spin-slow": "spin-slow 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
