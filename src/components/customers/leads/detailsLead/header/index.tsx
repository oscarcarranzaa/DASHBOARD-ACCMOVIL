'use client'

import { leadSchema } from '@/types/crm/leads'
import { Button } from '@heroui/react'
import { Select, SelectItem, Avatar } from '@heroui/react'
import { Ellipsis } from 'lucide-react'

export const users = [
  {
    id: 1,
    name: 'Linda Aplicano',
    role: 'Marketing',
    team: 'Management',
    status: 'active',
    age: '29',
    avatar:
      'https://media.oscarcarranza.dev/up/images/T04P7DAMNMA-U052SLCEE2G-24174c819e44-2000_qTeQRhR_360p.webp',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Tech Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png',
    email: 'zoey.lang@example.com',
  },
]
type TProps = {
  lead: leadSchema
}
export default function LeadDetailsHeader({ lead }: TProps) {
  return (
    <>
      <div className=" flex justify-between items-center px-5 border-2 border-zinc-200 dark:border-zinc-900 rounded-lg py-2">
        <h2 className="text-lg font-medium">{lead.title}</h2>
        <div className=" flex gap-4 items-center">
          <Select
            className="max-w-xs min-w-52 bg-transparent"
            classNames={{
              base: 'bg-transparent data-[hover=true]:bg-transparent',
              label: 'group-data-[filled=true]:-translate-y-5',
              trigger:
                'min-h-16 bg-transparent data-[hover=true]:bg-transparent',
              listboxWrapper: 'max-h-[400px]',
            }}
            items={users}
            label="Propietario asignado"
            placeholder="Asignar propietario"
            listboxProps={{
              itemClasses: {
                base: [
                  'rounded-md',
                  'text-default-500',
                  'transition-opacity',
                  'data-[hover=true]:text-foreground',
                  'data-[hover=true]:bg-default-100',
                  'dark:data-[hover=true]:bg-default-50',
                  'data-[selectable=true]:focus:bg-default-50',
                  'data-[pressed=true]:opacity-70',
                  'data-[focus-visible=true]:ring-default-500',
                ],
              },
            }}
            popoverProps={{
              shouldBlockScroll: false,
              classNames: {
                base: 'before:bg-default-200',
                content: 'p-0 border-small border-divider bg-background',
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data?.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.data?.avatar}
                  />
                  <div className="flex flex-col">
                    <span>{item.data?.name}</span>
                  </div>
                </div>
              ))
            }}
            variant="bordered"
          >
            {(user) => (
              <SelectItem key={user.id} textValue={user.name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.name}</span>
                    <span className="text-tiny text-default-400">
                      {user.role}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          <div className=" flex gap-2">
            <Button className="bg-primary text-white rounded-md">Ganado</Button>
            <Button className="rounded-md" color="danger" variant="bordered">
              Perdido
            </Button>
          </div>
          <Button isIconOnly variant="bordered">
            <Ellipsis />
          </Button>
        </div>
      </div>
    </>
  )
}
