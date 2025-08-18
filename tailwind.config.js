import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: 'var(--font-jakarta)',
        mulish: 'var(--font-mulish)',
      },
      colors: {
        bgPrimary: '#FFFFFF',
        bgSecondary: '#282828',
        textBlackColor: '#0C031B',
        textPrimary: '#FFFFFF',
        buttonPrimary: '#35509a',
        buttonHover: '#2b417e',
        blue: {
          600: '#2b417e',
          700: '#2c4383ff',
          800: '#21324eff',
          900: '#1b2b44ff',
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#2b417e',
            },
          },
        },
      },
    }),
  ],
};
