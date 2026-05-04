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
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans],
        inter: ["Inter", ...fontFamily.sans],
      },
      colors: {
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#F47820",
        background: "#F8F9FC",
        foreground: "#1A1A2E",
        primary: {
          DEFAULT: "#1B2A5E",
          foreground: "#FFFFFF",
          100: "#E8EAF6",
          600: "#15224d",
        },
        secondary: {
          DEFAULT: "#6B7280",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F47820",
          foreground: "#FFFFFF",
          50: "#FFF7ED",
          100: "#FDE0C0",
          600: "#e06010",
          700: "#C2410C",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F8F9FC",
          foreground: "#9CA3AF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A2E",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A2E",
        },
        navy: {
          dark: "#0f1f4d",
          darker: "#0a1628",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FEF2F2",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#EFF6FF",
        }
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        xs: "0 1px 3px rgba(0,0,0,0.06)",
        card: "0 2px 12px rgba(0,0,0,0.08)",
        hover: "0 8px 24px rgba(0,0,0,0.12)",
        modal: "0 20px 60px rgba(0,0,0,0.15)",
        orange: "0 4px 20px rgba(244,120,32,0.30)",
        navy: "0 4px 20px rgba(27,42,94,0.25)",
        up: "0 -4px 20px rgba(0,0,0,0.08)",
      },
      fontSize: {
        11: "11px",
        12: "12px",
        13: "13px",
        14: "14px",
        16: "16px",
        18: "18px",
        22: "22px",
        26: "26px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px",
        56: "56px",
        72: "72px",
      },
      lineHeight: {
        1.1: "1.1",
        1.2: "1.2",
        1.3: "1.3",
        1.4: "1.4",
        1.5: "1.5",
        1.6: "1.6",
        1.7: "1.7",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1B2A5E 0%, #2d4a8a 50%, #1a3a6b 100%)",
        "orange-grad": "linear-gradient(135deg, #F47820, #e06010)",
        "card-gradient": "linear-gradient(135deg, #F8F9FC, #FFFFFF)",
        "navy-dark-grad": "linear-gradient(180deg, #0f1f4d, #1B2A5E)",
        
        "cat-programming": "linear-gradient(135deg, #667eea, #764ba2)",
        "cat-mathematics": "linear-gradient(135deg, #11998e, #38ef7d)",
        "cat-ai": "linear-gradient(135deg, #1B2A5E, #667eea)",
        "cat-science": "linear-gradient(135deg, #2193b0, #6dd5ed)",
        "cat-electronics": "linear-gradient(135deg, #f7971e, #ffd200)",
        "cat-robotics": "linear-gradient(135deg, #ee0979, #ff6a00)",
        "cat-iot": "linear-gradient(135deg, #134e5e, #71b280)",
        "cat-english": "linear-gradient(135deg, #fc4a1a, #f7b733)",
        "cat-commerce": "linear-gradient(135deg, #4e54c8, #8f94fb)",
        "cat-competitive": "linear-gradient(135deg, #c94b4b, #4b134f)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(20px)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-orange": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(244,120,32, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(244,120,32, 0)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease",
        "slide-in-up": "slide-in-up 0.3s ease",
        "slide-in-right": "slide-in-right 0.3s ease",
        "pulse-orange": "pulse-orange 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
