import dayjs from 'dayjs'
import ClockSVG from '../icons/clock'

type TProps = {
  price: number
  discountPrice?: number
  startDate?: string
  endDate?: string
}
export default function DisplayPrice({
  price,
  discountPrice,
  startDate,
  endDate,
}: TProps) {
  const currentDate = dayjs().toISOString()
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  const isInit = start.isBefore(currentDate)
  const isNotFinish = end.isAfter(currentDate)
  const validDiscount = isInit && isNotFinish
  return (
    <>
      <div>
        <p
          className={`font-medium ${discountPrice && validDiscount ? ' line-through text-xs text-zinc-600' : ''} ${discountPrice && !startDate && !endDate ? ' line-through text-xs text-zinc-600' : ''}`}
        >
          {price.toLocaleString('es-HN', {
            style: 'currency',
            currency: 'HNL',
          })}
        </p>
        <div
          className={`flex stroke-red-500 ${discountPrice ? 'flex' : 'hidden'}`}
        >
          <p
            className={`${validDiscount || (discountPrice && !startDate && !endDate) ? ' font-bold' : ''} ${!isNotFinish && endDate ? 'hidden' : 'text-red-500'} ${!isInit && startDate ? 'line-through text-zinc-600' : ''}`}
          >
            {discountPrice?.toLocaleString('es-HN', {
              style: 'currency',
              currency: 'HNL',
            })}
          </p>
          <span className={`${endDate && isNotFinish ? 'block' : 'hidden'}`}>
            <ClockSVG size={18} />
          </span>
        </div>
      </div>
    </>
  )
}
