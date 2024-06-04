import { getAllProducts } from '@/api/products'
import SearchSVG from '@/components/icons/search'
import SquareImage from '@/components/squareImage'
import { getProductImageSchema } from '@/types/poducts'
import { Input } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchProductLabel() {
  const [search, setSearch] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [select, setSelect] = useState<getProductImageSchema | null>(null)
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
      <div className="dark:fill-white w-full sm:max-w-[60%] relative">
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
          className={`absolute z-20 top-10 left-0 right-0 bg-zinc-800 max-h-60 overflow-y-scroll p-2  ${search.length === 0 ? 'hidden' : 'block'}`}
        >
          {data &&
            data.data.map((item) => {
              const image = item.image?.images
                ? item.image.images[0].src
                : '/static/product.webp'
              return (
                <button
                  className="  p-2 hover:bg-zinc-950 rounded-lg cursor-pointer w-full"
                  onClick={() => setSelect(item)}
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
      <div className="mt-5 w-full bg-zinc-950 rounded-md px-5 py-2">
        {select && (
          <div>
            <div className="flex">
              <div className="w-12 mr-2">
                <SquareImage
                  src={
                    select.image?.images
                      ? select.image.images[0].src
                      : '/static/product.webp'
                  }
                />
              </div>
              <div>
                <p>{select.name}</p>
                <p className="text-sm">{select.code}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
