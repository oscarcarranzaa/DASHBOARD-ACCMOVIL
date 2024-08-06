'use client'
import { usePathname } from 'next/navigation'
import ArrowAngleSVG from '../icons/arrowAngle'
import { menuItems } from './menuObjects'
import MenuItems from './menuItems'
import { useCallback, useState } from 'react'
import style from './sideMenu.module.css'
import Link from 'next/link'
import CollapseArrowLeftSVG from '../icons/collapseArrowLeft'
import CollapseArrowRightSVG from '../icons/collapseArrowRight'
import { Tooltip } from '@nextui-org/react'
import { useSideBar } from '@/store/preferences'

export default function SideMenu() {
  const path = usePathname()

  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const startMenu = useSideBar((state) => state.startMenu)
  const setStartMenu = useSideBar((state) => state.toggleStartMenu)

  const toggleMenu = useCallback((index: number) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index))
  }, [])

  return (
    <>
      <nav
        className={`bg-zinc-50 z-50 dark:bg-zinc-900 ${startMenu ? 'w-16' : 'w-60 overflow-y-scroll'} p-2 pt-5 border-r border-gray-200 dark:border-gray-600  ${style.menuContent}`}
      >
        <div>
          <Tooltip
            content="Expandir"
            placement="right"
            offset={8}
            className="dark:bg-black"
            isDisabled={!startMenu}
          >
            <button
              className="p-2 w-full text-start flex items-center gap-2 mb-10 bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:stroke-white  hover:bg-zinc-200 rounded-md fill-black stroke-black"
              onClick={setStartMenu}
            >
              {startMenu ? (
                <CollapseArrowRightSVG size={24} />
              ) : (
                <CollapseArrowLeftSVG size={24} />
              )}
              <p className={startMenu ? 'hidden' : 'block'}>Colapsar</p>
            </button>
          </Tooltip>
        </div>

        <ul>
          {menuItems.map((menu, index) => {
            if (menu.href) {
              return (
                <li key={index}>
                  <Tooltip
                    content={menu.name}
                    placement="right"
                    offset={8}
                    className="dark:bg-black"
                    isDisabled={!startMenu}
                  >
                    <Link
                      href={menu.href}
                      className={`flex  flex-wrap mt-1 p-2 ${startMenu ? 'justify-center' : 'justify-between px-4 '} rounded-md ${path === menu.href ? 'bg-zinc-950 dark:bg-zinc-700 text-white font-medium stroke-white fill-white' : 'dark:fill-white stroke-black dark:stroke-white fill-black text-gray-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
                      onClick={() => toggleMenu(index)}
                    >
                      <div
                        className={`flex ${startMenu ? 'justify-center' : ''}`}
                      >
                        <div className="">{menu.icon}</div>
                        <p
                          className={`ml-3 text-sm  ${startMenu ? 'hidden' : 'block'}`}
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
                    isDisabled={!startMenu}
                    content={
                      <>
                        <div>
                          <div className="text-sm font-semibold dark:bg-zinc-950 bg-zinc-50 border-b dark:border-zinc-600 rounded-tr-md rounded-tl-md px-3 py-2">
                            <p>{menu.name}</p>
                          </div>
                          <div className="p-1">
                            {menu.items && startMenu ? (
                              <MenuItems items={menu.items} space={false} />
                            ) : null}
                          </div>
                        </div>
                      </>
                    }
                  >
                    <div>
                      <button
                        className={`flex w-full flex-wrap mt-2 p-2 ${startMenu ? 'justify-center' : 'justify-between px-4 '} rounded-md ${path === menu.href ? 'bg-sky-100 text-sky-600 fill-sky-600 dark:bg-zinc-950 dark:text-white font-medium' : 'fill-black text-gray-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
                        onClick={() => toggleMenu(index)}
                      >
                        <div className="flex">
                          <div className="stroke-black fill-black  dark:fill-zinc-300 dark:stroke-zinc-300 ">
                            {menu.icon}
                          </div>
                          <p
                            className={`ml-3 text-sm  ${startMenu ? 'hidden' : 'block'}`}
                          >
                            {menu.name}
                          </p>
                        </div>
                        <div
                          className={`${openMenu === index ? ' rotate-180' : ''} transition-transform stroke-black fill-black  dark:fill-zinc-300 dark:stroke-zinc-300 `}
                        >
                          {menu.items && !startMenu ? (
                            <ArrowAngleSVG size={20} />
                          ) : null}
                        </div>
                      </button>
                      <div
                        className={`${
                          openMenu === index && !startMenu
                            ? ' max-h-60 mb-5'
                            : ' max-h-0  '
                        } overflow-hidden`}
                        style={{ transition: 'max-height 0.5s' }}
                      >
                        {menu.items ? (
                          <MenuItems items={menu.items} space />
                        ) : null}
                      </div>
                    </div>
                  </Tooltip>
                </li>
              )
            }
          })}
        </ul>
      </nav>
    </>
  )
}
