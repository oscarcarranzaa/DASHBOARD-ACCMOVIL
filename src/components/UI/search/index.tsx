import SearchSVG from '@/components/icons/search'
import { Input } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function Search() {
  const searchParams = useSearchParams()
  const searchFromURL = searchParams.get('search') || ''
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
    params.delete('search')
    params.delete('p')
    const url = `${pathname}?${params.toString()}`
    router.push(url)
  }
  const newSearch = (search: string) => {
    const page = params.get('p')
    if (page) {
      params.set('p', '1')
    }
    params.set('search', search)
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
          startContent={<SearchSVG size={24} />}
          placeholder="Buscar producto..."
          isClearable
          onClear={() => clear()}
          defaultValue={searchFromURL}
          variant="bordered"
        />
      </div>
    </>
  )
}
