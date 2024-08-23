import ItemsAttributes from '@/components/attributes/itemsAttributes'
import NavegationPages from '@/components/navegationPages'
import { Button } from '@nextui-org/button'

export default function Attributes() {
  return (
    <>
      <div className="flex justify-between">
        <NavegationPages text="Atributos" />
        <Button color="primary">Crear atributo</Button>
      </div>
      <div className=" grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-full flex-wrap select-none">
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
        <ItemsAttributes />
      </div>
    </>
  )
}
