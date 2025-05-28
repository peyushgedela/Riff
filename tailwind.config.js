// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is important
  ],
  theme: {
    extend: {
      animation: {
        "pulse-around": "pulse-around 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-around": {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.95)" },
          "50%": { opacity: "0.5", transform: "scale(1.05)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.1", transform: "scale(0.98)" },
          "50%": { opacity: "0.3", transform: "scale(1.02)" },
        },
      },
      dropShadow: {
        glow: [
          "0 0 5px rgba(255, 255, 255, 0.3)",
          "0 0 10px rgba(255, 255, 255, 0.2)",
        ],
      },
    },
  },
  plugins: [require("tailwindcss-scrollbar")],
};
