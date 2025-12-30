/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'hsl(340, 80%, 60%)',
                'primary-dark': 'hsl(340, 80%, 50%)',
                'primary-light': 'hsl(340, 80%, 70%)',
                secondary: 'hsl(280, 70%, 50%)',
                'secondary-dark': 'hsl(280, 70%, 40%)',
                'secondary-light': 'hsl(280, 70%, 60%)',
                accent: 'hsl(45, 100%, 50%)',
                'accent-dark': 'hsl(40, 100%, 45%)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
}
