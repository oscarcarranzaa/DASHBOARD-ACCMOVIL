'use client'
import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/system'
import Header from '@/components/header'
import SideMenu from '@/components/sideMenu'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NextUIProvider>
        <ThemeProvider attribute="class">
          <Header />
          <div className="bg-gray-50 dark:bg-zinc-900 flex">
            <SideMenu />
            <main className="container p-5">{children}</main>
          </div>
        </ThemeProvider>
      </NextUIProvider>
    </>
  )
}
