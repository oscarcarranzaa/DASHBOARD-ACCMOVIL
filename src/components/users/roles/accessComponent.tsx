import useUserInfo from '@/hooks/useUserInfo'
import { verifyAccess } from '@/lib/verifyAccess'

type TProps = {
  children: React.ReactNode
  keys: string[]
}

export default function AccessComponent({ children, keys }: TProps) {
  const { userData } = useUserInfo()
  const userRoles = userData?.role ? userData.role.keys : null
  const isView = verifyAccess({ keys, userKeys: userRoles })
  if (!isView) return null
  return children
}
