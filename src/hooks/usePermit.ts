import { useAuthStore } from '@/store/auth'

export const usePermit = ({ keys }: { keys: string[] }) => {
  const userKeys = useAuthStore((state) => state.user?.role?.keys) ?? []

  if (userKeys === null || userKeys.length === 0 || keys.length === 0)
    return true

  const hasAllPermissions = keys.some((key) => userKeys.includes(key))

  return hasAllPermissions
}
