'use client'
import { createRol, getPermissions } from '@/api/users'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function AdminRolPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data, error } = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions,
    refetchOnWindowFocus: false,
    retry: false,
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
  if (error)
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  return (
    <>
      <NavegationPages
        text={data ? 'Crear un nuevo Rol' : 'Cargando permisos...'}
      />
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
