import { verifyAccess } from '@/lib/verifyAccess'
import Link from 'next/link'

interface IProps {
  items: {
    name: string
    href: string
    permissionKeys: string[]
  }[]
  space: boolean
  userKeys: string[] | null
}

export default function MenuItems({ items, space, userKeys }: IProps) {
  return (
    <>
      {items.map((i, index) => {
        const isView = verifyAccess({ keys: i.permissionKeys, userKeys })
        if (!isView) return null
        return (
          <div key={index}>
            <Link href={i.href}>
              <p
                className={`text-sm  dark:text-zinc-200  hover:bg-zinc-300  p-2 rounded-md ${space ? 'pl-10 text-zinc-700 dark:hover:bg-zinc-800 font-medium' : 'pl-3 min-w-44 dark:hover:bg-zinc-800'}`}
              >
                {i.name}
              </p>
            </Link>
          </div>
        )
      })}
    </>
  )
}
