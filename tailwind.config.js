/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'white-smoke': '#F5F5F5',
        'primary': '#FF9119',
        'secondary': '#6B7280',
      },
    },
  },
  plugins:
   [    require('flowbite/plugin')],
}

