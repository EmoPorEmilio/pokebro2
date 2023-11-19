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
  safelist: [
    'bg-[#A8A878]',
    'bg-[#C03028]',
    'bg-[#A890f0]',
    'bg-[#a040a0]',
    'bg-[#e0c068]',
    'bg-[#b8a038]',
    'bg-[#a8b820]',
    'bg-[#705898]',
    'bg-[#b8b8d0]',
    'bg-[#f08030]',
    'bg-[#6890f0]',
    'bg-[#78c850]',
    'bg-[#f8d030]',
    'bg-[#f85888]',
    'bg-[#98d8d8]',
    'bg-[#7038f8]',
    'bg-[#705848]',
    'bg-[#EE99AC]',
  ],
  plugins: [],
};
export default config;
