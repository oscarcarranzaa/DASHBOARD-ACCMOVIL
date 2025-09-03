import { ibmPlexMono } from '@/app/fonts'
import { Chip } from '@heroui/react'

type TProps = {
  name: string
  avatar?: string | null
  email: string
  username?: string | null
  role?: string | null
  is_owner?: boolean
  status: 'ACTIVE' | 'INACTIVE' | 'TERMINATED'
  description?: string | null
}

const statusName = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  TERMINATED: 'Terminado',
}

export default function UserCard({
  name,
  avatar,
  email,
  role,
  username,
  is_owner,
  status,
  description,
}: TProps) {
  const avatarUrl = avatar ? avatar : '/static/default-profile.png'
  return (
    <div className={`flex justify-center items-center text-white`}>
      <div className=" dark:bg-amber-900 bg-amber-600 max-w-[30rem] rounded-lg ">
        <div className="w-[280px] md:w-[350px] lg:w-[400px] overflow-hidden rounded-xl p-6 py-10 border relative bg-gradient-to-tr border-gray-500/30 from-gray-500/10 via-gray-400/5 to-gray-600/10">
          <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-80"></div>

          <div className={ibmPlexMono.className}>
            <p className="text-lg opacity-90">/{username}</p>
            <div className="mt-2">
              <h3 className=" text-4xl max-w-[20rem] font-bold">{name}</h3>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <img
              className="w-40 h-40 rounded-full object-cover border-5  border-white/50"
              src={avatarUrl}
              alt=""
            />
          </div>
          <div className="flex justify-center gap-2 mt-5">
            <Chip className="bg-white text-black">{statusName[status]}</Chip>
            {is_owner && (
              <Chip className="bg-white text-black">Propietario</Chip>
            )}
            <Chip className="bg-white text-black">{role}</Chip>
          </div>
          <div className="mt-5">
            <p className="text-base">{email}</p>
            <p className="text-sm font-stretch-condensed">
              {description || 'N/D'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
