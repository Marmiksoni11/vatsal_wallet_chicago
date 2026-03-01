import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          light: "#EFF6FF",
          mid: "#BFDBFE",
        },
        accent: {
          DEFAULT: "#7C3AED",
          light: "#F5F3FF",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px rgba(37,99,235,0.10), 0 4px 12px rgba(0,0,0,0.06)",
        btn: "0 4px 14px rgba(37,99,235,0.35)",
        "btn-accent": "0 4px 14px rgba(124,58,237,0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
