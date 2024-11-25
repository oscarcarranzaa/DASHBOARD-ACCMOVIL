import LockSVG from '@/components/icons/lock'
import UserSVG from '@/components/icons/user'

const iconSize = 20

export const profileItems = [
  {
    name: 'Configuración de la cuenta',
    icon: <UserSVG size={iconSize} />,
    href: '/dash/account',
  },
  {
    name: 'Seguridad',
    icon: <LockSVG size={iconSize} />,
    href: '/dash/account/security',
  },
]
