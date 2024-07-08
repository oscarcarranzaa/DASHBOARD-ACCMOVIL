import { useEffect, useRef } from 'react'
import { CategorySchema } from '@/types/category'
import { getCategories } from '@/api/category'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ArrowSVG from '../icons/arrow'
import ArrowAngleSVG from '../icons/arrowAngle'
import { Input } from '@nextui-org/react'
import CategorySkeleton from './categorySkeleton'

export default function DisplayCategory() {
  const [openID, setOpenID] = useState<string>('')
  const [openBox, setOpenBox] = useState<boolean>(false)
  const { data, isPending } = useQuery({
    queryKey: ['categories', openID],
    queryFn: () => getCategories(openID),
    refetchOnWindowFocus: false,
  })

  const inputRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      inputRef.current &&
      boxRef.current &&
      !(
        inputRef.current.contains(event.target as Node) ||
        boxRef.current.contains(event.target as Node)
      )
    ) {
      setOpenBox(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className=" dark:border border-zinc-500 dark:bg-zinc-900 bg-white py-5 px-2 rounded-lg">
        <div ref={inputRef}>
          <label className="text-sm mt-2">Categorías</label>
          <Input onFocus={() => setOpenBox(true)} />
        </div>
        <div
          ref={boxRef}
          className={`${
            openBox ? 'block relative ' : 'hidden'
          } dark:stroke-white dark:fill-white stroke-black dark:bg-zinc-800 bg-zinc-50 rounded-lg`}
        >
          <div className="absolute  top-0 right-0 left-0  dark:stroke-white dark:fill-white stroke-black dark:bg-zinc-800 bg-zinc-50 rounded-lg ">
            {data && data.parent && (
              <button
                onClick={() => setOpenID(data.parent?.parent ?? '')}
                className="flex w-full bg-zinc-200 dark:bg-zinc-700 py-2 px-1 rounded-md items-center mt-1"
              >
                <ArrowSVG size={24} />{' '}
                <p className="ml-2 text-left">{data.parent?.name}</p>
              </button>
            )}
            <div className="h-96 w-full mt-1 menu-content  p-1 ">
              <ul>
                {data ? (
                  data.categories.map((category) => (
                    <li
                      key={category._id}
                      className={`flex justify-between w-full items-center ${
                        category.child
                          ? 'dark:hover:bg-zinc-700 hover:bg-zinc-200 cursor-pointer'
                          : ''
                      } select-none rounded-md`}
                    >
                      <button className="dark:hover:bg-zinc-950 hover:bg-zinc-300 p-2 rounded-md px-3">
                        <p className="text-sm text-left">{category.name}</p>
                      </button>
                      <div
                        onClick={() => {
                          if (category.child) {
                            setOpenID(category._id)
                          }
                        }}
                        className="flex-grow flex justify-end items-center"
                      >
                        {category.child ? (
                          <div className="-rotate-90 w-6 h-6">
                            <ArrowAngleSVG size={24} />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <CategorySkeleton />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
