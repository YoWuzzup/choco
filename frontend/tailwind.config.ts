import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    colors: {
      blue: "#007bff",
      pink: "#e83e8c",
      orange: "#fd7e14",
      green: "#28a745",
      "gray-dark": "#343a40",
      gray: "#6c757d",
      indigo: "#6610f2",
      purple: "#6f42c1",
      red: "#dc3545",
      yellow: "#ffc107",
      teal: "#20c997",
      cyan: "#17a2b8",
      white: "#fff",
      primary: "#007bff",
      secondary: "#6c757d",
      success: "#28a745",
      info: "#17a2b8",
      warning: "#ffc107",
      danger: "#dc3545",
      light: "#f8f9fa",
      dark: "#343a40",
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      mono: [
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    extend: {
      textColor: {
        primary: "rgb(var(--primary-text-color))",
        secondary: "rgb(var(--secondary-text-color))",
        colorful: "rgb(var(--colorful-text-color))",
        paraPrimary: "rgb(var(--para-primary-text-color-grey))",
        paraSecondary: "rgb(var(--para-secondary-text-color-grey))",
      },
      backgroundColor: {
        primary: "rgb(var(--primary-background))",
        secondary: "rgb(var(--secondary-background))",
        colorful: "rgb(var(--colorful-background))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        dropdown: {
          "0%": { transform: "rotate(0.0deg)" },
          "30%": { transform: "rotate(14deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        dropdown: "dropdown 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
