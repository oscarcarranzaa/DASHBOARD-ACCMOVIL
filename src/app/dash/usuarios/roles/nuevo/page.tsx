'use client'
import { createRol, getPermissions } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function AdminRolPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions,
    refetchOnWindowFocus: false,
  })
  const { isPending: rolPending, mutate } = useMutation({
    mutationFn: createRol,
    onSuccess: (dat) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      router.push(`/dash/usuarios/roles/${dat.id}`)
      toast.success('Rol creado')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
  return (
    <>
      <NavegationPages text="Crear un nuevo Rol" />
      <div className="w-full">
        {data && (
          <RoleEditor
            permissions={data}
            roleName=""
            isLoading={rolPending}
            buttonName="Crear"
            onSend={(e) => {
              mutate(e)
            }}
          />
        )}
        <Toaster theme="dark" />
      </div>
    </>
  )
}
