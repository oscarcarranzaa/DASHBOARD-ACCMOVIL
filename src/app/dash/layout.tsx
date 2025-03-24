'use client'

import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'
import NavegationLayout from '@/components/navegationLayout'
import { ToastProvider } from '@heroui/toast'

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
          <main className=" flex-none block">
            <div className="   p-5 container w-full">{children}</div>
          </main>
        </NavegationLayout>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
