'use client'
import { getAllAttributes } from '@/api/attributes'
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Key } from '@react-types/shared'
import AttributeValues from './attributeValues'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { usePublishStore } from '@/store/publish'
import VariationsValues from './variationsValues'

export default function ManagerAttributes() {
  const getAttribute = usePublishStore((state) => state.attributes)
  const initialSelected = getAttribute?.map((att) => att.id) ?? []

  const [selected, setSelected] = useState<Key | null | undefined>(null)
  const [selectedAttributes, setSelectedAttributes] =
    useState<Key[]>(initialSelected)

  //// Query
  const { data, isPending } = useQuery({
    queryKey: ['Attributes'],
    queryFn: getAllAttributes,
    refetchOnWindowFocus: false,
  })
  const attribute = selectedAttributes.map((att) => {
    return data?.find((a) => a._id === att)
  })

  const options =
    data?.map((attribute) => ({
      id: attribute._id,
      label: attribute.name,
    })) ?? []

  //// Store
  const setAttribute = usePublishStore((state) => state.setAttributes)
  //// Agregar un atributo
  const handleAddAttribute = () => {
    if (selected && !selectedAttributes.includes(selected)) {
      const updateValues = [...selectedAttributes, selected]
      const attributeFind = updateValues.map((att) => {
        return data?.find((a) => a._id === att)
      })
      setSelectedAttributes(updateValues)
      const attStoreValue = attributeFind.map((att) => {
        const isExists = getAttribute?.find((a) => a.id === att?._id)
        if (isExists) return isExists

        return {
          id: att?._id ?? '',
          name: att?.name ?? '',
          terms: [],
        }
      })
      console.log('pasa')
      setAttribute(attStoreValue)
      setSelected(null)
    }
  }
  // Sortable Drag
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    const oldIndex = selectedAttributes.findIndex((att) => att === active.id)
    const newIndex = selectedAttributes.findIndex((att) => att === over?.id)
    if (oldIndex === -1 || newIndex === -1) return
    const newAttributes = [...selectedAttributes]
    newAttributes.splice(oldIndex, 1)
    newAttributes.splice(newIndex, 0, active.id)

    //// Cambio de posición en el store
    const attributeFind = newAttributes.map((att) => {
      return data?.find((a) => a._id === att)
    })

    const attStoreValue = attributeFind.map((att) => {
      const isExists = getAttribute?.find((a) => a.id === att?._id)
      if (isExists) return isExists
      return {
        id: att?._id ?? '',
        name: att?.name ?? '',
        terms: [],
      }
    })
    setAttribute(attStoreValue)
    ////
    setSelectedAttributes(newAttributes)
  }
  const deleteAtt = (id: string) => {
    const newAttributes = selectedAttributes.filter((att) => att !== id)
    setSelectedAttributes(newAttributes)
    const attributeFind = newAttributes.map((att) => {
      return data?.find((a) => a._id === att)
    })
    const attStoreValue = attributeFind.map((att) => {
      const isExists = getAttribute?.find((a) => a.id === att?._id)
      if (isExists) return isExists
      return {
        id: att?._id ?? '',
        name: att?.name ?? '',
        terms: [],
      }
    })
    setAttribute(attStoreValue)
  }
  return (
    <div className=" mt-5">
      <div className="flex items-center">
        <Autocomplete
          label="Selecciona un atributo"
          disabledKeys={selectedAttributes.map((att) => att.toString())}
          className="max-w-xs"
          size="sm"
          isLoading={isPending}
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          {options.map((att) => (
            <AutocompleteItem key={att.id} value={att.id}>
              {att.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="ml-5">
          <Button
            disabled={selected === null}
            color={selected === null ? 'default' : 'primary'}
            onClick={handleAddAttribute}
          >
            agregar
          </Button>
        </div>
      </div>
      <div className=" mt-5">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedAttributes}
            strategy={verticalListSortingStrategy}
          >
            {attribute.map((att) => {
              if (!att) return null
              return (
                <AttributeValues
                  key={att._id}
                  deleteAtt={deleteAtt}
                  id={att._id.toString()}
                  name={att.name}
                  type={att.type}
                />
              )
            })}
          </SortableContext>
        </DndContext>
      </div>
      <VariationsValues />
    </div>
  )
}
