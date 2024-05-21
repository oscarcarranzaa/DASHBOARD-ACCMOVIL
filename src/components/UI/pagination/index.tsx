'use client'
import { Pagination } from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

type TProps = {
  totalPages: number
}
export default function PaginationPage({ totalPages }: TProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = Number(searchParams.get('p')) || 1

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('p', page.toString())
    const url = `${pathname}?${params.toString()}`
    router.push(url)
    return
  }
  return (
    <>
      <div>
        <Pagination
          onChange={(n) => createPageUrl(n)}
          showControls
          variant="bordered"
          total={totalPages}
          page={currentPage}
        />
      </div>
    </>
  )
}
