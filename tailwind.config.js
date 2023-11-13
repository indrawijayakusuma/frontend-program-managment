/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
        hover: "hsl(var(--accent))",
        accent: "hsl(var(--accent))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        background: "hsl(var(--background))",
        primaryforeground: "hsl(var(--primary-foreground))",
      },
      boxShadow: {
        'custom': '0 10px 100px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05);',
      },
      borderRadius: {
        'radius': 'var(--radius)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
}