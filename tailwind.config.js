/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ⚠️ CRITICAL: Ensure these precise directory match patterns are active
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // This covers src/app/login/page.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};