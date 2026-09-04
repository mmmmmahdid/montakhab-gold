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
        ink: {
          DEFAULT: "#07070a",
          900: "#0a0a0d",
          800: "#111114",
          700: "#18181c",
          600: "#232327",
        },
        bone: {
          DEFAULT: "#f4efe4",
          muted: "#a39d90",
          dim: "#6f6a60",
        },
        gold: {
          DEFAULT: "#c9a15c",
          bright: "#e8caa0",
          dim: "#8a7042",
          line: "rgba(201,161,92,0.18)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        // the Latin brand wordmark only — "Montakhab Gold Company" wherever it appears
        wordmark: ["var(--font-wordmark)", "serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      transitionTimingFunction: {
        fluid: "cubic-bezier(0.16,1,0.3,1)",
        silk: "cubic-bezier(0.32,0.72,0,1)",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle at 50% 0%, rgba(201,161,92,0.16), transparent 60%)",
        "rim-light":
          "linear-gradient(180deg, rgba(201,161,92,0.08) 0%, rgba(7,7,10,0) 40%)",
      },
    },
  },
  plugins: [],
};
export default config;
