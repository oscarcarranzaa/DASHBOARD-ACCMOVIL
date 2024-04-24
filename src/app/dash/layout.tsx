'use client'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/header'
import SideMenu from '@/components/sideMenu'

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />
        <div className="bg-gray-100 dark:bg-zinc-900 flex">
          <SideMenu />
          <main className=" container">{children}</main>
        </div>
      </ThemeProvider>
    </>
  )
}
