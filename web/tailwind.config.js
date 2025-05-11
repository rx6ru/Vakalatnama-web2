/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
         major: ['var(--font-major-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

