import type { Config } from 'tailwindcss';

const tailwindPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fefdfb',
          100: '#fdf8f0',
          200: '#faf0de',
          300: '#f5e4c6',
          400: '#edd4a6',
          500: '#e2bf82',
          600: '#c9a05e',
          700: '#a37d42',
          800: '#7d5f32',
          900: '#5c4526',
          950: '#3a2b17',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e6ede5',
          200: '#cedccc',
          300: '#aec4ab',
          400: '#8aaa85',
          500: '#6b8f66',
          600: '#547350',
          700: '#435c40',
          800: '#374a35',
          900: '#2e3d2c',
          950: '#1a2319',
        },
        earth: {
          50: '#f9f6f3',
          100: '#f0ebe3',
          200: '#e0d4c5',
          300: '#ccb9a1',
          400: '#b69a7b',
          500: '#a68362',
          600: '#997256',
          700: '#805d48',
          800: '#694d3e',
          900: '#564034',
          950: '#2e211b',
        },
        sky: {
          50: '#f2f7fb',
          100: '#e4eff7',
          200: '#c3deee',
          300: '#9ec8e2',
          400: '#6eaad2',
          500: '#4d90bf',
          600: '#3b74a1',
          700: '#315e83',
          800: '#2c506d',
          900: '#29445b',
          950: '#1b2d3d',
        },
        rose: {
          50: '#fdf5f5',
          100: '#fbeaea',
          200: '#f7d5d5',
          300: '#f0b4b4',
          400: '#e68a8a',
          500: '#d76363',
          600: '#c24848',
          700: '#a33838',
          800: '#883131',
          900: '#722e2e',
          950: '#3e1414',
        },
      },

      fontFamily: {
        heading: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        body: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },

      fontSize: {
        'reading-sm': ['0.9375rem', { lineHeight: '1.7' }],
        'reading-base': ['1.0625rem', { lineHeight: '1.8' }],
        'reading-lg': ['1.1875rem', { lineHeight: '1.75' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-base': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-lg': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-xl': ['2.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        'heading-2xl': ['3rem', { lineHeight: '1.1', fontWeight: '800' }],
      },

      spacing: {
        'calm-sm': '1.5rem',
        'calm-md': '2.5rem',
        'calm-lg': '4rem',
        'calm-xl': '6rem',
        'calm-2xl': '8rem',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-slow': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'slide-up-slow': 'slide-up 0.9s ease-out forwards',
        'slide-down': 'slide-down 0.6s ease-out forwards',
        breathe: 'breathe 4s ease-in-out infinite',
      },

      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },

      transitionTimingFunction: {
        calm: 'cubic-bezier(0.4, 0, 0.2, 1)',
        gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },

      borderRadius: {
        soft: '0.625rem',
        'soft-lg': '1rem',
        'soft-xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default tailwindPreset;
