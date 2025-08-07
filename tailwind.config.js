/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        koopa: {
          green: '#228B22',      // Primary shell green
          'green-light': '#32CD32', // Lighter green accent
          'green-dark': '#006400',  // Darker green for depth
          cream: '#F5DEB3',         // Shell highlights/accents
          'cream-dark': '#DEB887',  // Darker cream
          shell: '#8FBC8F',         // Muted shell color for backgrounds
          white: '#FFFFFF',         // Koopa's white
          tan: '#D2B48C',          // Koopa's tan
          yellow: '#FFD700',        // Koopa's yellow
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // Friendly, rounded like Mario universe
        header: ['Orbitron', 'sans-serif'], // Bold, game-like but professional
        mono: ['Space Mono', 'monospace'], // Code/data
      }
    },
  },
  plugins: [],
}
