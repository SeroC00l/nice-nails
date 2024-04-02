/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        spa: "url('../../spa.jpg')",
      },
      colors: {
        "primary": "#f54e85",
      },
    },
  },
  plugins: [],
};
