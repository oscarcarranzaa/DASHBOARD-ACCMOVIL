'use client'
import { verifyAccess } from '@/lib/verifyAccess'
import { useAuthStore } from '@/store/auth'

type TProps = {
  children: React.ReactNode
  keys: string[]
}

export default function AccessComponent({ children, keys }: TProps) {
  const user = useAuthStore((state) => state.user)
  const userRoles = user?.role ? user.role.keys : null
  const isView = verifyAccess({ keys, userKeys: userRoles })
  if (!isView) return null
  return children
}
