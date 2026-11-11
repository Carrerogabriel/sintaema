import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1aaa4a",
          "green-dark": "#148a3b",
          "green-light": "#e8f7ee",
          navy: "#0b2e5c",
          "navy-dark": "#071d3b",
          "navy-light": "#13407a",
          blue: "#0090d0",
          cyan: "#00bcd4",
          water: "#d9f0fa",
          sand: "#f4fbff",
          ink: "#16324f",
        },
      },
      fontFamily: {
        sans: ["var(--font-source)", "Arial", "sans-serif"],
        display: ["var(--font-oswald)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 46, 92, 0.04), 0 8px 24px rgba(11, 46, 92, 0.07)",
        "card-hover": "0 2px 4px rgba(11, 46, 92, 0.05), 0 20px 40px rgba(11, 46, 92, 0.14)",
        glow: "0 10px 30px -8px rgba(26, 170, 74, 0.55)",
        "glow-blue": "0 10px 30px -8px rgba(0, 144, 208, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        wave: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.12)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        drip: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(6px) scale(0.92)", opacity: "0.7" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "scale-in": "scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        wave: "wave 14s linear infinite",
        "wave-slow": "wave 22s linear infinite",
        float: "float 6s ease-in-out infinite",
        "ken-burns": "ken-burns 18s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        drip: "drip 1.4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
