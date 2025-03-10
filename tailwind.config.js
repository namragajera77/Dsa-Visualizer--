/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(yellow|blue|purple)-(50|100|200|300|400|500|600|700|800|900)/,
    }
  ]
} 