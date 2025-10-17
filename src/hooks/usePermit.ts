import { useAuthStore } from '@/store/auth'

export const usePermit = ({ keys }: { keys: string[] }) => {
  const user = useAuthStore((state) => state.user)
  const userKeys = user?.role?.keys ?? []

  if (
    userKeys === null ||
    userKeys.length === 0 ||
    keys.length === 0 ||
    user?.is_user_root
  )
    return true

  const hasAllPermissions = keys.some((key) => userKeys.includes(key))

  return hasAllPermissions
}
