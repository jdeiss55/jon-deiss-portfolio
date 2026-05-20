import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode backgrounds (unchanged)
        cream: '#F5F0E1',
        linen: '#EDE8D5',
        offwhite: '#FAFAF4',
        // Dark mode backgrounds (navy blue)
        moss: {
          DEFAULT: '#0A1628',
          secondary: '#0D1F3C',
          surface: '#102444',
        },
        // Blue accent family (replaces green)
        forest: {
          dark: '#0D3B6E',
          mid: '#00C2E0',
          hover: '#0080FF',
          light: '#B8E0FF',
        },
        // Brown/earth accent family (unchanged)
        earth: {
          dark: '#5C3D1E',
          mid: '#4A3520',
          light: '#C4A882',
          tan: '#B8926A',
        },
        // Light mode text tokens
        ink: {
          heading: '#0A1628',
          body: '#2C2018',
          muted: '#4A3520',
          accent: '#0D3B6E',
          badge: '#0A3060',
        },
        // Dark mode text tokens
        parchment: {
          heading: '#EDE8D5',
          body: '#D9D0BC',
          muted: '#B8E0FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
