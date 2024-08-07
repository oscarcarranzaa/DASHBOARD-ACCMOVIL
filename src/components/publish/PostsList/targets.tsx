'use client'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

type TProps = {
  title: string
  value: string
  query: string
  icon: ReactNode
}
export default function PostsListTarget({ title, value, icon, query }: TProps) {
  const DEFAUTL_QUERY = 'published'
  const path = useSearchParams()
  const q = path.get('query') ?? DEFAUTL_QUERY

  return (
    <>
      <Tooltip key={value} content={value} placement="bottom">
        <Link
          href={`/dash/posts?query=${query}`}
          className={`max-w-60 hover:cursor-pointer border-b-2 ${q === query ? ' border-zinc-500' : 'border-transparent'}`}
        >
          <div className="   p-1 px-3">
            <div className=" dark:fill-white dark:stroke-white stroke-zinc-500 flex gap-2">
              {icon}
              <p className=" text-lg font-semibold">{title}</p>
            </div>
          </div>
        </Link>
      </Tooltip>
    </>
  )
}
