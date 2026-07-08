/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.ejs', './src/**/*.js', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        'axolotl-pink': {
          100: '#FFF0F5',
          200: '#FFD6E5',
          300: '#FFADC9',
          400: '#FF6B9D', // base
          500: '#F0447D',
          600: '#D42A62',
          700: '#A81F4D',
          800: '#7C1739',
          900: '#500F26',
        },
        'deep-teal': '#0F766E',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
