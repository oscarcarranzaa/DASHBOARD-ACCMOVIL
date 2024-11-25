'use client'
import { getAllCoupons } from '@/api/offerts'
import NavegationPages from '@/components/navegationPages'
import CouponEditor from '@/components/offers/coupons/couponEditor'
import CouponList from '@/components/offers/coupons/couponList'
import Search from '@/components/UI/search'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const ROWS = 10
export default function CouponHome() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''
  const { data, isPending } = useQuery({
    queryKey: ['coupons', currentPage, search],
    queryFn: () =>
      getAllCoupons({
        page: currentPage.toString(),
        limit: ROWS.toString(),
        q: search,
      }),
  })
  return (
    <>
      <NavegationPages text="Cupones" />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar cupones..." />
          <CouponEditor />
        </div>
        <div className="mb-16">
          <CouponList data={data} isPending={isPending} rows={ROWS} />
        </div>
      </div>
    </>
  )
}
