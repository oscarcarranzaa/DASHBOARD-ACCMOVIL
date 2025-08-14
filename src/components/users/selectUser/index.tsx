'use client'

import { getAllUsers } from '@/api/users'
import { useQuery } from '@tanstack/react-query'
import { Autocomplete, AutocompleteItem, Avatar, Button } from '@heroui/react'
import { SearchIcon } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

type TProps = {
  placeholder?: string
  label?: string
  value?: string | null
  onChange?: (userID: string | null) => void
  disabledUserId?: string[]
}
export default function SelectUser({
  placeholder = 'Usuarios',
  label,
  onChange,
  disabledUserId,
  value,
}: TProps) {
  const thisUser = useAuthStore((state) => state.user)?.id
  const { data, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers('1', '50'),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const users = data?.data ?? []
  const filteredUsers = users.filter(
    (user) => !disabledUserId?.includes(user.id)
  )

  return (
    <>
      <Autocomplete
        selectedKey={value}
        label={label}
        onSelectionChange={(key) => {
          if (onChange) {
            onChange(key ? key.toString() : null)
          }
        }}
        labelPlacement="outside"
        isLoading={isPending}
        aria-label={placeholder}
        classNames={{
          selectorButton: 'text-default-500',
        }}
        defaultItems={filteredUsers}
        inputProps={{
          classNames: {
            input: 'ml-1',
          },
        }}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              'rounded-medium',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'dark:data-[hover=true]:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[hover=true]:bg-default-200',
              'data-[selectable=true]:focus:bg-default-100',
              'data-[focus-visible=true]:ring-default-500',
            ],
          },
        }}
        placeholder={placeholder}
        popoverProps={{
          offset: 10,
          classNames: {
            base: 'rounded-large',
            content: 'p-1 border-small border-default-100 bg-background',
          },
        }}
        radius="full"
        startContent={
          <SearchIcon
            className="text-default-400"
            size={20}
            strokeWidth={2.5}
          />
        }
        variant="bordered"
      >
        {filteredUsers?.map((item) => (
          <AutocompleteItem
            key={item.id}
            textValue={`${item.firstName} ${item.lastName} ${item.id === thisUser ? '(Tú)' : ''}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={`${item.firstName} ${item.lastName}`}
                  className="shrink-0"
                  size="sm"
                  src={item.avatar ? item.avatar + '-thumb.webp' : undefined}
                />
                <div className="flex flex-col">
                  <span className="text-small">{`${item.firstName} ${item.lastName} ${item.id === thisUser ? '(Tú)' : ''}`}</span>
                  <span className="text-tiny text-default-400">{item.job}</span>
                </div>
              </div>
              <Button
                className="border-small mr-0.5 font-medium shadow-small"
                radius="full"
                size="sm"
                variant="bordered"
              >
                Añadir
              </Button>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  )
}
