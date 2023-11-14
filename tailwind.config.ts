import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxs: '320px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    colors: {
      background: '#3B5260',
      ['dark-background']: '#1D272E',
      bg: '#202020',
      ['bg-light']: '#515151',
      accent: '#DF5C9A',
      ['accent-highlight']: '#e2a2be',
      ['cards-bg']: '#373737',
      ['cards-bg-load']: '#484848',
      correct: '#83f1a7',
      incorrect: '#e74c3c',
    },
  },
  plugins: [],
};
export default config;
