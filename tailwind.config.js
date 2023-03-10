/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DM: ["DM Sans", "sans-serif"]
      },
      screens: {
        'xs': {'min': '0px', 'max': '640px'},

        'sm': {'min': '640px', 'max': '767px'},

        'md': {'min': '768px', 'max': '1023px'},
  
        'lg': {'min': '1024px', 'max': '1279px'},
  
        'xl': {'min': '1280px', 'max': '1535px'},
  
        '2xl': {'min': '1535px'},
      }
    },
  },
  plugins: [],
}