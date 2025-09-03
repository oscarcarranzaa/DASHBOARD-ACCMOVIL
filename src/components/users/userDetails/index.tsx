import { UserSchema } from '@/types/users'
import { User } from '@heroui/react'

type IProps = {
  user: UserSchema
}

export default function UserDetails({ user }: IProps) {
  const image = user.avatar ? user.avatar : '/static/default-profile.png'

  const name = `${user.firstName} ${user.lastName}`
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
            <div className="flex gap-x-2 items-center">
              <p className="text-lg font-semibold">{name}</p>{' '}
            </div>
          }
        >
          {user.email}
        </User>
      </div>
    </>
  )
}
