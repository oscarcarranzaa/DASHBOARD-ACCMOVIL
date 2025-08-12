'use client'

import { cn } from '@/lib/utils'
import { useRoleStore } from '@/store/role'
import { Checkbox, Switch } from '@heroui/react'
import { useEffect, useState } from 'react'

type TProps = {
  items: {
    selected: boolean
    isDisabled: boolean
    name: string
    key: string
    description: string
    active: boolean
    requiredKeys?: string[] | undefined
  }[]
  name: string
}
export default function CheckRole({ items, name }: TProps) {
  const {
    addKey,
    removeKey,
    removeKeys,
    setKeys,
    keys: roleKeys,
  } = useRoleStore()
  const [allSelect, setAllSelect] = useState(false)
  const onAllSelect = (value: boolean) => {
    const allKeys = items.map((item) => item.key)
    if (value) {
      setKeys([...roleKeys, ...allKeys])
    } else {
      removeKeys(allKeys)
    }
  }

  useEffect(() => {
    const allKeys = items.map((item) => item.key)
    const allIncluded = allKeys.every((key) => roleKeys.includes(key))
    setAllSelect(allIncluded)
  }, [roleKeys, items])
  return (
    <>
      <div className="mb-3 ">
        <Switch
          color="primary"
          classNames={{
            base: cn(
              'flex-row-reverse w-full max-w-full bg-content1 hover:bg-content2 items-center',
              'justify-between cursor-pointer gap-2 mb-2 p-4'
            ),
          }}
          isSelected={allSelect}
          onValueChange={onAllSelect}
        >
          <div>
            <p>
              Seleccionar todos los permisos de <b>{name}</b>
            </p>
          </div>
        </Switch>
      </div>
      <ul className="w-full">
        {items.map((i, index) => (
          <li key={i.key + index} className="mb-3 w-full max-w-full list-none">
            <Checkbox
              isSelected={i.selected}
              isDisabled={i.isDisabled}
              onValueChange={(e) => (e ? addKey(i.key) : removeKey(i.key))}
              color="primary"
              classNames={{
                base: cn(
                  'flex-row-reverse w-full max-w-full bg-content1 hover:bg-content2 items-center',
                  'justify-between cursor-pointer gap-2 border-b border-zinc-200 dark:border-zinc-700 mb-2 p-4',
                  'data-[selected=true]:border-primary'
                ),
              }}
            >
              <div>
                <p className="font-medium">
                  {i.name}
                  {i.requiredKeys && <span className="text-red-500">*</span>}
                </p>
                <p className="text-xs opacity-80">{i.description}</p>
              </div>
            </Checkbox>
          </li>
        ))}
      </ul>
    </>
  )
}
