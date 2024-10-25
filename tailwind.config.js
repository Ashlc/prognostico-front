/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: ' var(--surface-border)',
      },
      colors: {
        primary: {
          100: '#E7F2FB',
          400: '#48B0E0',
          500: '#3274E6',
          600: '#2C62D6',
        },
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
