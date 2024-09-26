/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: ' var(--surface-border)',
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
