'use client'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

type TProps = {
  title: string
  value?: string
  query?: string
  icon: ReactNode
}
export default function PostsListTarget({
  title,
  value,
  icon,
  query = '',
}: TProps) {
  const DEFAUTL_QUERY = ''
  const path = useSearchParams()
  const q = path.get('status') ?? DEFAUTL_QUERY

  return (
    <>
      <Link
        href={`/dash/posts${query ? `?status=${query}` : ''}`}
        className={`max-w-60 hover:cursor-pointer border-b-5 ${q === query ? ' border-primary' : 'border-transparent opacity-60'}`}
      >
        <div className="   p-1 px-3">
          <div className=" dark:fill-white dark:stroke-white stroke-zinc-500 flex gap-2">
            <p className="  font-medium">{title}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
