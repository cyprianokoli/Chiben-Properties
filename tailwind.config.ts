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
        "bg-page": "var(--bg-page)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-navy": "var(--bg-navy)",
        "bg-overlay": "var(--bg-overlay)",
        navy: {
          DEFAULT: "var(--navy)",
          deep: "var(--navy-deep)",
          soft: "var(--navy-soft)",
        },
        cream: {
          DEFAULT: "var(--cream)",
          soft: "var(--cream-soft)",
          warm: "var(--cream-warm)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          hover: "var(--gold-hover)",
          deep: "var(--gold-deep)",
        },
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-bg": "var(--accent-bg)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-on-navy": "var(--text-on-navy)",
        "text-on-navy-muted": "var(--text-on-navy-muted)",
        border: "var(--border)",
        "border-gold": "var(--border-gold)",
        "border-on-navy": "var(--border-on-navy)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        serif: ["var(--font-serif)", "DM Serif Display", "Georgia", "serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
