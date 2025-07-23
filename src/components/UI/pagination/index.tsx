'use client'
import { Pagination } from '@heroui/react'
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
      <div className="pb-20">
        <Pagination
          showControls
          showShadow
          onChange={(n) => createPageUrl(n)}
          variant="light"
          color="default"
          total={totalPages}
          page={Math.abs(currentPage)}
        />
      </div>
    </>
  )
}
