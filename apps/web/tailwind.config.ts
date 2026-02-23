import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fdf8f0',
          100: '#f9eed9',
          200: '#f3dbb2',
          300: '#e9c285',
          400: '#dea45c',
          500: '#d48a3c',
          600: '#c47232',
          700: '#a3572b',
          800: '#844629',
          900: '#6c3b24',
          950: '#3a1d11',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c7d7c7',
          300: '#a0baa0',
          400: '#749a74',
          500: '#587d58',
          600: '#446444',
          700: '#385038',
          800: '#2f412f',
          900: '#283628',
          950: '#131e13',
        },
        earth: {
          50: '#f8f5f0',
          100: '#ede6d8',
          200: '#dccdb4',
          300: '#c7ae88',
          400: '#b59466',
          500: '#a88157',
          600: '#916a4a',
          700: '#78533e',
          800: '#644538',
          900: '#543b31',
          950: '#2f1e19',
        },
        sky: {
          50: '#f0f7fc',
          100: '#ddedf8',
          200: '#c3e0f3',
          300: '#9accea',
          400: '#6ab1de',
          500: '#4896d2',
          600: '#367bc6',
          700: '#2e65b5',
          800: '#2b5394',
          900: '#284775',
          950: '#1c2d49',
        },
        rose: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4aabb',
          400: '#ed7d99',
          500: '#e05478',
          600: '#cc3361',
          700: '#ac254f',
          800: '#902247',
          900: '#7b2041',
          950: '#440d20',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      spacing: {
        'calm-sm': '1.5rem',
        'calm-md': '2.5rem',
        'calm-lg': '4rem',
        'calm-xl': '6rem',
      },
      fontSize: {
        'calm-body': ['1.125rem', { lineHeight: '1.85' }],
        'calm-lg': ['1.25rem', { lineHeight: '1.85' }],
        'calm-xl': ['1.5rem', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: 'var(--tw-prose-body)',
            lineHeight: '1.8',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
