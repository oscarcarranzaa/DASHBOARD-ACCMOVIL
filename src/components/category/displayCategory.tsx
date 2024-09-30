import { getCategories } from '@/api/category'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ArrowSVG from '../icons/arrow'
import ArrowAngleSVG from '../icons/arrowAngle'
import CategorySkeleton from './categorySkeleton'
import CloseSVG from '../icons/close'
import { useCategoryStore } from '@/store/category'
import EmptyCategory from './emptyCategory'

export type selectCategory = {
  id: string
  name: string
  parent: string | undefined | null
}
type TProps = {
  value?: selectCategory[] | undefined
  noClosed?: boolean
  isOnly?: boolean
  onSelectCategory?: (select: selectCategory[]) => void
}
export default function DisplayCategory({
  value,
  onSelectCategory,
  noClosed,
  isOnly,
}: TProps) {
  const { openCategory, setOpenCategory } = useCategoryStore()
  const [selected, setSelected] = useState<selectCategory[] | undefined>(value)

  const { data, error } = useQuery({
    queryKey: ['categories', openCategory],
    queryFn: () => getCategories(openCategory),
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    setSelected(value)
  }, [value, data])

  const handleSelect = (category: selectCategory) => {
    /// Si selected es undefined pues se agrega el array de categorias
    if (!selected) {
      onSelectCategory && onSelectCategory([category])
      setSelected([category])
      return
    }
    /// Busca si existe la categoria en seleccionados
    const find = selected.find((item) => item.id === category.id)
    /// Si ya existe y no isOnly ("Seleccion unica") la quita
    if (find && !isOnly) {
      const deleteCategory = selected.filter((item) => item.id !== category.id)
      onSelectCategory && onSelectCategory(deleteCategory)
      setSelected(deleteCategory)
      return
    }
    /// O si no pues la agrega
    if (!isOnly) {
      onSelectCategory && onSelectCategory([...selected, category])
      setSelected([...selected, category])
      return
    }
    onSelectCategory && onSelectCategory([category])
    setSelected([category])
  }
  return (
    <>
      <p>Categorías</p>
      <div className=" dark:border border-zinc-500 dark:bg-zinc-900 bg-white py-5 px-2 rounded-lg">
        <p className="text-sm">
          {' '}
          {data && data.categories.length === 0
            ? 'Agrega nuevas categorías'
            : 'Seleccione categorías'}
        </p>
        <div className="dark:stroke-white dark:fill-white stroke-black dark:bg-zinc-800 bg-zinc-50 rounded-lg">
          <div className=" dark:stroke-white dark:fill-white stroke-black dark:bg-zinc-800 bg-zinc-50 rounded-lg ">
            {data && data.parent && (
              <button
                onClick={() => setOpenCategory(data.parent?.parentId ?? '')}
                type="button"
                className="flex w-full bg-zinc-200 dark:bg-zinc-700 py-2 px-1 rounded-md items-center mt-1"
              >
                <ArrowSVG size={24} />
                <p className="ml-2 text-left">{data.parent?.name}</p>
              </button>
            )}
            <div className="h-96 w-full mt-1 menu-content  p-1 ">
              {data && data.categories.length === 0 ? <EmptyCategory /> : null}
              <ul>
                {data ? (
                  data.categories.map((category) => (
                    <li
                      key={category.id}
                      className={`flex justify-between w-full items-center ${
                        category.children
                          ? 'dark:hover:bg-zinc-700 hover:bg-zinc-200 cursor-pointer'
                          : ''
                      } select-none rounded-md`}
                    >
                      <button
                        className={`dark:hover:bg-zinc-950 hover:bg-zinc-300 rounded-md px-3 p-2 ${
                          selected?.find((item) => item.id === category.id)
                            ? 'bg-zinc-300 dark:bg-zinc-950'
                            : ''
                        }`}
                        type="button"
                        onClick={() => {
                          handleSelect({
                            id: category.id,
                            name: category.name,
                            parent: category.parentId,
                          })
                        }}
                      >
                        <p className="text-sm text-left ">{category.name}</p>
                      </button>
                      <div
                        onClick={() => {
                          if (category.children) {
                            setOpenCategory(category.id)
                          }
                        }}
                        className="flex-grow flex justify-end items-center p-1"
                      >
                        {category.children ? (
                          <div className="-rotate-90 w-6 h-6">
                            <ArrowAngleSVG size={24} />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </li>
                  ))
                ) : !error ? (
                  <CategorySkeleton />
                ) : (
                  <div>
                    <button
                      onClick={() => setOpenCategory('')}
                      type="button"
                      className="flex w-full bg-zinc-200 dark:bg-zinc-700 py-2 px-1 rounded-md items-center mt-1"
                    >
                      <ArrowSVG size={24} />
                      <p className="ml-2 text-left">[Root]</p>
                    </button>
                    <p className="mt-10 text-red-500 text-center">
                      {error.message}
                    </p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 dark:fill-white items-center mt-2">
          {selected &&
            selected.map((item) => (
              <div
                key={item.id}
                className="flex  justify-between items-center p-2 bg-zinc-200 dark:bg-zinc-700 rounded-md mt-1 text-xs"
              >
                <p
                  className=" hover:underline cursor-pointer"
                  onClick={() => {
                    if (item.parent) {
                      setOpenCategory(item.parent)
                      return
                    }
                    setOpenCategory('')
                  }}
                >
                  {item.name}
                </p>
                {!noClosed && (
                  <button
                    className="ml-5"
                    onClick={() => {
                      setSelected(
                        selected.filter((select) => select.id !== item.id)
                      )
                      if (onSelectCategory) {
                        onSelectCategory(
                          selected.filter((select) => select.id !== item.id)
                        )
                      }
                    }}
                  >
                    <CloseSVG size={12} />
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
