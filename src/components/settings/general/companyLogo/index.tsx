import SelectImage from '@/components/media/selectImage'

export default function CompanyLogo() {
  return (
    <div>
      <h4 className="font-semibold">Cambiar logo de la compañia</h4>
      <div className="dark:bg-zinc-900 bg-white p-4 rounded-lg flex flex-col gap-2">
        <div className="flex items-center gap-3 dark:bg-zinc-800 bg-zinc-100 p-2 rounded-lg">
          <div className="flex-shrink-0 flex-none min-w-[100px]">
            <SelectImage iconSize={25} setValue={() => {}} />
          </div>
          <div>
            <p className="font-medium">Seleccionar logo completo</p>
            <p className="text-xs opacity-70">Formatos: JPG, PNG, SVG</p>
          </div>
        </div>
        <div className="flex items-center gap-3 dark:bg-zinc-800 bg-zinc-100 p-2 rounded-lg">
          <div className="flex-shrink-0 flex-none min-w-[100px]">
            <SelectImage iconSize={25} setValue={() => {}} />
          </div>
          <div>
            <p className="font-medium">Seleccionar icono</p>
            <p className="text-xs opacity-70">Formatos: JPG, PNG, SVG</p>
          </div>
        </div>
      </div>
    </div>
  )
}
