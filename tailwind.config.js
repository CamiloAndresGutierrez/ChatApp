/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',   // Pure black
          600: '#1A1A1A',       // Very dark gray
          400: '#333333',       // Dark gray
          200: '#666666',       // Medium gray
          foreground: '#FFFFFF', // White for contrast
        },
        divider: "rgba(255, 255, 255, 0.12)"
      },
    },
  },
}