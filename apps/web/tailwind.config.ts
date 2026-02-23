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
        /* Cream / warm base — Hygge & Tranquille palette */
        warm: {
          50: '#faf7f2',
          100: '#f5f0e8',
          200: '#ebe4d6',
          300: '#ddd3c0',
          400: '#c9b99f',
          500: '#b5a182',
          600: '#a08b68',
          700: '#857154',
          800: '#6b5b45',
          900: '#574a3a',
          950: '#2e261e',
        },
        /* Olive / sage — key accent */
        sage: {
          50: '#f5f7f3',
          100: '#e8ede4',
          200: '#d2dccb',
          300: '#b3c4a8',
          400: '#8fa882',
          500: '#6f8d62',
          600: '#57724c',
          700: '#465c3e',
          800: '#3a4b34',
          900: '#313f2d',
          950: '#182117',
        },
        /* Earth / brown — text tones */
        earth: {
          50: '#f8f6f3',
          100: '#efebe4',
          200: '#dfd6c9',
          300: '#cbbba7',
          400: '#b49c82',
          500: '#a4856a',
          600: '#97735d',
          700: '#7e5e4f',
          800: '#674e43',
          900: '#554139',
          950: '#3a2a22',
        },
        /* Sky — breath-related content */
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
        /* Rose — resets & body */
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
        /* Gold — warm accent from "The Practice Space" */
        gold: {
          50: '#fdf9ef',
          100: '#faf0d3',
          200: '#f4dfa5',
          300: '#edc86e',
          400: '#e7b243',
          500: '#de9926',
          600: '#c5781c',
          700: '#a45819',
          800: '#86461b',
          900: '#6e3b19',
          950: '#3e1d0a',
        },
      },
      fontFamily: {
        serif: [
          '"Cormorant Garamond"',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
        ],
        sans: [
          '"DM Sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-xl': ['2.25rem', { lineHeight: '1.15', fontWeight: '600' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-base': ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-base': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'calm-body': ['1.125rem', { lineHeight: '1.85' }],
        'calm-lg': ['1.25rem', { lineHeight: '1.85' }],
      },
      spacing: {
        'calm-sm': '1.5rem',
        'calm-md': '2.5rem',
        'calm-lg': '4rem',
        'calm-xl': '6rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 20px -4px rgba(58, 42, 34, 0.08)',
        'soft-lg': '0 8px 32px -8px rgba(58, 42, 34, 0.12)',
        'card': '0 1px 3px rgba(58, 42, 34, 0.04), 0 4px 12px rgba(58, 42, 34, 0.06)',
        'card-hover': '0 4px 16px rgba(58, 42, 34, 0.08), 0 8px 24px rgba(58, 42, 34, 0.1)',
        'bento': '0 1px 2px rgba(58, 42, 34, 0.03), 0 2px 8px rgba(58, 42, 34, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-slow': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-up-slow': 'slideUp 0.9s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'breathe': 'breathe 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.4, 0, 0.2, 1)',
        gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
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
