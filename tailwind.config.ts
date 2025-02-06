import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/react'

export default {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  plugins: [heroui({
    themes: {
      dark: {
        colors: {}
      }
    }
  })]
} satisfies Config
