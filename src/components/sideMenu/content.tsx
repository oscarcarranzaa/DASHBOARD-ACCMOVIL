'use client'
import { usePathname } from 'next/navigation'
import ArrowAngleSVG from '../icons/arrowAngle'
import { menuItems } from './menuObjects'
import MenuItems from './menuItems'
import { useCallback, useEffect, useState } from 'react'
import style from './sideMenu.module.css'
import Link from 'next/link'
import CollapseArrowLeftSVG from '../icons/collapseArrowLeft'
import CollapseArrowRightSVG from '../icons/collapseArrowRight'
import { Tooltip } from '@nextui-org/react'
import useUserInfo from '@/hooks/useUserInfo'
import { verifyAccess } from '@/lib/verifyAccess'

type TProps = {
  startMenu: boolean
}
export default function SideMenuContent({ startMenu }: TProps) {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(startMenu)
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const { userData } = useUserInfo()
  const toggleMenu = useCallback((index: number) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  const setCookie = (open: boolean) => {
    document.cookie = `openMenu=${open}; path=/;`
  }
  useEffect(() => {
    setCookie(isOpen)
  }, [isOpen])

  return (
    <>
      <nav
        className={`bg-white z-50 dark:bg-[#131315] ${isOpen ? 'w-16' : ' w-56 overflow-y-scroll'} p-2 pt-5 border-r border-gray-200 dark:border-gray-600  ${style.menuContent}`}
      >
        <div>
          <Tooltip
            content="Expandir"
            placement="right"
            offset={8}
            className="dark:bg-black"
            isDisabled={!isOpen}
          >
            <button
              className="p-2 w-full text-start flex items-center gap-2 mb-10 bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:stroke-white  hover:bg-zinc-200 rounded-md fill-black stroke-black"
              onClick={() => {
                setIsOpen(!isOpen)
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

        {userData && (
          <ul>
            {menuItems.map((menu, index) => {
              const userRoles = userData.role ? userData.role.keys : null
              const isRouteActive = path.startsWith(menu.urlKey)
              const menuKeys = menu.permissionKeys
                ? [...menu.permissionKeys]
                : []

              const menuItemsKeys =
                menu.items?.map((k) => k.permissionKeys).flat() ?? []
              const allKeys = [menuKeys, menuItemsKeys].flat()

              const isView = verifyAccess({
                keys: allKeys,
                userKeys: userRoles,
              })

              if (!isView) return null
              if (menu.href) {
                return (
                  <li key={index}>
                    <Tooltip
                      content={menu.name}
                      placement="right"
                      offset={8}
                      className="dark:bg-black"
                      isDisabled={!isOpen}
                    >
                      <Link
                        href={menu.href}
                        className={`flex ${style.activeVibrate} flex-wrap mt-1 p-2 ${isOpen ? 'justify-center' : 'justify-between px-4 '} rounded-md ${isRouteActive ? 'bg-zinc-950 dark:bg-zinc-700 text-white font-medium stroke-white fill-white' : 'dark:fill-white stroke-black dark:stroke-white fill-black text-gray-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
                        onClick={() => toggleMenu(index)}
                      >
                        <div
                          className={`flex ${isOpen ? 'justify-center' : ''}`}
                        >
                          <div className={style.vibrate}>{menu.icon}</div>
                          <p
                            className={`ml-3 text-sm  ${isOpen ? 'hidden' : 'block'}`}
                          >
                            {menu.name}
                          </p>
                        </div>
                      </Link>
                    </Tooltip>
                  </li>
                )
              } else {
                return (
                  <li key={index}>
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
                              {menu.items && isOpen ? (
                                <MenuItems
                                  items={menu.items}
                                  space={false}
                                  userKeys={userRoles}
                                />
                              ) : null}
                            </div>
                          </div>
                        </>
                      }
                    >
                      <div>
                        <button
                          className={`${style.activeVibrate} flex w-full flex-wrap mt-2 p-2 ${isOpen ? 'justify-center' : 'justify-between px-4 '} rounded-md ${isRouteActive ? 'bg-zinc-950 dark:bg-zinc-700 text-white font-medium stroke-white fill-white' : 'dark:fill-white stroke-black dark:stroke-white fill-black text-gray-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}
                          onClick={() => toggleMenu(index)}
                        >
                          <div className="flex">
                            <div className={`  ${style.vibrate}`}>
                              {menu.icon}
                            </div>
                            <p
                              className={`ml-3 text-sm  ${isOpen ? 'hidden' : 'block'}`}
                            >
                              {menu.name}
                            </p>
                          </div>
                          <div
                            className={`${openMenu === index ? ' rotate-180' : ''} transition-transform stroke-black fill-black  dark:fill-zinc-300 dark:stroke-zinc-300 `}
                          >
                            {menu.items && !isOpen ? (
                              <ArrowAngleSVG size={20} />
                            ) : null}
                          </div>
                        </button>
                        <div
                          className={`${
                            openMenu === index && !isOpen
                              ? ' max-h-60 mb-5'
                              : ' max-h-0  '
                          } overflow-hidden`}
                          style={{ transition: 'max-height 0.5s' }}
                        >
                          {menu.items ? (
                            <MenuItems
                              userKeys={userRoles}
                              items={menu.items}
                              space
                            />
                          ) : null}
                        </div>
                      </div>
                    </Tooltip>
                  </li>
                )
              }
            })}
          </ul>
        )}
      </nav>
    </>
  )
}
