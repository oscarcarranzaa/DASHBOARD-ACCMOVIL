import DisplayPrice from '@/components/displayPrice'
import style from './posts.module.css'
import SquareImage from '@/components/squareImage'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

type TProps = {
  id: string
  outStock?: boolean
  image: string
  name: string
  price: number
  discount?: number
  porcentDiscount?: number
}

export default function PostItem({
  outStock,
  image,
  name,
  price,
  discount,
  porcentDiscount,
  id,
}: TProps) {
  const IMAGE_NOT_FOUND = '/static/image-not-found.webp'
  return (
    <>
      <li
        className={`${style.boxParent} px-2 py-2 rounded-lg border-transparent hover:dark:border-zinc-600 border`}
      >
        <div className={style.boxChild}>
          <div className="relative">
            <SquareImage src={image ?? IMAGE_NOT_FOUND} />
            {outStock && (
              <div className="absolute left-0 bottom-0 top-0 right-0  text-red-500 flex justify-center items-center">
                <p className=" bg-[var(--box-opacity)] text-red-500 dark:text-white px-5 py-1 rounded-lg font-semibold border dark:border-none border-zinc-300">
                  Agotado
                </p>
              </div>
            )}
          </div>
          <p className=" line-clamp-2 text-xs hover:underline mt-1">{name}</p>
          <div className="mt-1 flex justify-between items-center h-10">
            <DisplayPrice price={price} discountPrice={discount} />
            {porcentDiscount && (
              <div className=" text-success font-semibold text-xs">
                {porcentDiscount}% OFF
              </div>
            )}
          </div>
          <div className={`flex justify-between mt-1 mb-1 ${style.actions}`}>
            <Button
              color="primary"
              size="sm"
              href={`/dash/posts/${id}`}
              as={Link}
            >
              Editar
            </Button>
            <Button variant="bordered" className=" rounded-full" size="sm">
              Duplicar
            </Button>
          </div>
        </div>
      </li>
    </>
  )
}
