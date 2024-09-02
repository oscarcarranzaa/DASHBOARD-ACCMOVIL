import VerifiedSVG from '@/components/icons/verified'
import { UserSchema } from '@/types/users'
import { User, ChipProps } from '@nextui-org/react'

type IProps = {
  user: UserSchema
}
const statusColorMap: Record<string, ChipProps['color']> = {
  active: 'success',
  suspended: 'danger',
  disabled: 'warning',
}
export default function UserDetails({ user }: IProps) {
  const image = user.avatar?.images
    ? user.avatar.images[0].src
    : '/static/default-profile.png'
  const verifiedColor = user.verify ? '#09f' : '#777'
  return (
    <>
      <div className="dark:bg-zinc-950 bg-zinc-100 p-3 px-5 rounded-lg">
        <User
          avatarProps={{
            src: image,
            className: 'h-20 w-20',
          }}
          description={user.email}
          name={
            <div className="flex gap-x-2">
              <p>{user.name}</p> <VerifiedSVG size={18} color={verifiedColor} />
            </div>
          }
        >
          {user.email}
        </User>
      </div>
    </>
  )
}
