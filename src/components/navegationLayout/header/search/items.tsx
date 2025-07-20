'use client'
import { Search } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  search?: string
  startContent?: React.ReactNode
  title?: string
  description?: string
  url?: string
  type?: string
}

export default function SearchItems({
  search,
  startContent,
  title,
  description,
  type,
  url,
}: TProps) {
  return (
    <Link
      href={url || '#'}
      className="flex items-center bg-zinc-100 hover:bg-zinc-200 z-50  dark:hover:bg-zinc-800 rounded-md p-2 m-2 dark:bg-zinc-950 gap-2"
    >
      <div className="px-1">{startContent || <Search />}</div>
      <div>
        <div className="text-xs mb-1">Busqueda &gt; {type || 'otro'}</div>
        <div className="font-semibold text-sm line-clamp-2">{title}</div>
        <div className="text-xs line-clamp-2">{description}</div>
      </div>
    </Link>
  )
}
