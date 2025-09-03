// app/fonts.ts
import { Roboto, Lora, IBM_Plex_Mono } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
})
