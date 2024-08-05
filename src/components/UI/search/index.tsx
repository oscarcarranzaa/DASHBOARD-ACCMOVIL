import SearchSVG from '@/components/icons/search'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type Props = {
  searchName?: string
  pageName?: string
  placeHolder?: string
}
export default function Search({ searchName, pageName, placeHolder }: Props) {
  const searchParams = useSearchParams()
  const searchQueryName = searchName ?? 'search'
  const pageQueryName = pageName ?? 'p'
  const searchFromURL = searchParams.get(searchQueryName) || ''
  const [value, setValue] = useState(searchFromURL)
  const pathname = usePathname()
  const router = useRouter()

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
    params.delete(searchQueryName)
    params.delete(pageQueryName)
    const url = `${pathname}?${params.toString()}`
    router.push(url)
  }
  const newSearch = (search: string) => {
    const page = params.get(pageQueryName)
    if (page) {
      params.set(pageQueryName, '1')
    }
    params.set(searchQueryName, search)
    const url = `${pathname}?${params.toString()}`
    router.push(url)
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
      <div className="dark:fill-white w-full sm:max-w-[35%]">
        <Input
          size="lg"
          onChange={(e) => {
            debounce(e.target.value)
            setValue(e.target.value)
          }}
          value={value}
          autoComplete="off"
          autoCapitalize="off"
          startContent={<SearchSVG size={24} />}
          placeholder={placeHolder ?? 'Buscar producto...'}
          isClearable
          onClear={() => clear()}
          defaultValue={searchFromURL}
          variant="bordered"
        />
      </div>
    </>
  )
}
