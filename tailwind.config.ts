import type { Config } from 'tailwindcss'
const { heroui } = require('@heroui/theme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        height: 'height',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            p: {
              marginTop: '0.3em',
              marginBottom: '0.3em',
            },
          },
        },
        invert: {
          css: {
            p: {
              marginTop: '0.3em',
              marginBottom: '0.3em',
            },
          },
        },
      }),
    },
  },
  darkMode: 'class',
  plugins: [heroui(), require('@tailwindcss/typography')],
}

export default config
