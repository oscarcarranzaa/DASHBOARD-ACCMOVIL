import { ReactNode } from 'react'
import Header from './header'
import SideMenu from './sideMenu'

export default function NavegationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Header />
      <div className="bg-zinc-50 dark:bg-zinc-900 flex">
        <SideMenu />
        {children}
      </div>
    </>
  )
}
