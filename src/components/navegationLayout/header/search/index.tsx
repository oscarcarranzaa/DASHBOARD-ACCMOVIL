'use client'
import useOutsideClick from '@/hooks/useOutSideClick'
import { Input, ScrollShadow } from '@heroui/react'
import {
  Briefcase,
  Contact,
  PackageSearch,
  Search,
  SearchX,
  User,
} from 'lucide-react'
import { JSX, useRef, useState } from 'react'
import SearchItems from './items'
import { useQuery } from '@tanstack/react-query'
import { getSearchAll } from '@/api/search'
import { useDebouncedCallback } from 'use-debounce'
import SearchLoading from './loading'

const iconMap: Record<string, JSX.Element> = {
  contact: <Contact size={20} />,
  customer: <User size={20} />,
  lead: <Briefcase size={20} />,
  product: <PackageSearch size={20} />,
}
const typeLabelMap: Record<string, string> = {
  contact: 'Contacto',
  customer: 'Cliente',
  lead: 'Cliente potencial',
  product: 'Producto',
}
const typeUrlMap: Record<string, string> = {
  contact: '/dash/clientes/contactos',
  customer: '/dash/clientes',
  lead: '/dash/embudo/result',
  product: '/dash/producto',
}
export default function SearchAllHeader() {
  const [search, setSearch] = useState('')
  const [searchDebounced, setSearchDebounced] = useState('')
  const [focusInput, setFocusInput] = useState(false)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debounce(e.target.value)
  }

  const debounce = useDebouncedCallback((value: string) => {
    if (value.length > 1) {
      setSearchDebounced(value)
    }
    if (value.length === 0) {
      setSearchDebounced('')
    }
  }, 800)

  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, () => {
    setFocusInput(false)
  })
  const { data, isPending, refetch, isFetching, error } = useQuery({
    queryKey: ['search', searchDebounced],
    queryFn: () => getSearchAll(searchDebounced),
    refetchOnWindowFocus: false,
    enabled: searchDebounced.length > 2,
  })
  return (
    <>
      <div className={`w-full`} ref={ref as React.RefObject<HTMLDivElement>}>
        <Input
          size="lg"
          className="rounded-full"
          radius="full"
          autoComplete="off"
          startContent={<Search size={20} />}
          placeholder={'Buscar...'}
          variant="bordered"
          value={search}
          onFocus={() => setFocusInput(true)}
          onChange={handleSearch}
        />

        {focusInput && search.length > 2 && (
          <div className="absolute px-2 bg-white dark:bg-zinc-900 shadow-lg  border border-gray-300 dark:border-zinc-600 w-full max-h-[60vh]  overflow-y-auto min-h-96 z-50 rounded-lg mt-3">
            {data &&
              data.length > 0 &&
              data.map((item) => {
                const icon = iconMap[item.type] || <Contact size={20} />
                const typeLabel = typeLabelMap[item.type] || item.type
                const typeUrl = typeUrlMap[item.type] || item.type
                return (
                  <div key={item.id} onClick={() => setFocusInput(false)}>
                    <SearchItems
                      search={search}
                      type={typeLabel}
                      startContent={icon}
                      title={item.title}
                      description={item.description}
                      url={`${typeUrl}/${item.id}`}
                    />
                  </div>
                )
              })}
            {data?.length === 0 && (
              <div className="w-full h-full flex flex-col gap-2 items-center justify-center mt-20">
                <SearchX size={48} />
                <p className="text-sm text-center">
                  No se encontraron resultados de busqueda...
                </p>
              </div>
            )}
            {isPending && <SearchLoading />}
          </div>
        )}
      </div>
    </>
  )
}
