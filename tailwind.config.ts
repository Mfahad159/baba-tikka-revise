import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: {
            primary: "#FAF7F2",
            "primary-dark": "#0C0C0C",
            secondary: "#F0EBE3",
            "secondary-dark": "#141414",
            elevated: "#E8E0D5",
            "elevated-dark": "#1C1C1C",
          },
          accent: {
            gold: "#A07840",
            "gold-dark": "#C8963E",
            goldMuted: "rgba(160, 120, 64, 0.5)",
            "goldMuted-dark": "rgba(200, 150, 62, 0.5)",
          },
          text: {
            primary: "#1A1A1A",
            "primary-dark": "#FFFFFF",
            secondary: "#6B5B4E",
            "secondary-dark": "rgba(255, 255, 255, 0.45)",
            accent: "#A07840",
            "accent-dark": "#C8963E",
          },
          border: {
            DEFAULT: "rgba(160, 120, 64, 0.2)",
            dark: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      fontFamily: {
        // Tied to CSS variables set in lib/fonts.ts — change fonts there, not here
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      // Marquee animations for TestimonialsSection
      // VISUAL CHOICE: 40s duration — slow enough to read, fast enough to feel alive.
      // Adjust the seconds values to speed up or slow down the scroll.
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
