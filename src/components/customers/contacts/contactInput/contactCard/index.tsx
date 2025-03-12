import { Avatar } from '@heroui/react'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  name: string
  id: string
  image?: string | null
  email?: string | null
  phone?: string | null
}

export default function ContactCardPreview({
  id,
  name,
  image,
  email,
  phone,
}: TProps) {
  return (
    <div className="dark:bg-zinc-800 w-60 bg-zinc-50 border border-zinc-500 p-2  py-3 min-w-80 rounded-lg dark:text-white text-black ">
      <Link
        href={`/dash/pipe/contactos/${id}`}
        target="_blank"
        className=" text-lg font-semibold hover:text-blue-500 flex items-center gap-2 hover:underline"
      >
        <Avatar
          showFallback
          size="lg"
          name={name}
          src={image ?? undefined}
          className="flex-none  dark:bg-orange-800 bg-orange-300"
        />
        <p className=" line-clamp-2">{name}</p>
      </Link>

      <div className="mt-4">
        {email && (
          <div className="flex items-center gap-5 ml-5">
            <div>
              <Mail size={18} />
            </div>
            <p className=" text-left text-sm">{email}</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        {phone && (
          <div className="flex items-center gap-5 ml-5">
            <div>
              <Phone size={18} />
            </div>
            <p className=" text-left text-sm">{phone}</p>
          </div>
        )}
      </div>
    </div>
  )
}
