'use client'
import { getAllCoupons } from '@/api/offerts'
import NavegationPages from '@/components/navegationPages'
import CouponEditor from '@/components/offers/coupons/couponEditor'
import CouponList from '@/components/offers/coupons/couponList'
import Search from '@/components/UI/search'
import { useQuery } from '@tanstack/react-query'

const ROWS = 10
export default function CouponHome() {
  const { data, isPending } = useQuery({
    queryKey: ['coupons'],
    queryFn: () => getAllCoupons({ page: '1', limit: ROWS.toString() }),
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
