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
          navy: "#0b2e5c",
          "navy-light": "#13407a",
          blue: "#0090d0",
          cyan: "#00bcd4",
          water: "#d9f0fa",
          sand: "#f4fbff",
        },
      },
      fontFamily: {
        sans: ["var(--font-source)", "Arial", "sans-serif"],
        display: ["var(--font-oswald)", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(11, 46, 92, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
