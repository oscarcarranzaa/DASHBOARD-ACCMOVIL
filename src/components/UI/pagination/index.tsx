'use client'
import { Pagination } from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

type TProps = {
  totalPages: number
  pageName?: string
}
export default function PaginationPage({ totalPages, pageName }: TProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryName = pageName ?? 'p'
  const currentPage = Number(searchParams.get(queryName)) || 1

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set(queryName, page.toString())
    const url = `${pathname}?${params.toString()}`
    router.push(url)
    return
  }
  return (
    <>
      <div>
        <Pagination
          onChange={(n) => createPageUrl(n)}
          variant="bordered"
          total={totalPages}
          page={Math.abs(currentPage)}
        />
      </div>
    </>
  )
}
