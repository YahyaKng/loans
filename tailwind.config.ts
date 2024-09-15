import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yekan: ["Yekan Bakh", "sans-serif"],
      },
      colors: {
        light: {
          blu: "#3094ea",
          primary: "#007bff",
          // primary: "#4550f8",
          black: "#253c4b",
          blue: "#007bff",
          indigo: "#6610f2",
          purple: "#6f42c1",
          pink: "#e83e8c",
          red: "#dc3545",
          orange: "#fd7e14",
          yellow: "#ffc107",
          green: "#28a745",
          teal: "#20c997",
          cyan: "#17a2b8",
          white: "#fff",
          gray: "#6c757d",
          grayDark: "#343a40",
          secondary: "#6c757d",
          success: "#28a745",
          info: "#17a2b8",
          warning: "#ffc107",
          danger: "#dc3545",
          light: "#f8f9fa",
        },
        dark: {
          primary: "#3094ea",
        },
      },
    },
  },
  plugins: [],
};
export default config;
