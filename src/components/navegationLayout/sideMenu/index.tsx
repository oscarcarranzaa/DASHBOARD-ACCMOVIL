/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { usePathname } from 'next/navigation'
import ArrowAngleSVG from '@/components/icons/arrowAngle'
import { menuItems } from './menuObjects'
import MenuItems from './menuItems'
import { useCallback, useEffect, useState } from 'react'
import style from './sideMenu.module.css'
import Link from 'next/link'
import CollapseArrowLeftSVG from '@/components/icons/collapseArrowLeft'
import CollapseArrowRightSVG from '@/components/icons/collapseArrowRight'
import { Button, Spinner, Tooltip } from '@heroui/react'
import { verifyAccess } from '@/lib/verifyAccess'
import { Power } from 'lucide-react'
import { useLogout } from '@/hooks/useLogout'
import { useAuthStore } from '@/store/auth'
import { usePermit } from '@/hooks/usePermit'
import MenuModules from './menu'

type TProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function SideMenuContent({ isOpen, onOpenChange }: TProps) {
  const path = usePathname()
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const { user } = useAuthStore()
  const toggleMenu = useCallback((index: number) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  const setCookie = (open: boolean) => {
    document.cookie = `openMenu=${open}; path=/;`
  }

  useEffect(() => {
    setCookie(isOpen)
  }, [isOpen])

  const { logout, isPending } = useLogout()

  return (
    <>
      <div className="relative">
        <nav
          className={`fixed top-0 left-0 p-2 ${isOpen ? 'w-(--close-menu-width) right-(--close-menu-width)' : 'w-(--open-menu-width) right-(--open-menu-width)'}   col-span-1  border-r h-screen border-gray-200 dark:border-gray-600  ${style.menuContent}`}
        >
          <div className="mt-[calc(var(--header-height)+0.7rem)]">
            <Tooltip
              content="Abrir menú"
              placement="right"
              offset={8}
              className="dark:bg-black"
              isDisabled={!isOpen}
            >
              <button
                className="p-2 w-full text-start flex items-center gap-2 mb-10 dark:bg-zinc-900 bg-zinc-200 dark:hover:bg-zinc-800 dark:stroke-white  hover:bg-zinc-300 rounded-md fill-black stroke-black"
                onClick={() => {
                  onOpenChange(!isOpen)
                }}
              >
                {isOpen ? (
                  <CollapseArrowRightSVG size={24} />
                ) : (
                  <CollapseArrowLeftSVG size={24} />
                )}
                <p className={isOpen ? 'hidden' : 'block'}>Cerrar</p>
              </button>
            </Tooltip>
          </div>

          {user && (
            <ul>
              {menuItems.map((menu, index) => {
                return (
                  <MenuModules
                    key={index}
                    menu={menu}
                    index={index}
                    openMenu={openMenu}
                    isOpen={isOpen}
                    toggleMenu={toggleMenu}
                  />
                )
              })}
            </ul>
          )}
          <div className="absolute p-2 left-0 right-0 bottom-8 ">
            <Tooltip
              content="Cerrar sesión"
              placement="right"
              offset={8}
              className="dark:bg-black"
              isDisabled={!isOpen}
            >
              <Button
                className={`flex flex-wrap items-center mt-2 w-full bg-red-500/10 rounded-lg text-red-600 `}
                isIconOnly={isOpen}
                variant="flat"
                onPress={logout}
              >
                {isPending ? (
                  <Spinner size="sm" variant="spinner" color="danger" />
                ) : (
                  <Power size={20} />
                )}
                <p className={isOpen ? 'hidden' : 'block'}>Cerrar sesión</p>
              </Button>
            </Tooltip>
          </div>
        </nav>
      </div>
    </>
  )
}
