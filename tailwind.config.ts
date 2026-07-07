import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        secondary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        accent: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
        surface: {
          DEFAULT: "#ffffff",
          dim: "#f7f5fa",
          dark: "#121016",
          darkDim: "#1c1a22",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["SF Mono", "Menlo", "Consolas", "monospace"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      borderRadius: {
        md3sm: "12px",
        md3md: "16px",
        md3lg: "24px",
        md3xl: "28px",
      },
      boxShadow: {
        elevation1: "0 1px 2px 0 rgba(0,0,0,0.06)",
        elevation2: "0 2px 6px 0 rgba(0,0,0,0.08)",
        elevation3: "0 4px 12px 0 rgba(0,0,0,0.10)",
        elevation4: "0 8px 24px 0 rgba(0,0,0,0.12)",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-in-out",
        slideUp: "slideUp 300ms ease-out",
        scaleIn: "scaleIn 300ms ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
