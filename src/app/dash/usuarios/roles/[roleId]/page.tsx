'use client'
import { getOneRol, updateRol } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import RoleEditor from '@/components/users/roles/roleEditor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function AdminRolPage() {
  const params = useParams()
  const ID = params.roleId
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['roles', ID],
    queryFn: () => getOneRol(ID.toString()),
    refetchOnWindowFocus: false,
  })
  const {
    data: rolUpdate,
    isPending: rolPending,
    mutate,
  } = useMutation({
    mutationFn: updateRol,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Rol actualizado')
    },
  })
  return (
    <>
      <NavegationPages text={data?.name ?? 'Cargando...'} />
      <div className="w-full">
        {data && (
          <RoleEditor
            data={data}
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
