module.exports = {
    content: ["./src/**/*.{html,js}"],
    important: '#validationApp',
    prefix: 'eglador-',
    theme: {
        extend: {
            boxShadow: {
                'top': '10px -40px 40px -30px rgba(0, 0, 0, 0.1)',
                'bottom': '10px -40px 40px 30px rgba(0, 0, 0, 0.1)'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}