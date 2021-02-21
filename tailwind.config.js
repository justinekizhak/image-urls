module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: require('tailwindcss/colors'),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
