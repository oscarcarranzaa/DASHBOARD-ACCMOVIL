import { usePermit } from '@/hooks/usePermit'
import Link from 'next/link'

interface IProps {
  items: {
    name: string
    href: string
    permissionKeys: string[]
  }
  space: boolean
}

export default function MenuItems({ items, space }: IProps) {
  const isView = usePermit({ keys: items.permissionKeys })
  if (!isView) return null
  return (
    <div>
      <Link href={items.href}>
        <p
          className={`text-sm  dark:text-zinc-200  hover:bg-zinc-300  p-2 rounded-md ${space ? 'pl-10 text-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 font-medium' : 'pl-3 min-w-44 dark:hover:bg-zinc-800'}`}
        >
          {items.name}
        </p>
      </Link>
    </div>
  )
}
