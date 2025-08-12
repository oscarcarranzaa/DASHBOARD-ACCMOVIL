'use client'

import Spinner from '@/components/icons/spinner'
import { useRoleStore } from '@/store/role'
import {
  getPermissionsType,
  newRoleType,
  userPermissionsType,
} from '@/types/users'
import {
  Button,
  Checkbox,
  Input,
  Link,
  Tab,
  Tabs,
  User,
  cn,
} from '@heroui/react'
import { ShieldCheck } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import CheckRole from './checkRole'

type TProps = {
  permissions: getPermissionsType
  users?: userPermissionsType
  roleName: string
  isLoading: boolean
  buttonName: string
  onSend: (e: newRoleType) => void
}

export default function RoleEditor({
  permissions,
  onSend,
  isLoading,
  users,
  roleName,
  buttonName,
}: TProps) {
  const {
    setKeys,
    setName,
    name,
    keys: roleKeys,
    addKey,
    removeKey,
  } = useRoleStore()

  // Set inicial de nombre y claves activas
  useEffect(() => {
    if (permissions) {
      const keysData = permissions.flatMap((p) =>
        p.items.filter((i) => i.active).map((i) => i.key)
      )
      setKeys(keysData)
      setName(roleName)
    }
  }, [permissions, setKeys, setName, roleName])

  // Quitar claves inválidas basadas en dependencias
  useEffect(() => {
    const requiredKeysMap = new Map<string, string[]>()

    for (const group of permissions) {
      for (const item of group.items) {
        if (item.requiredKeys?.length) {
          requiredKeysMap.set(item.key, item.requiredKeys)
        }
      }
    }

    for (const key of roleKeys) {
      const required = requiredKeysMap.get(key)
      if (required && !required.every((rk) => roleKeys.includes(rk))) {
        removeKey(key)
      }
    }
  }, [roleKeys, permissions, removeKey])

  // Construye los datos para Tabs sin mutar estado
  const activeRoles = useMemo(() => {
    return permissions.map((group) => {
      const items = group.items.map((item) => {
        const selected = roleKeys.includes(item.key)
        const isDisabled =
          item.requiredKeys?.some((r) => !roleKeys.includes(r)) ?? false

        return {
          ...item,
          selected: selected && !isDisabled,
          isDisabled,
        }
      })
      return { ...group, items }
    })
  }, [permissions, roleKeys])

  return (
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-7">
      <div className="col-span-5">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSend({ name, keys: roleKeys })
          }}
        >
          <div className="mb-10 flex justify-between items-center gap-x-5">
            <Input
              placeholder="Nombre del Rol"
              variant="bordered"
              label="Nombre del rol"
              isRequired
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              color="primary"
              type="submit"
              size="lg"
              isDisabled={isLoading}
              className="w-32"
            >
              {isLoading ? (
                <div className="animate-spin">
                  <Spinner size={24} fill="#fff" />
                </div>
              ) : (
                buttonName
              )}
            </Button>
          </div>

          <div className="w-full dark:bg-zinc-950 bg-white border border-zinc-200 dark:border-zinc-700 p-5 rounded-xl">
            <Tabs
              variant="bordered"
              color="primary"
              items={activeRoles}
              placement="start"
            >
              {(item) => (
                <Tab key={item.key} title={item.name} className="w-full">
                  <CheckRole items={item.items} name={item.name} />
                </Tab>
              )}
            </Tabs>
          </div>
        </form>
      </div>

      <div className="col-span-2">
        {users && <p className="mb-5">Usuarios con este rol:</p>}
        {users?.map((user) => {
          const image = user.avatar || '/static/default-profile.png'
          const fullName = `${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`
          return (
            <div
              key={user.id}
              className="border-b border-zinc-200 dark:border-zinc-700 py-2"
            >
              <User
                name={fullName}
                description={
                  <Link
                    href={`/dash/usuarios/${user.username}`}
                    size="sm"
                    isExternal
                  >
                    @{user.username}
                  </Link>
                }
                avatarProps={{
                  src: image,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
