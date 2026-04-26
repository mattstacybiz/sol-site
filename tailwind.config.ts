import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./config/**/*.ts",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Sol brand palette — single source of truth is config/brand.ts.
        // These CSS variables are wired in src/app/globals.css.
        sunset: {
          DEFAULT: "hsl(var(--sunset))",
          50: "hsl(var(--sunset-50))",
          100: "hsl(var(--sunset-100))",
          500: "hsl(var(--sunset-500))",
          600: "hsl(var(--sunset-600))",
          700: "hsl(var(--sunset-700))",
        },
        ocean: {
          DEFAULT: "hsl(var(--ocean))",
          500: "hsl(var(--ocean-500))",
          600: "hsl(var(--ocean-600))",
        },
        magenta: {
          DEFAULT: "hsl(var(--magenta))",
          500: "hsl(var(--magenta-500))",
          600: "hsl(var(--magenta-600))",
        },
        cream: "hsl(var(--cream))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          muted: "hsl(var(--ink-muted))",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "sunset-gradient":
          "linear-gradient(120deg, hsl(var(--sunset)) 0%, hsl(var(--magenta)) 55%, hsl(var(--ocean)) 100%)",
        "sunset-gradient-soft":
          "linear-gradient(180deg, hsl(var(--sunset-100)) 0%, hsl(var(--cream)) 70%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
