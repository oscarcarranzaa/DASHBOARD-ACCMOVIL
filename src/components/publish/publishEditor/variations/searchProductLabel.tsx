import { getAllProducts } from '@/api/products'
import SearchSVG from '@/components/icons/search'
import SquareImage from '@/components/squareImage'
import { getProductImageSchema } from '@/types/poducts'
import { Input } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import DisplayProduct from './displayProduct'
import CloseSVG from '@/components/icons/close'

type TProps = {
  seleted?: getProductImageSchema
  onSelect?: (value: getProductImageSchema) => void
}
export default function SearchProductLabel({ seleted, onSelect }: TProps) {
  const initialSelect = seleted ? seleted : null
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [select, setSelect] = useState<getProductImageSchema | null>(
    initialSelect
  )

  const { data, isPending } = useQuery({
    queryKey: ['products', '1', searchValue],
    queryFn: () => getAllProducts('1', '30', searchValue),
    refetchOnWindowFocus: false,
  })
  const debounce = useDebouncedCallback((value: string) => {
    if (value.length > 2) {
      setSearchValue(value)
    }
    if (value.length === 0) {
      setSearchValue('')
    }
  }, 800)

  return (
    <>
      <div className="dark:fill-white w-full  relative">
        <Input
          onChange={(e) => {
            setSearch(e.target.value)
            debounce(e.target.value)
          }}
          onClear={() => setSearch('')}
          value={search}
          startContent={<SearchSVG size={24} />}
          placeholder="Buscar producto..."
          isClearable
          variant="bordered"
        />
        <div
          className={`absolute top-10 left-0 right-0 bg-zinc-800 max-h-60 z-20 overflow-y-scroll p-2  ${search.length === 0 ? 'hidden' : 'block'}`}
        >
          {data &&
            data.data.map((item) => {
              const image = item.image?.images
                ? item.image.images[0].src
                : '/static/product.webp'
              return (
                <button
                  key={item._id}
                  className="  p-2 hover:bg-zinc-950 rounded-lg cursor-pointer w-full"
                  onClick={() => {
                    setSelect(item)
                    onSelect && onSelect(item)
                    setSearch('')
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-10 flex-none mr-2">
                      <SquareImage src={image} />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-sm text-left">
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
          <div className=" flex justify-end  absolute -right-2 -top-2">
            <button
              className=" bg-zinc-200 rounded-full p-1"
              onClick={() => setSelect(null)}
            >
              <CloseSVG size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
