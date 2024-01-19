import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xxs: '320px',
        xs: '475px',
        ...defaultTheme.screens,
      },
      colors: {
        /*
      background: '#3B5260',
      ['dark-background']: '#1D272E',
      bg: '#202020',
      ['bg-light']: '#515151',
      accent: '#DF5C9A',
      ['accent-highlight']: '#e2a2be',*/
        transparent: 'transparent',
        'bg-100': '#3B5260',
        'bg-200': '#293E4B',
        'bg-300': '#24313a',
        'bg-400': '#1D272E',
        'accent-200': '#FFB2D7',
        'accent-300': '#FF88C0',
        'accent-500': '#DF5C9A',
        white: '#FFFFFF',
        'gray-100': '#C0C6CA',
        'gray-200': '#A2AEB4',
        'primary-100': '#D9F2FF',
        'primary-200': '#D0E9F5',
        'primary-300': '#ADCCDC',
        'primary-400': '#B8DFFF',
        'primary-500': '#75ABC7',
        'primary-600': '#58748B',
        'primary-700': '#4F6D85',
        'primary-800': '#4C6477',
        'success-100': '#E5FFF3',
        'success-400': '#C2FFC8',
        'success-600': '#559D87',
        'warning-100': '#FFFBE5',
        'warning-400': '#FFDD87',
        'warning-600': '#9D8D55',
        'danger-100': '#FFE5E5',
        'danger-400': '#FF8787',
        'danger-600': '#9D5555',
        ['cards-bg']: '#373737',
        ['cards-bg-load']: '#484848',
        correct: '#83f1a7',
        incorrect: '#e74c3c',
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '500% 100%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '500% 100%',
            'background-position': 'right center',
          },
        },
      },
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
