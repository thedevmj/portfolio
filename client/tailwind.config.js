/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme tokens resolved through CSS variables (see index.css).
        // Colors are full values — never use opacity modifiers on them.
        bg: 'var(--bg)',
        elev: 'var(--bg-elev)',
        'elev-2': 'var(--bg-elev-2)',
        glass: 'var(--glass)',
        fg: 'var(--fg)',
        muted: 'var(--fg-muted)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'on-accent': 'var(--on-accent)'
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      maxWidth: {
        '8xl': '90rem'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem'
      },
      letterSpacing: {
        tightest: '-0.055em'
      },
      boxShadow: {
        soft: '0 30px 80px -48px rgba(0,0,0,0.55)',
        lift: '0 50px 110px -60px rgba(0,0,0,0.7)'
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'pulse-soft': 'pulseSoft 5s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.08)' }
        }
      }
    }
  },
  plugins: []
}
