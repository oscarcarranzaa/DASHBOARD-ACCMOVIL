import UserCirclePluskSVG from '@/components/icons/userCirclePlus'
import SelectUser from '@/components/customers/selectCustomer'
import { createOrderState } from '@/store/order'
import { Button, Input } from '@heroui/react'
import { useState } from 'react'
import ContactOrderForm from './contactOrderForm'

export default function ContactOrder() {
  const [openSelectUser, setOpenSelectUser] = useState(true)
  const contactOrder = createOrderState((state) => state.contact)
  const setContactOrder = createOrderState((state) => state.setContact)

  return (
    <>
      <div>
        <p className="font-semibold">Datos de contacto</p>
        {contactOrder.email.length > 5 ||
        contactOrder.typeContact === 'guest' ? (
          <ContactOrderForm />
        ) : (
          <div className=" w-full flex flex-col items-center justify-center mt-5">
            <div>
              <div className="dark:fill-zinc-300 fill-zinc-700 flex justify-center">
                <UserCirclePluskSVG size={100} />
              </div>
              <p className=" text-sm">
                Seleccionar un cliente o continue como invitado.
              </p>
              <div className=" flex justify-center gap-4 mt-3 mb-5">
                <Button
                  color="primary"
                  onPress={() => setOpenSelectUser(false)}
                >
                  Seleccionar
                </Button>
                <Button
                  variant="flat"
                  onPress={() =>
                    setContactOrder({ ...contactOrder, typeContact: 'guest' })
                  }
                >
                  Invitado
                </Button>
              </div>
            </div>
          </div>
        )}
        <SelectUser
          openModal={openSelectUser}
          closeModal={() => setOpenSelectUser(true)}
          setValue={(customer) => {
            setContactOrder({
              customerId: customer.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              typeContact: 'customer',
              withRtn: false,
              phone: customer.phone,
            })
          }}
        />
      </div>
    </>
  )
}
