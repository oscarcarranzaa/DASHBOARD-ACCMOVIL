'use client'
import { getAllCoupons } from '@/api/offerts'
import NavegationPages from '@/components/navegationPages'
import CouponEditor from '@/components/offers/coupons/couponEditor'
import CouponList from '@/components/offers/coupons/couponList'
import Search from '@/components/UI/search'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function CouponHome() {
  return (
    <>
      <NavegationPages text="Cupones" />
      <div>
        <div className="mb-3 flex justify-between">
          <Suspense>
            <Search placeHolder="Buscar cupones..." />
          </Suspense>
          <CouponEditor />
        </div>
        <div className="mb-16">
          <Suspense>
            <CouponList />
          </Suspense>
        </div>
      </div>
    </>
  )
}
