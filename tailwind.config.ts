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
        // TODO: Replace placeholders with exact brand hex values once approved
        // Token names: brand.charcoal, brand.cream, brand.gold — revisit if naming convention changes
        brand: {
          charcoal: {
            DEFAULT: "#1C1C1C", // Deep charcoal — primary background / text on light
            light: "#2E2E2E",
            dark: "#0F0F0F",
          },
          cream: {
            DEFAULT: "#FAF6EF", // Warm cream — primary background on light surfaces
            light: "#FFFDF9",
            dark: "#EFE9DF",
          },
          gold: {
            DEFAULT: "#C8963E", // Warm gold accent — CTAs, highlights, borders
            light: "#E0B96A",
            dark: "#9E7020",
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
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
