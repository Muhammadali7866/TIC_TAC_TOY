/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': 'rgb(15, 23, 42)',
        "custom-light-dark":"#1f3540"
      },
    },
  },
  plugins: [],
}