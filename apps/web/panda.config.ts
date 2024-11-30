import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          'light-gray': { value: '#F3F4F7' },
          'primary-green': { value: '#00C15C' },
          'primary-red': { value: '#FE0034' },
          'dark-gray': { value: '#CBCED5' },
          'main-text': { value: '#222222' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
