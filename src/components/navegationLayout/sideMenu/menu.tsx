/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { usePathname } from 'next/navigation'
import ArrowAngleSVG from '@/components/icons/arrowAngle'
import MenuItems from './menuItems'
import style from './sideMenu.module.css'
import Link from 'next/link'

import { useAuthStore } from '@/store/auth'
import { usePermit } from '@/hooks/usePermit'
import { Tooltip } from '@heroui/react'

type menuItemsType = {
  name: string
  href: string
  permissionKeys: string[]
}
type menuType = {
  name: string
  icon: React.ReactNode
  urlKey: string
  href?: string
  disabled?: boolean
  permissionKeys?: string[]
  items?: menuItemsType[]
  isOwner?: boolean
}

type TProps = {
  menu: menuType
  index: number
  openMenu: number | null
  isOpen: boolean
  toggleMenu: (index: number) => void
}

export default function MenuModules({
  menu,
  index,
  openMenu,
  isOpen,
  toggleMenu,
}: TProps) {
  const { user } = useAuthStore()
  const path = usePathname()
  const userRoles = user?.role ? user.role.keys : null
  const isRouteActive = path.startsWith(menu.urlKey)
  const menuKeys = menu.permissionKeys ? [...menu.permissionKeys] : []

  const menuItemsKeys = menu.items?.map((k) => k.permissionKeys).flat() ?? []
  const allKeys = [menuKeys, menuItemsKeys].flat()

  const isView = usePermit({
    keys: allKeys,
  })

  const isOwner = menu.isOwner ? user?.is_owner : true
  const isDisabled = menu.disabled || !isView || !isOwner

  if (isDisabled) return null
  if (menu.href) {
    return (
      <li key={index} className=" list-none">
        <Tooltip
          content={menu.name}
          placement="right"
          offset={8}
          closeDelay={0}
          disableAnimation
          className="dark:bg-black"
          isDisabled={!isOpen}
        >
          <Link
            href={menu.href}
            className={`flex ${style.activeVibrate} flex-wrap mt-1 p-3 ${isOpen ? 'justify-center' : 'justify-between px-4 '} rounded-md ${isRouteActive ? 'bg-zinc-950 dark:bg-zinc-700 text-white font-medium stroke-white fill-white' : 'dark:fill-white stroke-black dark:stroke-white fill-black text-gray-800 dark:text-white hover:bg-white dark:hover:bg-zinc-800'}`}
            onClick={() => toggleMenu(index)}
          >
            <div className={`flex ${isOpen ? 'justify-center' : ''}`}>
              <div className={style.vibrate}>{menu.icon}</div>
              <p className={`ml-3 text-sm  ${isOpen ? 'hidden' : 'block'}`}>
                {menu.name}
              </p>
            </div>
          </Link>
        </Tooltip>
      </li>
    )
  }
  return (
    <li key={index} className=" list-none">
      <Tooltip
        placement="right-start"
        offset={8}
        className="dark:bg-black p-0 rounded-lg border dark:border-zinc-600 "
        isDisabled={!isOpen}
        content={
          <>
            <div>
              <div className="text-sm font-semibold dark:bg-zinc-950 bg-zinc-50 border-b dark:border-zinc-600 rounded-tr-md rounded-tl-md px-3 py-2">
                <p>{menu.name}</p>
              </div>
              <div className="p-1">
                {menu.items && isOpen
                  ? menu.items.map((item, index) => (
                      <MenuItems key={index} items={item} space={false} />
                    ))
                  : null}
              </div>
            </div>
          </>
        }
      >
        <div>
          <button
            className={`${style.activeVibrate} flex w-full flex-wrap mt-2 p-3 ${isOpen ? 'justify-center' : 'justify-between px-4 '} rounded-md ${isRouteActive ? 'bg-zinc-950 dark:bg-zinc-700 text-white font-medium stroke-white fill-white' : 'dark:fill-white stroke-black dark:stroke-white fill-black text-gray-800 dark:text-white hover:bg-white dark:hover:bg-zinc-800'}`}
            onClick={() => toggleMenu(index)}
          >
            <div className="flex">
              <div className={`  ${style.vibrate}`}>{menu.icon}</div>
              <p className={`ml-3 text-sm  ${isOpen ? 'hidden' : 'block'}`}>
                {menu.name}
              </p>
            </div>
            <div
              className={`${openMenu === index ? ' rotate-180' : ''}  ${isRouteActive ? 'fill-white stroke-white' : ''} transition-transform stroke-black fill-black  dark:fill-zinc-300 dark:stroke-zinc-300 `}
            >
              {menu.items && !isOpen ? <ArrowAngleSVG size={20} /> : null}
            </div>
          </button>
          <div
            className={`${
              openMenu === index && !isOpen ? ' max-h-96 mb-5' : ' max-h-0  '
            } overflow-hidden`}
            style={{ transition: 'max-height 0.5s' }}
          >
            {menu.items
              ? menu.items.map((item, index) => (
                  <MenuItems key={index} items={item} space />
                ))
              : null}
          </div>
        </div>
      </Tooltip>
    </li>
  )
}
