'use client'
import { logout } from '@/api/login'
import OffSVG from '@/components/icons/off'
import { profileItems } from './menuObjects'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import { useLogout } from '@/hooks/useLogout'
import { Avatar } from '@heroui/react'

interface IProfileProps {
  image: string
  name: string
  role: string
}

export default function ProfileItems({ image, name, role }: IProfileProps) {
  const { logout } = useLogout()
  return (
    <>
      <div>
        <div className="flex items-center mb-5 p-3">
          <Avatar
            src={image}
            className="w-14 h-14 rounded-full object-cover overflow-hidden"
            alt={`Foto de perfil: ${name}`}
          />
          <div className="ml-2">
            <p className=" font-semibold">{name}</p>
            <p className="text-xs text-green-600 font-semibold inline-blockrounded-xl">
              {role}
            </p>
          </div>
        </div>
      </div>
      <hr className=" dark:opacity-40" />
      <div className="mt-5">
        {profileItems.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className="flex items-center w-72 p-2 pl-3 pr-3 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <div className="mr-2 dark:fill-zinc-300 stroke-black dark:stroke-zinc-300">
                {item.icon}
              </div>
              <p className=" text-sm">{item.name}</p>
            </Link>
          )
        })}
        <button
          className="flex mb-2 mt-1 items-center w-72 p-2 pl-3 pr-3 text-sm font-medium rounded-md text-red-500 hover:bg-red-100 dark:hover:text-white dark:hover:bg-red-700 stroke-red-500 dark:hover:stroke-white"
          onClick={logout}
        >
          <div className="mr-2">
            <OffSVG size={20} />
          </div>
          <p className=" text-sm">Cerrar sesión</p>
        </button>
      </div>
    </>
  )
}
