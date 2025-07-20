/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D2447', // Un azul oscuro como color primario
        secondary: '#4ADE80', // Un verde brillante como color secundario
        light: '#f8f9fa', // Un color claro para los fondos
        accent: '#F97316',  
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Una fuente limpia como predeterminada
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}