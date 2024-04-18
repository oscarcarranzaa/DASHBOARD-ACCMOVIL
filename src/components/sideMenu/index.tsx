'use client'
import { usePathname } from 'next/navigation'
import ArrowAngleSVG from '../icons/arrowAngle'
import { menuItems } from './menu'
import MenuItems from './menuItems'
import { useState } from 'react'

export default function SideMenu() {
  const path = usePathname()
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const toggleMenu = (index: number) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index))
  }
  return (
    <>
      <nav className="bg-white w-60 p-3 min-h-screen">
        <ul>
          {menuItems.map((menu, index) => {
            return (
              <li key={index}>
                <div
                  className={`flex justify-between cursor-pointer flex-wrap mt-2 p-3 pl-4 pr-4 rounded-md ${path === menu.href ? 'bg-sky-100 text-sky-600 fill-sky-600' : 'fill-black text-gray-800 hover:bg-slate-100'}`}
                  onClick={() => toggleMenu(index)}
                >
                  <div className="flex">
                    <div>{menu.icon}</div>
                    <p className="ml-3 font-medium text-sm ">{menu.name}</p>
                  </div>
                  <div className="ml-2">
                    {menu.items ? <ArrowAngleSVG size={20} /> : null}
                  </div>
                </div>
                <div
                  className={`${
                    openMenu === index ? ' max-h-60 ' : ' max-h-0  '
                  } ml-10  overflow-hidden`}
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
