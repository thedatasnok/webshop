const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Rajdhani', ...defaultTheme.fontFamily.sans],
        sans: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
    colors: {
      transparent: 'transparent',
      base: {
        DEFAULT: colors.zinc['900'],
        ...colors.zinc,
      },
      primary: {
        // cyan/aqua
        DEFAULT: '#1FFFFF',
        50: '#D7FFFF',
        100: '#C2FFFF',
        200: '#99FFFF',
        300: '#71FFFF',
        400: '#48FFFF',
        500: '#1FFFFF',
        600: '#00E6E6',
        700: '#00AEAE',
        800: '#007676',
        900: '#003E3E',
      },
      secondary: {
        // razzle-dazzle-rose
        DEFAULT: '#F726D4',
        50: '#FED7F7',
        100: '#FDC3F3',
        200: '#FB9CEB',
        300: '#FA75E4',
        400: '#F84DDC',
        500: '#F726D4',
        600: '#DD08B9',
        700: '#A7068C',
        800: '#71045E',
        900: '#3A0231',
      },
      error: {
        DEFAULT: colors.red['500'],
        ...colors.red,
      },
      warn: {
        DEFAULT: colors.yellow['500'],
        ...colors.yellow,
      },
      ok: {
        DEFAULT: colors.emerald['500'],
        ...colors.emerald,
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
};
