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
        /* Neutral base — cool whites & grays */
        warm: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#b0b0b0',
          500: '#8a8a8a',
          600: '#6b6b6b',
          700: '#525252',
          800: '#3a3a3a',
          900: '#2a2a2a',
          950: '#1a1a1a',
        },
        /* Cobalt blue — primary accent */
        sage: {
          50: '#eef2ff',
          100: '#dbe4fe',
          200: '#bfcdfe',
          300: '#93a8fc',
          400: '#6078f9',
          500: '#4361ee',
          600: '#2b3df6',
          700: '#2430e2',
          800: '#222ab7',
          900: '#222991',
          950: '#191c58',
        },
        /* Neutral text tones */
        earth: {
          50: '#fafafa',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#2e2e2e',
          900: '#1a1a1a',
          950: '#0f0f0f',
        },
        /* Sky — breath-related content */
        sky: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc5ff',
          400: '#36a8ff',
          500: '#0c8df1',
          600: '#006fce',
          700: '#0058a7',
          800: '#044b8a',
          900: '#0a3f72',
          950: '#06284b',
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
        /* Gold — warm accent */
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
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
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
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
        'soft': '0 2px 20px -4px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 32px -8px rgba(0, 0, 0, 0.12)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.1)',
        'bento': '0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'blue': '0 4px 24px -4px rgba(67, 97, 238, 0.25)',
        'blue-lg': '0 8px 40px -8px rgba(67, 97, 238, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-slow': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-up-slow': 'slideUp 0.9s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'breathe': 'breathe 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
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
