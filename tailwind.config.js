/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'raw': '(orientation: portrait) and (max-width: 768px)'},
      },
    },
  },
  plugins: [],
}
