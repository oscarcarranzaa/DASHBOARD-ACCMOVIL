'use client'

import { getProductImageSchema } from '@/types/poducts'
import SquareImage from '../squareImage'
import DisplayPrice from '../displayPrice'
import InformationSVG from '../icons/information'
import DollarSVG from '../icons/dollar'
import dayjs from 'dayjs'
import validDiscountPrice from '@/utils/validationDateDiscountPrice'
type TProps = {
  data: getProductImageSchema
}

export default function ViewProduct({ data }: TProps) {
  const image = data.image?.images
    ? data.image.images[5].src
    : '/static/product.webp'
  const differentPrice = data.priceDiscount?.price
    ? data.price - data.priceDiscount.price
    : 0
  const totalDiscount = (differentPrice / data.price) * 100
  const { validDiscount } = validDiscountPrice(
    data.priceDiscount?.start,
    data.priceDiscount?.end
  )
  // Chekear
  const end = data.priceDiscount?.end
  const start = data.priceDiscount?.start
  const startDate = start ? dayjs(start).format('DD-MM-YYYY') : '----'
  const endDate = end ? dayjs(end).format('DD-MM-YYYY') : '----'

  return (
    <>
      <div className="flex mt-8">
        <div className="">
          <div className=" min-w-80 mr-8 relative">
            <SquareImage src={image} />
            {totalDiscount > 0 && validDiscount ? (
              <p className="absolute top-10 text-white right-0 translate-x-4 bg-red-600 text-sm font-semibold py-1 px-2 rounded-lg">
                -{totalDiscount.toFixed(0)}% DTO
              </p>
            ) : null}
          </div>
        </div>

        <div className=" ">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <div className="flex gap-x-32 mt-5">
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
        </div>
      </div>
      <div className="flex mt-2">
        <p>Precio Actual:</p>
        <DisplayPrice
          price={data.price}
          discountPrice={data.priceDiscount?.price}
          startDate={data.priceDiscount?.start}
          endDate={data.priceDiscount?.end}
        />
      </div>
    </>
  )
}
