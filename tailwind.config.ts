import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        md: '40px',
        lg: '80px',
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", ...fontFamily.sans],
        inter: ["Inter", ...fontFamily.sans],
        satoshi: ["Satoshi", ...fontFamily.sans],
        tamil: ["Noto Sans Tamil", ...fontFamily.sans],
        poppins: ["Space Grotesk", ...fontFamily.sans], // backward compat
      },
      colors: {
        // Deep Blue (Primary Brand)
        brandBlue: "#0A1628",
        navyDeep: "#0D1F3C",
        royalBlue: "#1A3A6B",
        electricBlue: "#2563EB",
        brightBlue: "#3B82F6",
        skyBlue: "#60A5FA",
        iceBlue: "#DBEAFE",

        // Orange (Secondary Brand)
        deepOrange: "#7C2D12",
        brandOrange: "#EA580C",
        vividOrange: "#F97316",
        lightOrange: "#FB923C",
        softOrange: "#FED7AA",
        amberGold: "#F59E0B",

        // Neutral System
        pureBlack: "#000000",
        richBlack: "#0A0A0B",
        deepGray: "#111827",
        cardDark: "#1F2937",
        border: "#374151",
        muted: "#6B7280",
        subtle: "#9CA3AF",
        light: "#D1D5DB",
        softWhite: "#F9FAFB",
        pureWhite: "#FFFFFF",

        // Map standard shadcn vars to new design tokens
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#EA580C",
          foreground: "#FFFFFF",
        },
        background: "#0A1628",
        foreground: "#F9FAFB",
        surface: "#1F2937",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0A1628 0%, #1A3A6B 50%, #0A1628 100%)",
        "orange-gradient": "linear-gradient(135deg, #EA580C 0%, #F97316 50%, #F59E0B 100%)",
        "blue-orange": "linear-gradient(135deg, #2563EB 0%, #EA580C 100%)",
        "premium-dark": "linear-gradient(180deg, #0A1628 0%, #0D1F3C 100%)",
        "glass-light": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "glow-blue-radial": "radial-gradient(circle at 50% 50%, rgba(37,99,235,0.3) 0%, transparent 70%)",
        "glow-orange-radial": "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.3) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(37,99,235,0.4), 0 0 80px rgba(37,99,235,0.2)",
        "glow-orange": "0 0 40px rgba(249,115,22,0.4), 0 0 80px rgba(249,115,22,0.2)",
        "card-shadow": "0 25px 50px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3)",
        "premium-shadow": "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "soft-blue": "0 8px 32px rgba(37,99,235,0.2)",
        "elevation-1": "0 4px 6px rgba(0,0,0,0.1)",
        "elevation-2": "0 10px 25px rgba(0,0,0,0.2)",
        "elevation-3": "0 20px 40px rgba(0,0,0,0.3)",
      },
      borderRadius: {
        sharp: "0px",
        micro: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        pill: "9999px",
        circle: "50%",
      },
      fontSize: {
        "display-1": ["96px", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-2": ["72px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "h1": ["56px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h3": ["32px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h4": ["24px", { lineHeight: "1.4", letterSpacing: "normal", fontWeight: "600" }],
        "h5": ["20px", { lineHeight: "1.4", letterSpacing: "normal", fontWeight: "600" }],
        "body-xl": ["20px", { lineHeight: "1.7", letterSpacing: "normal", fontWeight: "400" }],
        "body-l": ["18px", { lineHeight: "1.7", letterSpacing: "normal", fontWeight: "400" }],
        "body": ["16px", { lineHeight: "1.6", letterSpacing: "normal", fontWeight: "400" }],
        "body-s": ["14px", { lineHeight: "1.5", letterSpacing: "normal", fontWeight: "400" }],
        "caption": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
        "tamil-display": ["48px", { lineHeight: "1.2", letterSpacing: "normal", fontWeight: "700" }],
        "tamil-body": ["18px", { lineHeight: "1.6", letterSpacing: "normal", fontWeight: "500" }],
      },
      spacing: {
        micro: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "80px",
        "5xl": "96px",
        "6xl": "128px",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        floatAnimation: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(37,99,235,0.6)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        fadeInDown: "fadeInDown 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        fadeInLeft: "fadeInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        fadeInRight: "fadeInRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        scaleIn: "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        float: "floatAnimation 4s linear infinite",
        glowPulse: "glowPulse 2s infinite",
        gradientShift: "gradientShift 5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
