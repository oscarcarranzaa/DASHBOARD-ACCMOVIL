/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { getOneAttribute } from '@/api/attributes'
import { Button } from '@heroui/react'
import { Autocomplete, AutocompleteItem, Chip } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Key } from '@react-types/shared'
import { useSortable } from '@dnd-kit/sortable'
import ChipItems from '@/components/UI/chip'
import { usePublishStore } from '@/store/publish'
import DragSVG from '@/components/icons/drag'
import ArrowAngleSVG from '@/components/icons/arrowAngle'

type AttributeValuesProps = {
  name: string
  type: string
  id: string
  deleteAtt: (id: string) => void
}
export default function AttributeValues({
  name,
  type,
  id,
  deleteAtt,
}: AttributeValuesProps) {
  const getAtt = usePublishStore((state) => state.attributes)

  const initialSelected = useMemo(
    () =>
      getAtt?.find((att) => att.id === id)?.terms?.map((att) => att.id) ?? [],
    [getAtt, id]
  )

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Key | null | undefined>(null)
  const [valueSelected, setValueSelected] = useState<Key[]>(initialSelected)

  useEffect(() => {
    setValueSelected(initialSelected)
  }, [initialSelected])

  const { data, isPending } = useQuery({
    queryKey: ['oneAtt', id],
    queryFn: () => getOneAttribute(id),
    refetchOnWindowFocus: false,
  })

  const valueItems = valueSelected.map((att) => {
    return data?.terms.find((a) => a.id === att)
  })
  const options =
    data?.terms.map((attribute) => ({
      id: attribute.id,
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
  const selectSucces = useCallback(() => {
    if (!data || getAtt === null) return

    const values = valueSelected.map((att) =>
      data.terms.find((a) => a.id === att)
    )
    const attStoreValue = values.map((att) => ({
      id: att?.id ?? '',
      name: att?.name ?? '',
    }))

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

    const thisTerm = addTerms.find((t) => t.id === id)
    if (thisTerm && thisTerm.terms.length == 0) {
      deleteAtt(id)
      return
    }
    setAtt(addTerms)
    setOpen(false)
  }, [data, getAtt, id, valueSelected, setAtt])

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
        className="w-full mt-1 dark:bg-zinc-950 bg-white rounded-xl border border-zinc-200 dark:border-zinc-800"
        style={style}
      >
        <div className="flex justify-between items-center dark:bg-zinc-900  rounded-xl">
          <div className=" flex items-center w-full">
            <div
              className="mr-3 ml-3 cursor-move p-1 dark:stroke-white dark:fill-white stroke-black fill-black "
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            >
              <DragSVG size={20} />
            </div>
            <div
              className="flex justify-between w-full items-center p-3 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div>
                <p className=" font-medium">{name}:</p>
                <p className="text-xs opacity-60">
                  {open && 'Presione para cerrar'}
                </p>
                <div
                  className={
                    open ? 'hidden' : 'flex text-xs gap-1 mt-1 flex-wrap'
                  }
                >
                  {valueItems.map((att, index) => {
                    return (
                      <Chip
                        key={index}
                        size="sm"
                        variant="bordered"
                        className="  border-zinc-600"
                      >
                        {att?.name}
                      </Chip>
                    )
                  })}
                  {valueItems.length < 1 && 'Presione para agregar una opción'}
                </div>
              </div>
              <div
                className={`${open ? 'rotate-180' : ''} dark:stroke-white dark:fill-white stroke-black fill-black`}
              >
                <ArrowAngleSVG size={18} />
              </div>
            </div>
          </div>
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
                <AutocompleteItem key={att.id}>{att.label}</AutocompleteItem>
              ))}
            </Autocomplete>
            <div className="mt-3 flex flex-wrap gap-y-2">
              {data &&
                valueSelected.map((att) => {
                  const attribute = data?.terms.find((a) => a.id === att)
                  const img = attribute?.image?.qualities
                  return (
                    <ChipItems
                      key={att}
                      Close={setValueSelected}
                      colors={attribute?.colors}
                      name={attribute?.name ?? ''}
                      id={attribute?.id ?? ''}
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
              onPress={() => {
                deleteAtt(id)
              }}
            >
              Elminar
            </Button>
            <Button
              onPress={selectSucces}
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
