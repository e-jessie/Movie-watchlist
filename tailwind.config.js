/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Scans your app folder
    "./src/components/**/*.{js,ts,jsx,tsx}", // Scans your components folder
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Scans your pages folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
