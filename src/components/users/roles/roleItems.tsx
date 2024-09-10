import { Chip } from '@nextui-org/react'
import Link from 'next/link'

type TProps = {
  id: string
  name: string
  users: number
}
export default function RoleItems({ id, name, users }: TProps) {
  return (
    <>
      <div className="">
        <Link href={`roles/${id}`}>
          <div className="bg-white dark:bg-zinc-900 p-5 py-5 rounded-lg hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 border border-zinc-200">
            <div className="mb-10">
              <p className=" text-lg font-semibold">{name}</p>
            </div>
            <Chip variant="flat">Usuarios: {users} </Chip>
          </div>
        </Link>
      </div>
    </>
  )
}
