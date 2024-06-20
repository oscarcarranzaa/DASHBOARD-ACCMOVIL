'use client'
import { getOneAttribute } from '@/api/attributes'
import { Button } from '@nextui-org/button'
import { Autocomplete, AutocompleteItem, Chip } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { SetStateAction, useState } from 'react'
import { Key } from '@react-types/shared'
import { useSortable } from '@dnd-kit/sortable'
import ChipItems from '@/components/UI/chip'
import { usePublishStore } from '@/store/publish'

type AttributeValuesProps = {
  name: string
  type: string
  id: string
  deleteAtt: React.Dispatch<SetStateAction<Key[]>>
}
export default function AttributeValues({
  name,
  type,
  id,
  deleteAtt,
}: AttributeValuesProps) {
  const getAtt = usePublishStore((state) => state.attributes)

  const initialSelected =
    getAtt?.find((att) => att.id === id)?.terms.map((att) => att.id) ?? []

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Key | null | undefined>(null)
  const [valueSelected, setValueSelected] = useState<Key[]>(initialSelected)

  const { data, isPending } = useQuery({
    queryKey: ['oneAtt', id],
    queryFn: () => getOneAttribute(id),
    refetchOnWindowFocus: false,
  })

  const valueItems = valueSelected.map((att) => {
    return data?.terms.find((a) => a._id === att)
  })
  const options =
    data?.terms.map((attribute) => ({
      id: attribute._id,
      label: attribute.name,
    })) ?? []

  const handleAddAttribute = () => {
    if (selected && !valueSelected.includes(selected)) {
      setValueSelected([...valueSelected, selected])
      setSelected(null)
    }
  }
  /******* Store **********/
  const setAtt = usePublishStore((state) => state.setAttributes)
  const selectSucces = () => {
    if (!data || getAtt === null) return

    const values = valueSelected.map((att) => {
      return data.terms.find((a) => a._id === att)
    })
    const attStoreValue = values.map((att) => {
      return {
        id: att?._id ?? '',
        name: att?.name ?? '',
      }
    })
    const addTerms = getAtt.map((att) => {
      if (att.id === id) {
        return {
          id: att.id,
          name: att.name,
          terms: attStoreValue,
        }
      }
      return att
    })
    setAtt(addTerms)
    setOpen(!open)
  }

  // Sortable Drag
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transform: transform ? `translateY(${transform.y}px)` : undefined,
    transition,
  }
  return (
    <>
      <div
        className="w-full mt-1 dark:bg-zinc-950 bg-white rounded-md"
        style={style}
      >
        <div
          className="flex justify-between items-center dark:bg-black p-3 px-5  rounded-xl cursor-move"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <div>
            <p>{name}:</p>
            <div className={open ? 'hidden' : 'flex text-xs gap-1 mt-1'}>
              {valueItems.map((att) => {
                return (
                  <Chip
                    key={att?._id}
                    size="sm"
                    variant="bordered"
                    className="  border-zinc-600"
                  >
                    {att?.name}
                  </Chip>
                )
              })}
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setOpen(!open)}
            className={open ? 'hidden' : 'block'}
          >
            Editar
          </Button>
        </div>

        <div
          className={`${!open ? 'hidden ' : 'block p-2 px-5 border-t dark:border-zinc-700 border-zinc-300'}`}
        >
          <div className="mt-3">
            <Autocomplete
              size="sm"
              label="Selecciona un atributo"
              className="max-w-xs"
              isLoading={isPending}
              disabledKeys={valueSelected.map((att) => att.toString())}
              onSelectionChange={setSelected}
              onInputChange={handleAddAttribute}
              selectedKey={selected}
            >
              {options.map((att) => (
                <AutocompleteItem key={att.id} value={att.id}>
                  {att.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <div className="mt-3 flex flex-wrap gap-y-2">
              {valueSelected.map((att) => {
                const attribute = data?.terms.find((a) => a._id === att)
                const img = attribute?.image?.images
                return (
                  <ChipItems
                    key={att}
                    Close={setValueSelected}
                    colors={attribute?.colors}
                    name={attribute?.name ?? ''}
                    id={attribute?._id ?? ''}
                    type={type}
                    image={img ? img[0].src : ''}
                  />
                )
              })}
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                deleteAtt((prev) => prev.filter((att) => att !== id))
              }}
            >
              Elminar
            </Button>
            <Button
              onClick={selectSucces}
              size="sm"
              className=""
              color="primary"
            >
              Listo
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
