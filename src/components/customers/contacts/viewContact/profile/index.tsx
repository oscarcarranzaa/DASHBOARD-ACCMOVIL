import { contactSchema } from '@/types/customer'
import { Input } from '@nextui-org/react'

export default function ContactProfile({
  contact,
}: {
  contact: contactSchema
}) {
  return (
    <>
      <div>
        <Input
          variant="underlined"
          label="Primer nombre"
          labelPlacement="outside-left"
        />
      </div>
    </>
  )
}
