module.exports = {
  purge: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    maxHeight: {
      '25-vh': '25vh',
      '50-vh': '50vh',
      '75-vh': '75vh',
      '80-vh': '80vh',
      '90-vh': '90vh',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
