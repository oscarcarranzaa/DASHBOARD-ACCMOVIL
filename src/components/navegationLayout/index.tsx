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
        className={`bg-zinc-50 dark:bg-zinc-950 grid  ${!isOpen ? 'grid-cols-[224px_minmax(0,_1fr)]' : 'grid-cols-[64px_minmax(0,_1fr)]'} min-h-screen `}
      >
        <SideMenuContent isOpen={isOpen} onOpenChange={setIsOpen} />

        <div className="mt-[calc(var(--header-height))]">
          {children}
          <footer className="mt-10 mb-1">
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
