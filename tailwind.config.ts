import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-primary": "#FF4D6D",
        "neon-secondary": "#FF758F",
        "neon-purple": "#C9184A",
        "bg-primary": "#080C0F",
        "bg-surface": "#0D1117",
        "text-primary": "#F0F4F8",
        "text-secondary": "#8899AA",
      },
      fontFamily: {
        syne: ["var(--font-syne)"],
        inter: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,77,109,0.4)" },
          "50%": { boxShadow: "0 0 50px rgba(255,77,109,0.9), 0 0 80px rgba(255,77,109,0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { textShadow: "0 0 20px rgba(255,77,109,0.5), 0 0 40px rgba(255,77,109,0.2)" },
          "100%": { textShadow: "0 0 30px rgba(255,77,109,0.8), 0 0 60px rgba(255,77,109,0.4)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-neon": "pulse-neon 2s infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s alternate infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
