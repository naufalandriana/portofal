/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d1117',
        secondary: '#161b22',
        tertiary: '#21262d',
        accent: '#58a6ff',
        'accent-hover': '#1f6feb',
        border: '#30363d',
        success: '#3fb950',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' },
        },
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.15' },
        },
      }
    },
  },
  plugins: [],
}