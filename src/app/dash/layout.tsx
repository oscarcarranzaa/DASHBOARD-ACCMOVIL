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
          <main className="flex justify-center w-full">
            <div className=" max-w-[130rem] p-5 2xl:ml-10 2xl:mr-10 w-full">
              {children}
            </div>
          </main>
        </NavegationLayout>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
