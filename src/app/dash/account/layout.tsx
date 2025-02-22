'use client'
import LockSVG from '@/components/icons/lock'
import UserSVG from '@/components/icons/user'
import NavegationPages from '@/components/navegationPages'
import { useAuthStore } from '@/store/auth'
import { Avatar } from "@heroui/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const ICON_SIZE = 28
const PROFILE_MENU = [
  {
    name: 'General',
    href: '/dash/account',
    icon: <UserSVG size={ICON_SIZE} />,
  },
  {
    name: 'Seguridad',
    href: '/dash/account/security',
    icon: <LockSVG size={ICON_SIZE} />,
  },
]
type TProps = {
  children: ReactNode
}
export default function AccountLayout({ children }: TProps) {
  const user = useAuthStore((store) => store.user)
  const path = usePathname()

  const image = user?.avatar
    ? user.avatar + '-thumb.webp'
    : '/static/default-profile.png'
  return (
    <>
      <NavegationPages text="Configuracion de la cuenta" />
      <div className="grid gap-10 grid-cols-11">
        <div className=" col-span-3 mt-2">
          {user ? (
            <div className="flex gap-3 items-center p-3 px-4 border dark:border-zinc-700 border-zinc-300 rounded-lg overflow-hidden">
              <Avatar className="flex-none" src={image} />
              <div>
                <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                <p>{`@${user.username}`}</p>{' '}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="mt-5">
            {PROFILE_MENU.map((m) => {
              return (
                <div key={m.href}>
                  <Link
                    href={m.href}
                    className={` flex p-2 px-4 mt-1 border border-transparent items-center gap-2 rounded-lg ${path === m.href ? 'font-bold dark:bg-zinc-800 bg-zinc-100 border-zinc-200 dark:border-zinc-600 ' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                  >
                    <div className="stroke-black dark:stroke-white dark:fill-white fill-black">
                      {m.icon}
                    </div>
                    <p>{m.name}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className=" col-span-8">{children}</div>
      </div>
    </>
  )
}
