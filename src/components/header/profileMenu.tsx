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

  const avatar = data?.avatar?.images
    ? data.avatar.images[2].src
    : '/static/default-profile.png'

  return (
    <>
      <div
        className="mr-5 relative"
        ref={ref as React.MutableRefObject<HTMLDivElement>}
      >
        <div className="flex items-center ">
          <p className="mr-2 text-sm font-medium">{data?.name}</p>
          <button
            className="p-1  rounded-full "
            onClick={() => setOpenProfile(!openProfile)}
          >
            <div className=" rounded-full overflow-hidden w-10 h-10">
              <img src={avatar} decoding="async" />
            </div>
          </button>
        </div>
        <div
          className={`${openProfile ? '' : 'hidden'} absolute z-50 right-0 bg-gray-50 border border-gray-300 p-2 rounded-md dark:bg-zinc-800 dark:border-zinc-700`}
        >
          <ProfileItems
            image={avatar}
            name={data.name ?? data.email}
            role={data.team.role}
          />
        </div>
      </div>
    </>
  )
}
