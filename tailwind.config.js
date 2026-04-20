/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#004f96",
        "background": "#faf8fd",
        "surface": "#faf8fd",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f7",
        "surface-container": "#efedf2",
        "surface-container-high": "#e9e7ec",
        "surface-container-highest": "#e3e2e6",
        "on-surface": "#1b1b1f",
        "on-surface-variant": "#414752",
        "outline": "#717783",
        "secondary-container": "#cbe6ff",
        "on-secondary-container": "#001e30",
        "primary-dark": "#0067c0",
        "background-dark": "#0b1326",
        "surface-dark": "#0b1326",
        "surface-container-lowest-dark": "#131b2e",
        "surface-container-low-dark": "#131b2e",
        "surface-container-dark": "#1b2336",
        "surface-container-high-dark": "#232b3e",
        "surface-container-highest-dark": "#2b3346",
        "on-surface-dark": "#dae2fd",
        "on-surface-variant-dark": "#c1c6d4",
        "outline-dark": "#8b919e",
        "secondary-container-dark": "#30495d",
        "on-secondary-container-dark": "#cbe6ff",
      }
    },
  },
  plugins: [],
}