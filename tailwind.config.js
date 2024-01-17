/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            inter: ['Poppins', 'sans-serif'],
        },
        extend: {
            colors: {
                'primary'   : '#e8eddf',
                'secondary' : '#333533',
                'confirm'   : '#9cc5a1',
                'danger'    : '#f25f5c'
            },
        },
    },
    plugins: [],
}