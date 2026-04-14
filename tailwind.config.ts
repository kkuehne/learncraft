import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        water: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#3b82f6', 600: '#0284c7', 900: '#0c4a6e' },
        fish: { bronze: '#cd7f32', silver: '#c0c0c0', gold: '#ffd700' }
      }
    }
  },
  plugins: []
}

export default config
