'use client'
import { createRol, getPermissions } from '@/api/users'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { addToast } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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
      router.push('/dash/usuarios/roles')

      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Rol creado',
      })
    },
    onError: (err) => {
      addToast({
        color: 'danger',
        variant: 'bordered',
        timeout: 5000,
        title: 'Ocurrio un error',
        description: err.message,
      })
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
      </div>
    </>
  )
}
