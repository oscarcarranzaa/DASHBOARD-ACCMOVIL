'use client'
import { ReactNode, useState } from 'react'
import Header from './header'
import SideMenuContent from './sideMenu'

export default function NavegationLayout({
  children,
}: {
  children: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Header />

      <div
        className={`bg-zinc-50 dark:bg-zinc-950 grid  ${!isOpen ? 'grid-cols-[224px_minmax(0,_1fr)]' : 'grid-cols-[64px_minmax(0,_1fr)]'} min-h-screen `}
      >
        <SideMenuContent isOpen={isOpen} onOpenChange={setIsOpen} />

        {children}
      </div>
    </>
  )
}
