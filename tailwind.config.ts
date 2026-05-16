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
        grotesk: ["Plus Jakarta Sans", ...fontFamily.sans],
        inter: ["Inter", ...fontFamily.sans],
        jakarta: ["Plus Jakarta Sans", ...fontFamily.sans],
        tamil: ["Noto Sans Tamil", ...fontFamily.sans],
        mono: ["JetBrains Mono", ...fontFamily.mono],
      },
      colors: {
        // MNC Brand Palette (Orange + White focus)
        brandOrange: "#EA580C",
        vividOrange: "#F97316",
        amberGold: "#F59E0B",
        brandBlue: "#0A1628", // Deep contrast color
        
        // Neutral System
        offWhite: "#F8F7FF",
        pureWhite: "#FFFFFF",
        textPrimary: "#0A1628",
        textSecondary: "#4B5563",
        borderSubtle: "#E5E7EB",

        // Map shadcn/standard vars
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #EA580C 0%, #F97316 50%, #F59E0B 100%)",
        "orange-white": "linear-gradient(135deg, #EA580C 0%, #FFFFFF 100%)",
        "soft-orange-radial": "radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-orange": "0 0 40px rgba(234, 88, 12, 0.2), 0 0 80px rgba(234, 88, 12, 0.1)",
        "premium-card": "0 4px 24px rgba(30, 27, 75, 0.06)",
        "premium-elevated": "0 12px 40px rgba(234, 88, 12, 0.12)",
      },
      fontSize: {
        "hero-h1": ["72px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        "section-h2": ["42px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "card-h3": ["24px", { lineHeight: "1.4", fontWeight: "700" }],
        "body-base": ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        "caption-label": ["13px", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }],
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
