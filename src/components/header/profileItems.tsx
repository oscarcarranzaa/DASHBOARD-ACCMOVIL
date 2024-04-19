import { logout } from '@/api/login'
import OffSVG from '../icons/off'
import { profileItems } from './menuObjects'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface IProfileProps {
  image: string
  name: string
  role: string
}

export default function ProfileItems({ image, name, role }: IProfileProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // cerrar sesion e invalidar todas las queries
  const logoutUser = async () => {
    try {
      const q = await queryClient.invalidateQueries()
      console.log(q)
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  return (
    <>
      <div>
        <div className="flex items-center mb-5">
          <img src={image} className="w-20 h-20 rounded-full" />
          <div className="ml-2">
            <p className=" font-semibold">{name}</p>
            <p className="text-xs text-green-600 font-semibold inline-blockrounded-xl">
              {role}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-5">
        {profileItems.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center w-60 p-2 pl-3 pr-3 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              <div className="mr-2">{item.icon}</div>
              <p>{item.name}</p>
            </div>
          )
        })}
        <button
          className="flex items-center w-60 p-2 pl-3 pr-3 text-sm font-medium rounded-md text-red-500 hover:bg-red-100"
          onClick={logoutUser}
        >
          <div className="mr-2">
            <OffSVG size={20} />
          </div>
          <p>Cerrar sesión</p>
        </button>
      </div>
    </>
  )
}
