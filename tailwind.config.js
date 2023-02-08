/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      background: '#202020',
      backgroundLight: '#515151',
      accent: '#ebbed2',
      accentHighlight: '#e2a2be',
      cardsBackground: '#373737',
      cardsBackgroundLoad: '#484848',
      correct: '#83f1a7',
    },
  },
  plugins: [],
};
