'use client'

import { getProductImageSchema } from '@/types/poducts'
import SquareImage from '@/components/squareImage'
import DisplayPrice from '@/components/displayPrice'
import InformationSVG from '@/components/icons/information'
import DollarSVG from '@/components/icons/dollar'
import validDiscountPrice from '@/utils/validationDateDiscountPrice'
import useCountDownTimer from '@/hooks/useCountDownTimer'
import CountDownTimer from '@/components/UI/countDown/coutDownTimer'
import { memo } from 'react'
import dayjs from 'dayjs'

type TProps = {
  data: getProductImageSchema
}

function ViewProduct({ data }: TProps) {
  const image = data.image?.images
    ? data.image.images[5].src
    : '/static/product.webp'
  const differentPrice = data.priceDiscount?.price
    ? data.price - data.priceDiscount.price
    : 0
  const totalDiscount = Math.round((differentPrice / data.price) * 100)
  const { validDiscount } = validDiscountPrice(
    data.priceDiscount?.start,
    data.priceDiscount?.end
  )
  // Chekear
  const end = data.priceDiscount?.end
  const start = data.priceDiscount?.start
  const startDate = start ? dayjs(start).format('DD-MM-YYYY hh:mm:ss') : '----'
  const endDate = end ? dayjs(end).format('DD-MM-YYYY hh:mm:ss') : '----'
  const timeLeft = useCountDownTimer(end)

  return (
    <>
      <div className="lg:flex mt-5">
        <div className="">
          <div className=" md:min-w-[200px] lg:min-w-[380px] mr-8 relative">
            <SquareImage src={image} />
            {totalDiscount > 0 && validDiscount ? (
              <p className="absolute top-10 text-white right-0 translate-x-4 bg-red-600 text-sm font-semibold py-1 px-2 rounded-lg">
                -{totalDiscount}% DTO
              </p>
            ) : null}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold dark:text-zinc-200">
            {data.name}
          </h2>
          <div className="md:flex justify-between max-w-[700px] min-w-[450px] mt-5 ">
            <div>
              <div className="fill-sky-600 flex items-center mb-2 text-sky-600">
                <InformationSVG size={20} />
                <h4 className=" text-lg font-semibold ml-1 ">Información</h4>
              </div>
              <ul>
                <li>
                  <p>
                    <span className=" font-medium">Código:</span> {data.code}
                  </p>
                </li>
                <li>
                  <p>
                    <span className=" font-medium">Código de barras:</span>{' '}
                    {data.barCode ?? '---'}
                  </p>
                </li>
                <li>
                  <p>
                    <span className=" font-medium">Cantidad de unidades:</span>{' '}
                    {data.stock}
                  </p>
                </li>
                <li>
                  <p>
                    <span className=" font-medium">Cantidad mínima:</span>{' '}
                    {data.minStock}
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-green-600 fill-green-600 dark:fill-green-500 flex items-center mb-2 dark:text-green-500">
                <DollarSVG size={20} />
                <h4 className=" text-lg font-semibold ml-1 ">
                  Precios y descuentos
                </h4>
              </div>
              <ul>
                <li>
                  <p>
                    <span className=" font-medium">Precio: </span>
                    {data.price.toLocaleString('es-HN', {
                      style: 'currency',
                      currency: 'HNL',
                    })}
                  </p>
                </li>
                <li>
                  <p>
                    <span className=" font-medium">Precio descuento: </span>
                    {data.priceDiscount?.price?.toLocaleString('es-HN', {
                      style: 'currency',
                      currency: 'HNL',
                    }) ?? '---'}
                  </p>
                </li>
                <li>
                  <p>
                    <span className=" font-medium">Inicio descuento:</span>{' '}
                    {startDate}
                  </p>
                </li>
                <li>
                  <p>
                    <span className=" font-medium">Fin descuento:</span>{' '}
                    {endDate}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center w-full mt-10 max-w-[700px] border border-zinc-400 rounded-xl p-3">
            <p>Precio Actual:</p>
            <div className=" scale-150 p-2 mb-2">
              <DisplayPrice
                price={data.price}
                discountPrice={data.priceDiscount?.price}
                startDate={data.priceDiscount?.start}
                endDate={data.priceDiscount?.end}
              />
            </div>
            {validDiscount && <CountDownTimer date={timeLeft} />}
          </div>
        </div>
      </div>
      <div className="flex mt-2"></div>
    </>
  )
}
export default memo(ViewProduct)
