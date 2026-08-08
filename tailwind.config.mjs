/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#F92C53',
          dark: '#c41e3e',
        },
        teal: {
          DEFAULT: '#00C9A7',
          dark: '#009e85',
        },
        gold: '#D4A843',
        warm: {
          900: '#1a1410',
          800: '#2D2420',
          700: '#3d322a',
          600: '#5c4d42',
          100: '#f7f7f8',
          50: '#fafafa',
        },
      },
      fontFamily: {
        heading: ['Comfortaa', 'cursive'],
        body: ['DM Sans', 'sans-serif'],
        accent: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
