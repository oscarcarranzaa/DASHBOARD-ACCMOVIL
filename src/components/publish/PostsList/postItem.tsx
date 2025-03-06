import DisplayPrice from '@/components/displayPrice'
import style from './posts.module.css'
import SquareImage from '@/components/squareImage'
import { addToast, Button } from '@heroui/react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { duplicatePost } from '@/api/posts'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/icons/spinner'

type TProps = {
  id: string
  outStock?: boolean
  image: string
  name: string
  price: number
  discount?: number
  porcentDiscount?: number
  isDraft?: boolean
}

export default function PostItem({
  outStock,
  image,
  name,
  price,
  discount,
  porcentDiscount,
  id,
  isDraft,
}: TProps) {
  const router = useRouter()
  const IMAGE_NOT_FOUND = '/static/image-not-found.webp'

  const { mutate, isPending: isDuplicating } = useMutation({
    mutationFn: duplicatePost,
    onSuccess: (res) => {
      router.push(`/dash/producto/${res.id}`)
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrió un error al duplicar el producto',
        description: err.message,
      })
    },
  })

  const handleDuplicate = () => {
    mutate(id)
  }

  return (
    <li
      className={`${style.boxParent} list-none px-2 py-2 rounded-lg border-transparent hover:dark:border-zinc-600 border`}
    >
      <div className={style.boxChild}>
        <div className="relative">
          <SquareImage src={image ?? IMAGE_NOT_FOUND} isDisabled={isDraft} />

          {(outStock || isDraft) && (
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="bg-[var(--box-opacity)] text-red-500 dark:text-white px-5 py-1 rounded-lg font-semibold border dark:border-none border-zinc-300">
                {isDraft ? 'Borrador' : 'Agotado'}
              </p>
            </div>
          )}
        </div>

        <p className="line-clamp-2 text-xs hover:underline mt-1">{name}</p>

        <div className="mt-1 flex justify-between items-center h-10">
          <DisplayPrice price={price} discountPrice={discount} />
          {porcentDiscount && (
            <div className="text-success font-semibold text-xs">
              {porcentDiscount}% OFF
            </div>
          )}
        </div>

        <div className={`flex justify-between mt-1 mb-1 ${style.actions}`}>
          <Button
            color="primary"
            size="sm"
            href={`/dash/producto/${id}`}
            as={Link}
          >
            Editar
          </Button>

          <Button
            variant="bordered"
            className="rounded-full"
            size="sm"
            onPress={handleDuplicate}
            disabled={isDuplicating}
          >
            {isDuplicating ? (
              <div className="animate-spin">
                <Spinner fill="#333" size={24} />
              </div>
            ) : (
              'Duplicar'
            )}
          </Button>
        </div>
      </div>
    </li>
  )
}
