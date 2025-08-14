'use client'
import { ReactNode, useState } from 'react'
import Header from './header'
import SideMenuContent from './sideMenu'

type TProps = {
  children: ReactNode
  isOpenMenu: boolean
}
export default function NavegationLayout({ children, isOpenMenu }: TProps) {
  const [isOpen, setIsOpen] = useState(isOpenMenu)
  return (
    <>
      <Header />

      <div
        className={`bg-zinc-50 min-w-[700px] dark:bg-zinc-950 grid  ${!isOpen ? 'grid-cols-[var(--open-menu-width)_minmax(0,1fr)]' : 'grid-cols-[var(--close-menu-width)_minmax(0,1fr)]'} min-h-screen `}
      >
        <SideMenuContent isOpen={isOpen} onOpenChange={setIsOpen} />

        <div className="mt-[calc(var(--header-height))] relative min-h-[calc(100vh_var(--header-height))]">
          {children}
          <footer className="mt-10 mb-1 absolute bottom-0 w-full text-center">
            <p className="text-center text-xs dark:text-white opacity-50">
              Versión Beta v0.0.1 - © 2025 Accmovil. Todos los derechos
              reservados.
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
