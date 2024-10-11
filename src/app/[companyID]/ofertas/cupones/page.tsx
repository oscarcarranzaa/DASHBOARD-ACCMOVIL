'use client'
import NavegationPages from '@/components/navegationPages'
import CouponEditor from '@/components/offers/coupons/couponEditor'
import Search from '@/components/UI/search'

export default function CouponHome() {
  return (
    <>
      <NavegationPages text="Cupones" />
      <div>
        <div className="mb-3 flex justify-between">
          <Search placeHolder="Buscar cupones..." />
          <CouponEditor />
        </div>
        <div className="mb-16">
          <p>Cupones</p>
        </div>
      </div>
    </>
  )
}
