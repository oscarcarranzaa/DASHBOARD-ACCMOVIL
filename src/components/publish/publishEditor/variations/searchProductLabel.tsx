import { getAllProducts } from '@/api/products'
import SearchSVG from '@/components/icons/search'
import SquareImage from '@/components/squareImage'
import { getProductImageSchema } from '@/types/poducts'
import { Input } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import DisplayProduct from './displayProduct'
import CloseSVG from '@/components/icons/close'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type TProps = {
  seleted?: getProductImageSchema
  onSelect?: (value: getProductImageSchema | undefined) => void
}
export default function SearchProductLabel({ seleted, onSelect }: TProps) {
  const initialSelect = seleted ? seleted : null

  const [select, setSelect] = useState<getProductImageSchema | null>(
    initialSelect
  )

  const searchParams = useSearchParams()
  const searchFromURL = searchParams.get('search') || ''
  const [value, setValue] = useState(searchFromURL)
  const pathname = usePathname()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['selectProduct', searchFromURL],
    queryFn: () => getAllProducts('1', '50', searchFromURL),
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    if (searchFromURL === '') {
      setValue('')
    }
  }, [searchFromURL])

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  )

  const clear = () => {
    params.delete('search')
    params.delete('p')
    const url = `${pathname}?${params.toString()}`
    router.push(url, { scroll: false })
  }
  const newSearch = (search: string) => {
    const page = params.get('p')
    if (page) {
      params.set('p', '1')
    }
    params.set('search', search)
    const url = `${pathname}?${params.toString()}`
    router.push(url, { scroll: false })
    return
  }
  const debounce = useDebouncedCallback((value: string) => {
    if (value.length > 2) {
      newSearch(value)
    }
    if (value.length === 0) {
      clear()
    }
  }, 800)
  return (
    <>
      <div className="dark:fill-white w-full  relative">
        <Input
          onChange={(e) => {
            setValue(e.target.value)
            debounce(e.target.value)
          }}
          onClear={() => clear()}
          value={value}
          startContent={<SearchSVG size={24} />}
          placeholder="Buscar producto..."
          isClearable
          variant="bordered"
        />
        <div
          className={`absolute top-10 left-0 right-0 bg-zinc-100 dark:bg-zinc-800 max-h-60 z-20 overflow-y-scroll p-2  ${value.length === 0 ? 'hidden' : 'block'}`}
        >
          {data &&
            data.data.map((item) => {
              const image = item.image?.images
                ? item.image.images[0].src
                : '/static/product.webp'
              return (
                <button
                  key={item._id}
                  className="  p-2 hover:bg-zinc-200 dark:hover:bg-zinc-950 rounded-lg cursor-pointer w-full"
                  onClick={() => {
                    setSelect(item)
                    onSelect && onSelect(item)
                    setValue('')
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-10 flex-none mr-2">
                      <SquareImage src={image} />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-xs text-left">
                        {item.name}
                      </p>
                      <div className="text-xs flex">
                        <p className=" text-green-500 mr-5">{item.code}</p>
                        <p className=" text-rose-500 font-bold">{item.price}</p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
        </div>
      </div>
      <div className="relative">
        {select && <DisplayProduct select={select} />}
        {select && (
          <div className=" flex justify-end  absolute -right-2 -top-5">
            <button
              className=" bg-zinc-200 rounded-full p-1"
              onClick={() => {
                setSelect(null)
                onSelect && onSelect(undefined)
              }}
            >
              <CloseSVG size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
