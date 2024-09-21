import ClockSVG from '../icons/clock'
import validDiscountPrice from '@/utils/validationDateDiscountPrice'

type TProps = {
  price: number
  discountPrice?: number | null
  startDate?: string | null
  endDate?: string | null
}
export default function DisplayPrice({
  price,
  discountPrice,
  startDate,
  endDate,
}: TProps) {
  const { isInit, isNotFinish, validDiscount } = validDiscountPrice(
    startDate,
    endDate
  )
  return (
    <>
      <div>
        <div className="flex items-center justify-start">
          <p
            className={`font-medium text-center ${discountPrice && validDiscount ? ' line-through text-xs text-zinc-500' : ''} ${discountPrice && !startDate && !endDate ? ' line-through text-xs text-zinc-500' : ''}`}
          >
            {price.toLocaleString('es-HN', {
              style: 'currency',
              currency: 'HNL',
            })}
          </p>
        </div>
        <div
          className={` items-center justify-start stroke-red-500 ${discountPrice ? 'flex' : 'hidden'}`}
        >
          <span
            className={`mr-1 ${endDate && isNotFinish ? 'block' : 'hidden'}`}
          >
            <ClockSVG size={18} />
          </span>
          <p
            className={`${validDiscount || (discountPrice && !startDate && !endDate) ? ' font-bold' : ''} ${!isNotFinish && endDate ? 'hidden' : 'text-red-500'} ${!isInit && startDate ? 'line-through text-zinc-600' : ''}`}
          >
            {discountPrice?.toLocaleString('es-HN', {
              style: 'currency',
              currency: 'HNL',
            })}
          </p>
        </div>
      </div>
    </>
  )
}
