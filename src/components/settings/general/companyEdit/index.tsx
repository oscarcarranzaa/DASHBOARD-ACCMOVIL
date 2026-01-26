import { Button, Input, Textarea } from '@heroui/react'

export default function CompanyEdit() {
  return (
    <div className="border p-4  border-zinc-300 bg-white dark:border-zinc-700 rounded-lg dark:bg-black">
      <h3 className="font-semibold text-center text-lg mt-2">
        Editar información general
      </h3>
      <div className="mt-5 flex flex-col gap-2 gap-y-5">
        <Input
          label="Nombre comercial"
          labelPlacement="outside-top"
          variant="bordered"
          isRequired
          placeholder="Nombre de la compañía"
        />

        <div className="flex gap-4">
          <Input
            label="Razón social"
            labelPlacement="outside-top"
            variant="bordered"
            isRequired
            placeholder="Nombre de la razón social"
          />
          <Input
            label="Sitio web"
            labelPlacement="outside-top"
            variant="bordered"
            placeholder="Ejemplo: https://www.acme.com"
          />
        </div>
        <div className="flex gap-4">
          <Input
            label="Teléfono"
            labelPlacement="outside-top"
            variant="bordered"
            placeholder="Ejemplo: +504 3333-3333"
          />
          <Input
            label="Email corporativo"
            labelPlacement="outside-top"
            variant="bordered"
            placeholder="Ejemplo: info@acme.com"
          />
        </div>
        <div className="mt-10">
          <Textarea
            label="Descripción de la compañía"
            labelPlacement="outside-top"
            variant="bordered"
            classNames={{
              inputWrapper: 'py-2',
            }}
            placeholder="Descripción corta de la compañía"
          />
        </div>
        <div className="flex justify-end">
          <Button color="primary" className="px-5">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}
