'use client'
import { contactSchema } from '@/types/customer'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import ContactCardPreview from '../contactCard'
import { Tooltip } from '@heroui/react'

type TProps = {
  contact: contactSchema
  isSelected: boolean
  handleSelectContact: (contact: contactSchema | undefined) => void
}
export default function ContactItem({
  contact,
  isSelected,
  handleSelectContact,
}: TProps) {
  return (
    <div
      key={contact.id}
      className={`flex items-center  hover:bg-primary rounded mb-1 border-2  hover:text-white ${isSelected ? 'border-primary' : 'border-transparent'}`}
    >
      <button
        onClick={() => {
          handleSelectContact(contact)
        }}
        className=" w-full justify-between p-2 "
      >
        <div className=" text-left">
          <p className="text-sm">{contact.name}</p>
          <p className="text-xs opacity-80">{contact.email}</p>
        </div>
      </button>
      <div className={`flex w-8 h-8 relative mr-1  `}>
        <Tooltip
          placement="right"
          className="bg-transparent border-transparent shadow-none"
          offset={20}
          content={
            <ContactCardPreview
              id={contact.id}
              name={contact.name}
              email={contact.email}
              image={contact.avatar}
              phone={contact.phone}
            />
          }
        >
          <Link
            href={`/dash/clientes/contactos/${contact.id}`}
            target="_blank"
            className="hover:bg-blue-400 rounded-md w-full h-full flex justify-center items-center"
          >
            <ExternalLink width={18} height={18} />
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}
