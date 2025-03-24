import { Select, SelectItem } from '@heroui/react'

export const sources = [
  {
    key: 'STORE',
    name: 'Tiendas físicas',
  },
  {
    key: 'FRIENDS',
    name: 'Amigos',
  },
  {
    key: 'SOCIAL_MEDIA',
    name: 'Redes Sociales',
  },
  {
    key: 'WEB_FORMS',
    name: 'Formulario web',
  },
  {
    key: 'INBOX',
    name: 'Chat',
  },
  {
    key: 'MANUALLY',
    name: 'Manual',
  },
  {
    key: 'CAMPAIGNS',
    name: 'Campañas',
  },
]
type TProps = {
  onChange: (key?: string | null) => void
  value?: string | null
}
export default function SelectSourceLead({ onChange, value }: TProps) {
  return (
    <Select
      value={value ?? undefined}
      items={sources}
      label="Canal de la fuente"
      placeholder="Seleccionar canal"
      labelPlacement="outside"
      onSelectionChange={(key) => {
        if (onChange) {
          onChange(key.currentKey)
        }
      }}
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
        classNames: {
          base: 'before:bg-default-200',
          content: 'p-0 border-small border-divider bg-background',
        },
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <div className="flex flex-col">
              <span>{item.data?.name}</span>
            </div>
          </div>
        ))
      }}
      variant="bordered"
    >
      {(item) => (
        <SelectItem key={item.key} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}
