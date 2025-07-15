'use client'

import { ThemeProvider } from 'next-themes'
import { HeroUIProvider, ToastProvider } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider locale="es-ES">
      <ThemeProvider attribute="class">
        {children}
        <ToastProvider />
      </ThemeProvider>
    </HeroUIProvider>
  )
}
