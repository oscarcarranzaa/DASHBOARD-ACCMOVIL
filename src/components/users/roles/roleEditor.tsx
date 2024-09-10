'use client'
import { useRoleStore } from '@/store/role'
import { rolePermissions } from '@/types/users'
import {
  Button,
  Input,
  Link,
  Switch,
  Tab,
  Tabs,
  User,
  cn,
} from '@nextui-org/react'
import { useEffect } from 'react'

type TProps = {
  data: rolePermissions
}

export default function RoleEditor({ data }: TProps) {
  const {
    setKeys,
    setName,
    name,
    keys: roleKeys,
    addKey,
    removeKey,
  } = useRoleStore()

  useEffect(() => {
    if (data) {
      const keysData = data.permissions
        .map((p) => p.items.filter((i) => i.active).map((k) => k.key))
        .flat()
      setKeys(keysData)
      setName(data.name)
    }
  }, [data, setKeys, setName])

  const addActiveRole = data.permissions.map((p) => {
    const items = p.items.map((i) => {
      const includeKeys = roleKeys.includes(i.key)
      return { ...i, selected: includeKeys }
    })
    return { ...p, items: items }
  })
  return (
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-7">
      <div className="col-span-5">
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
          <Button color="primary">Actualizar</Button>
        </div>
        <div className="w-full dark:bg-zinc-950 bg-white border border-zinc-200 dark:border-zinc-700 p-5 rounded-xl">
          <Tabs items={addActiveRole} placement="start">
            {(item) => (
              <Tab key={item.key} title={item.name} className="w-full">
                <ul className="w-full">
                  {item.items.map((i, index) => {
                    return (
                      <li
                        key={i.key + index}
                        className="mb-3 w-full max-w-full"
                      >
                        <Switch
                          isSelected={i.selected}
                          onValueChange={(e) => {
                            e ? addKey(i.key) : removeKey(i.key)
                          }}
                          color="success"
                          classNames={{
                            base: cn(
                              'flex-row-reverse w-full max-w-full bg-content1 hover:bg-content2 items-center',
                              'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-zinc-400',
                              'data-[selected=true]:border-success'
                            ),
                          }}
                        >
                          <div>
                            <p className="font-medium">{i.name}</p>
                            <p className="text-xs opacity-80">
                              {i.description}
                            </p>
                          </div>
                        </Switch>
                      </li>
                    )
                  })}
                </ul>
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
      <div className="col-span-2 ">
        <p className="mb-5">Usuarios con este rol:</p>
        {data.users?.map((user) => {
          const image = user.avatar || '/static/default-profile.png'
          const name = `${user.firstName.split(' ')[0]} ${user.lastName.split(' ')[0]}`
          return (
            <div
              key={user.id}
              className="border-b border-zinc-200 dark:border-zinc-700 py-2"
            >
              <User
                name={name}
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
