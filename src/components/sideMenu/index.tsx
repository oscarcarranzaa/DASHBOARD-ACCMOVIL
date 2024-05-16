'use client'
import { usePathname } from 'next/navigation'
import ArrowAngleSVG from '../icons/arrowAngle'
import { menuItems } from './menuObjects'
import MenuItems from './menuItems'
import { useState } from 'react'
import style from './sideMenu.module.css'
import Link from 'next/link'

export default function SideMenu() {
  const path = usePathname()

  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const toggleMenu = (index: number) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index))
  }
  return (
    <>
      <nav
        className={`bg-white dark:bg-zinc-800 w-60 p-3 sticky top-0 h-screen pt-10 border-r border-gray-200 dark:border-gray-600 flex-none overflow-y-scroll ${style.menuContent}`}
      >
        <ul>
          {menuItems.map((menu, index) => {
            const link = menu.href || '#'

            return (
              <li key={index}>
                <Link
                  href={link}
                  className={`flex justify-between cursor-pointer flex-wrap mt-2 p-3 pl-4 pr-4 rounded-md ${path === menu.href ? 'bg-sky-100 text-sky-600 fill-sky-600 dark:bg-zinc-950 dark:text-white font-medium' : 'fill-black text-gray-800 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-700'}`}
                  onClick={() => toggleMenu(index)}
                >
                  <div className="flex">
                    <div className="stroke-black fill-black  dark:fill-zinc-300 dark:stroke-zinc-300 ">
                      {menu.icon}
                    </div>
                    <p className="ml-3 text-sm ">{menu.name}</p>
                  </div>
                  <div
                    className={`${openMenu === index ? ' rotate-180' : ''} transition-transform stroke-black fill-black  dark:fill-zinc-300 dark:stroke-zinc-300 `}
                  >
                    {menu.items ? <ArrowAngleSVG size={24} /> : null}
                  </div>
                </Link>
                <div
                  className={`${
                    openMenu === index ? ' max-h-60' : ' max-h-0  '
                  } ml-10 overflow-hidden`}
                  style={{ transition: 'max-height 0.5s' }}
                >
                  {menu.items ? <MenuItems items={menu.items} /> : null}
                </div>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
