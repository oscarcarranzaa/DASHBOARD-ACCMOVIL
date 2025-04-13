'use client'

import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'
import NavegationLayout from '@/components/navegationLayout'
import { ToastProvider } from '@heroui/react'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HeroUIProvider locale="es-ES">
      <ToastProvider />
      <ThemeProvider attribute="class">
        <NavegationLayout>
          <main className="flex-none block ">
            <div className="px-5 pt-5 max-w-[1700px] h-full w-full ">
              {children}
            </div>
          </main>
        </NavegationLayout>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
