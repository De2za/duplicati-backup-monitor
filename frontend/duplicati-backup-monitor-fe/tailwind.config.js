module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'blu-scuro': '#1E3A8A',
        'crema': '#F5E8C7',
        'bianco-caldo': '#FFFDF5',
        'marrone': '#47423E',
        'verde-ok': '#2D6A4F',
        'arancione-warning': '#F4A261',
        'rosso-error': '#D62828',
        'grigio-offline': '#6B7280',
        'viola-unknown': '#A855F7',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'lavishly': ['Lavishly Yours', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
