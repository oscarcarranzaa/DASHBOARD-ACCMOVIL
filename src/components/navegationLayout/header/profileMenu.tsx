'use client'
import { useRef, useState } from 'react'
import { UserSchema } from '@/types/schemas'
import useOutsideClick from '@/hooks/useOutSideClick'
import ProfileItems from './profileItems'

interface IProps {
  data: UserSchema
}

export default function ProfileMenu({ data }: IProps) {
  const [openProfile, setOpenProfile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setOpenProfile(false))

  const avatar = data.avatar
    ? data.avatar + '-thumb.webp'
    : '/static/default-profile.png'
  const name = `${data.firstName.split(' ')[0]} ${data.lastName.split(' ')[0]}`
  return (
    <div
      className="mr-5 relative"
      ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
      <div className="flex items-center ">
        <p className="mr-2 text-sm font-medium">{name}</p>
        <button
          className="p-1  rounded-full "
          onClick={() => setOpenProfile(!openProfile)}
        >
          <div className=" rounded-full overflow-hidden w-10 h-10">
            <picture>
              <img src={avatar} decoding="async" alt="Foto de perfil" />
            </picture>
          </div>
        </button>
      </div>
      <div
        className={`${openProfile ? '' : 'hidden'} top-14 absolute z-50 right-0 bg-gray-50 border border-gray-300 p-2 rounded-xl dark:bg-zinc-950 dark:border-zinc-700`}
      >
        <ProfileItems
          image={avatar}
          name={name}
          role={data.role?.name ?? 'Administrador'}
        />
      </div>
    </div>
  )
}
