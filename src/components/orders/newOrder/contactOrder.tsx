import UserCirclePluskSVG from '@/components/icons/userCirclePlus'
import SelectUser from '@/components/customers/selectCustomer'
import { createOrderState } from '@/store/order'
import { Avatar, Button, Input } from '@heroui/react'
import { useState } from 'react'
import ContactOrderForm from './contactOrderForm'
import { UserPlus } from 'lucide-react'
import SelectContact from '@/components/customers/selectCustomer'
import ContactInfoCard from './contactInfoCard'

export default function ContactOrder() {
  const contactOrder = createOrderState((state) => state.contact)
  const setContactOrder = createOrderState((state) => state.setContact)
  const onRemoveContact = createOrderState((state) => state.onRemoveContact)

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-semibold">Datos de contacto</p>
          <div>
            {contactOrder.typeContact === 'empty' ? (
              <SelectContact
                buttonProps={{ color: 'primary', variant: 'flat' }}
                setValue={(customer) => {
                  setContactOrder({
                    customerId: customer.id,
                    name: customer.name,
                    email: customer.email,
                    typeContact: 'customer',
                    withRtn: false,
                    phone: customer.phone,
                  })
                }}
              />
            ) : (
              <ContactInfoCard
                name={contactOrder.name}
                type={contactOrder.typeContact}
                avatar={contactOrder.avatar}
                email={contactOrder.email}
                phone={contactOrder.phone}
                onClose={() => onRemoveContact()}
              />
            )}
          </div>
        </div>
        {contactOrder.typeContact === 'guest' ||
        contactOrder.typeContact === 'customer' ? (
          <ContactOrderForm />
        ) : (
          <div className=" w-full flex flex-col items-center justify-center mt-5">
            <div>
              <div className="dark:fill-zinc-300 fill-zinc-700 flex justify-center">
                <UserPlus size={100} />
              </div>
              <p className=" text-sm">
                Seleccionar un contacto o continue como invitado.
              </p>
              <div className=" flex justify-center gap-4 mt-3 mb-5">
                <SelectContact
                  buttonProps={{ color: 'primary' }}
                  setValue={(customer) => {
                    setContactOrder({
                      customerId: customer.id,
                      name: customer.name,
                      email: customer.email,
                      typeContact: 'customer',
                      withRtn: false,
                      phone: customer.phone,
                    })
                  }}
                />
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
      </div>
    </>
  )
}
