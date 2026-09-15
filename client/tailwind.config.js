/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neo-brutalism tokens (resolved via CSS variables so dark mode inverts them)
        'neo-bg': 'var(--neo-bg)', // Cream canvas
        'neo-panel': 'var(--neo-panel)', // Card interiors
        'neo-ink': 'var(--neo-ink)', // Text + borders + shadows (black / cream in dark)
        'neo-accent': 'var(--neo-accent)', // Hot red
        'neo-secondary': 'var(--neo-secondary)', // Vivid yellow
        'neo-muted': 'var(--neo-muted)', // Soft violet
        'neo-white': '#FFFFFF'
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'neo-sm': '4px 4px 0px 0px var(--neo-shadow)',
        'neo-md': '8px 8px 0px 0px var(--neo-shadow)',
        'neo-lg': '12px 12px 0px 0px var(--neo-shadow)',
        'neo-xl': '16px 16px 0px 0px var(--neo-shadow)',
        'neo-white': '4px 4px 0px 0px #fff'
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'marquee-reverse': 'marquee 22s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--float-rot, 0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--float-rot, 0deg))' }
        }
      }
    }
  },
  plugins: []
}