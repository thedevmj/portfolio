/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0c0c0c',
          light: '#f4f2ef'
        },
        ink: {
          DEFAULT: '#121212',
          muted: '#6b6b6b'
        },
        primary: {
          DEFAULT: '#121212',
          light: '#4b4b4b',
          dark: '#000000'
        },
        accent: '#2500AD',
        line: {
          light: '#e2dfda',
          dark: '#262626'
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'marquee-reverse': 'marquee 22s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
