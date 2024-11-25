import NavegationPages from '@/components/navegationPages'
import CouponEditor from '@/components/offers/coupons/couponEditor'

export default function NewCouponHome() {
  return (
    <>
      <NavegationPages text="Crear un nuevo cupon de descuento" />
      <div className=" grid grid-cols-6">
        <div className=" col-span-3">
          <CouponEditor />
        </div>
      </div>
    </>
  )
}
