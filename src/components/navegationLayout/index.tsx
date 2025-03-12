'use client'
import { ReactNode } from 'react'
import Header from './header'
import SideMenuContent from './sideMenu'

export default function NavegationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header />
      <div className="bg-zinc-50 dark:bg-zinc-950 flex">
        <SideMenuContent />
        {children}
      </div>
    </>
  )
}
