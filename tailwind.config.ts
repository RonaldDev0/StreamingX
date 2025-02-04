import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed'
      }
    }
  },
  plugins: []
} satisfies Config
