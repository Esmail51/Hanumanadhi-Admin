/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      blue: {
        400: '#564787',
        700: '#2800AC',
      },
      gray: {
        100: '#f7fafc',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        900: '#1a202c',
      },
      Fuchsia: {
        200: '#edd5e7',
        800: '#86198f',
        900: '#701a75',
        925: '#663259',
        950: '#4a044e',
      },
      orange: {
        200: '#FCBF491A',
        300: '#FCBF49',
        400: '#FCBF49',
        500: '#FF8600'
      },
      Indigo: {
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        700: '#4B3F72'
      },
      Green :{
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#19c919',
        800: '#166534'
      },
      Rose:{
        50:'#fff1f2',
        200: '#fecdd3',
        300: '#fecdd3',
      },
      Red: {
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b'
      },
      Indigo: {
        50 : '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#4975ae',
        600: '#4f46e5',
        700: '#2d4a77',
        800: '#294063',
        900: '#263754',
        950: '#1B263B'
      },
      White: {
        200: '#F8F9FA'
      }

      // ...
    },
    extend: {
      padding: {
        '5px': '5px',
        '10px': '10px'
      },
      transitionProperty: {
        width: "width"
      },
      width: {
        'w-800' : '800px',
        'w-700' : '700px'
      }
    }
  },
  plugins: [],
}

