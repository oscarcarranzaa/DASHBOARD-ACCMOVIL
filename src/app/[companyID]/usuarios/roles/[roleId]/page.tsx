'use client'
import { getOneRol, updateRol } from '@/api/users'
import ErrorsPages from '@/components/errorsPages'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function AdminRolPage() {
  const params = useParams()
  const ID = params.roleId
  const queryClient = useQueryClient()
  const { data, error } = useQuery({
    queryKey: ['roles', ID],
    queryFn: () => getOneRol(ID.toString()),
    refetchOnWindowFocus: false,
    retry: false,
  })
  const { isPending: rolPending, mutate } = useMutation({
    mutationFn: updateRol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Rol actualizado')
    },
    onError: (err) => {
      toast.error(err.message)
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
        <Toaster theme="dark" />
      </div>
    </>
  )
}
