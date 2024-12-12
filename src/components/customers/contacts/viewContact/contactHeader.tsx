import EmailSVG from '@/components/icons/email'
import PhoneSVG from '@/components/icons/phone'
import { contactSchema } from '@/types/customer'
import { User, Select, SelectItem } from '@nextui-org/react'
import { contactStatusOption } from '../newContact/contactStatusOptions'

export default function ContactHeader({ contact }: { contact: contactSchema }) {
  const name = `${contact.firstName} ${contact.lastName}`
  return (
    <>
      <div className="border p-5 rounded-xl border-zinc-300 dark:border-zinc-700 flex justify-between items-center">
        <User
          avatarProps={{
            radius: 'full',
            size: 'lg',
            src: contact.avatar ?? undefined,
            name: contact.firstName.toUpperCase(),
            className: 'bg-blue-200 dark:bg-blue-700 w-20 h-20',
          }}
          description={
            <div className=" dark:text-white text-black mt-2 flex gap-4 text-sm">
              <div className="flex gap-1 items-center">
                <div className="dark:stroke-white stroke-black">
                  <EmailSVG size={18} />
                </div>
                <p>{contact.email || 'N/D'}</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="dark:stroke-white stroke-black">
                  <PhoneSVG size={18} />
                </div>
                <p>{contact.phone || 'N/D'}</p>
              </div>
            </div>
          }
          name={
            <div className="flex gap-x-2 line-clamp-1 ">
              <p className="text-xl font-semibold ">{name}</p>
            </div>
          }
        ></User>
        <div className="w-60">
          <Select
            variant="flat"
            label="Estado de marketing"
            placeholder="Selecciona un estado"
            labelPlacement="outside"
            className="max-w-xs"
            selectedKeys={[contact.status]}
          >
            {contactStatusOption.map((cont) => (
              <SelectItem
                key={cont.key}
                startContent={cont.icon}
                className="stroke-black dark:stroke-white"
              >
                {cont.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  )
}
