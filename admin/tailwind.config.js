/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Fixed the glob pattern
  ],
  theme: {
    extend: {},
  },
  plugins: [],  // Removed the semicolon (invalid in JS objects)
}