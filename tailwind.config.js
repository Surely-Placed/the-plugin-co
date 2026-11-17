/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tp: {
          page: "var(--tp-page)",
          surface: "var(--tp-surface)",
          text: "var(--tp-text)",
          muted: "var(--tp-muted)",
          "muted-strong": "var(--tp-muted-strong)",
          cyan: "#22B4F5",
          primary: "#1B68CF",
          "primary-hover": "#2276e0",
          navy: "#0B1B3A",
          "accent-text": "#0A6FB0",
          border: "var(--tp-border)",
          "border-subtle": "var(--tp-border-subtle)",
        },
        flow: {
          light: "#3d7fd4",
          mid: "#1b68cf",
          dark: "#000000",
        },
        bg: {
          primary: "#000000",
          secondary: "#1b68cf",
          tertiary: "#1454a8",
        },
        dark: "#0F172A",
        accent: {
          DEFAULT: "#1b68cf",
          light: "#3d7fd4",
          sky: "#3d7fd4",
          highlight: "#3d7fd4",
          deep: "#1454a8",
        },
        muted: "rgba(255,255,255,0.72)",
        border: "rgba(255,255,255,0.14)",
        success: "#16A34A",
        division: {
          growth: "#1a3366",
          careers: "#0D6E4E",
          parent: "#0A1F44",
        },
      },
      fontFamily: {
        sans: ['"Roboto Mono"', "ui-monospace", "monospace"],
        display: ['"Montserrat"', "system-ui", "sans-serif"],
        mono: ['"Roboto Mono"', "ui-monospace", "monospace"],
        serif: ['"Roboto Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.35)",
        "glass-lg": "0 24px 64px rgba(27, 104, 207, 0.25)",
        pill: "0 4px 24px rgba(27, 104, 207, 0.3)",
        card: "0 12px 40px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        /* Canva flow: light → blue → black → black (top to bottom) */
        "gradient-flow":
          "linear-gradient(180deg, #000000 0%, #050a12 28%, #0a2d5c 52%, #050a12 78%, #000000 100%)",
        "gradient-hero":
          "linear-gradient(180deg, #000000 0%, #050a12 28%, #0a2d5c 52%, #050a12 78%, #000000 100%)",
        "gradient-rise":
          "linear-gradient(180deg, #000000 0%, #050a12 18%, #0a2d5c 38%, #050a12 58%, #000000 100%)",
        "gradient-deep":
          "linear-gradient(180deg, #000000 0%, #050a12 48%, #0a2d5c 72%, #061428 88%, #000000 100%)",
        "gradient-slash":
          "linear-gradient(135deg, #000000 0%, #050a12 30%, #0a2d5c 52%, #050a12 72%, #000000 100%)",
        "gradient-slash-reverse":
          "linear-gradient(225deg, #000000 0%, #061428 32%, #0a2d5c 50%, #050a12 70%, #000000 100%)",
        "gradient-band":
          "linear-gradient(90deg, #000000 0%, #050a12 22%, #0a2d5c 50%, #050a12 78%, #000000 100%)",
        "gradient-apex":
          "linear-gradient(180deg, #0a2d5c 0%, #061428 12%, #050a12 28%, #000000 55%, #000000 100%)",
        "gradient-base":
          "linear-gradient(180deg, #000000 0%, #000000 42%, #050a12 68%, #0a2d5c 86%, #050a12 100%)",
        "gradient-vault":
          "linear-gradient(180deg, #061428 0%, #000000 22%, #050a12 48%, #0a2d5c 58%, #050a12 78%, #000000 100%)",
        "gradient-card": "#000000",
        "gradient-pill":
          "linear-gradient(90deg, #1454a8 0%, #1b68cf 100%)",
        "gradient-cta":
          "linear-gradient(160deg, #000000 0%, #050a12 40%, #0a2d5c 55%, #000000 100%)",
        "gradient-footer":
          "linear-gradient(180deg, #000000 0%, #050a12 55%, #061428 85%, #000000 100%)",
        "gradient-dark": "#000000",
        "gradient-blue-sky":
          "linear-gradient(180deg, #1454a8 0%, #1b68cf 100%)",
        "gradient-button":
          "linear-gradient(90deg, #1454a8 0%, #1b68cf 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};
