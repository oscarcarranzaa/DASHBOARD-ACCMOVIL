export const verifyAccess = ({
  keys,
  userKeys,
}: {
  keys: string[]
  userKeys?: string[] | null
}) => {
  if (userKeys === null || keys.length === 0) return true
  const userPermissionsKeys = userKeys ?? []
  const disabledKeys = keys.some((item) =>
    item ? userPermissionsKeys.includes(item) : false
  )
  return disabledKeys
}
