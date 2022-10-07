/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'cv-yellow': '#fae1d2',
        'cv-pink': '#ffadd7',
        'cv-blue': '#b8b5f1',
        'cv-purple': '#c8b3ed',
        'rj-azalea': '#f9c4c5',
        'rj-azalea-v2': '#e69ea2',
        'rj-mountbatten': '#9a838c',
        'rj-mountbatten-v2': '#c1b0b8',
        'rj-thunder': '#322428',
        'rj-thunder-v2': '#5b464d',
        'rj-gray': '#e4e3e6'
      },

      fontFamily: {
        DM_Mono : ['DM Mono', 'monospace'],
        Roboto_Condensed: ['Roboto Condensed', 'sans-serif'],
        Josefin_Sans: ['Josefin Sans', 'sans-serif']
      },

      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      },

      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
