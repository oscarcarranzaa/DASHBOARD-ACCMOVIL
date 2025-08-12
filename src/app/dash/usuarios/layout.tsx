import api from '@/lib/axios'
import { ZCheckPermission, checkPermissionSchema } from '@/types/login'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function LayoutUser({
  children,
}: {
  children: React.ReactNode
}) {
  let validPermission: checkPermissionSchema | null = null
  const token = await cookies()
  const tokenValue = token.get('updateToken')?.value
  try {
    const { data } = await api.post<checkPermissionSchema>(
      '/admin/auth/check-permissions',
      { key: 'owner' },
      {
        headers: {
          Cookie: `updateToken=${tokenValue}`,
        },
      }
    )
    const result = ZCheckPermission.safeParse(data)

    if (result.success) {
      validPermission = result.data
    }
  } catch (error) {}

  // Mostrar mensaje de error si hubo fallo al obtener permisos
  if (validPermission === null) {
    return (
      <div className="text-yellow-500 p-4">
        Ocurrió un error al obtener los permisos. Intenta nuevamente más tarde.
      </div>
    )
  }

  // Mostrar mensaje si no tiene permisos válidos
  if (!validPermission.response.success) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <Image
          src="/static/offline-network.webp"
          width={180}
          height={180}
          alt="Offline"
        />
        <p className="text-2xl font-bold ">Prohibido</p>
        <div className="text-red-500 p-4">{validPermission.response.msg}</div>
      </div>
    )
  }

  return <>{children}</>
}
