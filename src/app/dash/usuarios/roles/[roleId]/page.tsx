'use client'
import { getOneRol, updateRol } from '@/api/users'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { addToast } from '@heroui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type paramsID = {
  roleId: string
}
export default function AdminRolPage() {
  const params: paramsID = useParams()
  const ID = params.roleId

  const queryClient = useQueryClient()
  const { data, error } = useQuery({
    queryKey: ['roles', ID],
    queryFn: () => getOneRol(ID),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const { isPending: rolPending, mutate } = useMutation({
    mutationFn: updateRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })

      addToast({
        color: 'success',
        variant: 'bordered',
        timeout: 5000,
        title: 'Rol actualizado',
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
  if (error) {
    return <ErrorsPages message={error.message} errorRef={error.cause} />
  }
  return (
    <>
      <NavegationPages text={data?.name ?? 'Cargando...'} />
      <div className="w-full">
        {data && (
          <RoleEditor
            permissions={data.permissions}
            roleName={data.name}
            users={data.users}
            isLoading={rolPending}
            buttonName="Actualizar"
            onSend={(e) => {
              mutate({ id: data.id, value: e })
            }}
          />
        )}
      </div>
    </>
  )
}
