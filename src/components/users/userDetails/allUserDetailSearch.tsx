import { getAllUsers } from '@/api/users'
import {
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  User,
} from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, Search, SearchSlash } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { statusColorMap, statusName } from '../userList'

type TProps = {
  currentUserId: string
  name?: string | null
  avatar?: string | null
  userName?: string | null
  isLoading?: boolean
}

export default function AllUserDetailsSearch({
  currentUserId,
  name,
  avatar,
  userName,
  isLoading,
}: TProps) {
  const [searchInput, setSearchInput] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const { data, isPending } = useQuery({
    queryKey: ['users', searchValue],
    queryFn: () => getAllUsers('1', '10', searchValue),
    refetchOnWindowFocus: false,
  })

  const debounce = useDebouncedCallback((value: string) => {
    setSearchValue(value)
  }, 700)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debounce(e.target.value)
  }

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="flex flex-col items-center gap-3 p-3">
          <Spinner variant="wave" />
          <p>Buscando...</p>
        </div>
      )
    }

    if (!data?.data?.length) {
      return (
        <div className="flex flex-col max-w-[20rem] items-center gap-3 p-3">
          <SearchSlash size={42} />
          <p className="text-center">
            No hay usuarios con &quot;{searchValue}&quot;
          </p>
        </div>
      )
    }

    return data.data.map((user) => {
      const isActive = user.username === currentUserId
      return (
        <Link
          key={user.id}
          href={`/dash/usuarios/${user.username}`}
          className={`p-2 ${
            isActive
              ? 'bg-sky-50 dark:bg-sky-950'
              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <User
            avatarProps={{
              src: user.avatar
                ? `${user.avatar}-thumb.webp`
                : '/static/default-profile.png',
            }}
            description={
              <div className="flex items-center gap-2">
                <p>{user.username}</p>
                <p>-</p>
                <p className={`text-${statusColorMap[user.status]}`}>
                  {statusName[user.status]}
                </p>
              </div>
            }
            name={`${user.firstName} ${user.lastName}`}
          />
        </Link>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Spinner size="sm" />
        <p>Detalles del usuario...</p>
      </div>
    )
  }

  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <div className="p-2 px-3 border border-zinc-300 dark:border-zinc-600 cursor-pointer flex items-center bg-white shadow-md gap-3 hover:bg-zinc-100 dark:bg-zinc-900 rounded-lg dark:hover:bg-zinc-900">
          <User
            avatarProps={{
              src: avatar
                ? `${avatar}-thumb.webp`
                : '/static/default-profile.png',
            }}
            description={<p>{userName}</p>}
            name={name || ''}
          />
          <ChevronDown size={16} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="rounded-lg min-w-[18rem]">
        <div className="p-1 min-w-full">
          <Input
            startContent={<Search size={16} />}
            variant="underlined"
            placeholder="Buscar usuario..."
            value={searchInput}
            onChange={handleSearch}
          />
          <div className="flex flex-col gap-2 mt-5">{renderContent()}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
