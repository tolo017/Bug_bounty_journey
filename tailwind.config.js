/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hacker: {
          dark: "#0a0b0d",      // Pitch Black
          card: "#12141c",      // Deep Slate
          border: "#1e2230",    // Border Slate
          green: "#10b981",     // Emerald Green (Success)
          amber: "#f59e0b",     // Vibrant Amber (Focus)
          muted: "#6b7280",     // Muted Gray
        }
      }
    },
  },
  plugins: [],
}
