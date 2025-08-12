import { Avatar } from '@heroui/react'
import { X } from 'lucide-react'

type TProps = {
  id?: string | null
  name?: string | null
  type: 'customer' | 'guest' | 'empty'
  avatar?: string | null
  email?: string | null
  onClose?: () => void
  phone?: string | null
}
export default function ContactInfoCard({
  id,
  name,
  type,
  avatar,
  email,
  phone,
  onClose,
}: TProps) {
  return (
    <div className="flex relative items-center min-w-60 gap-2 border dark:border-green-700 border-green-300 p-2 rounded-lg bg-success-300/20">
      <Avatar
        src={avatar ?? undefined}
        name={type === 'guest' ? '' : name ?? ''}
      />

      <div>
        <p className="font-semibold text-sm">
          {type === 'guest' ? 'Usuario invitado' : name}
        </p>
        {type === 'customer' && (
          <p className="text-xs">
            {email ?? 'No tiene correo'} - {phone ?? 'No tiene telefono'}
          </p>
        )}
      </div>

      <div className="absolute flex justify-center -top-1  w-6 h-6 -right-1">
        <button
          className="w-full h-full flex items-center justify-center p-1  border bg-zinc-200 dark:bg-zinc-900 dark:border-zinc-500 border-zinc-300 rounded-full"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
    </div>
  )
}
