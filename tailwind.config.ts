import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      bg: '#202020',
      ['bg-light']: '#515151',
      accent: '#ebbed2',
      ['accent-highlight']: '#e2a2be',
      ['cards-bg']: '#373737',
      ['cards-bg-load']: '#484848',
      correct: '#83f1a7',
    },
  },
  plugins: [],
};
export default config;
