/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gram: {
          green: '#16a34a',
          darkgreen: '#14532d',
          lightgreen: '#dcfce7',
          saffron: '#ea580c',
          amber: '#f59e0b',
          navy: '#0f172a',
          earth: '#78350f',
          cream: '#fffdf5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
