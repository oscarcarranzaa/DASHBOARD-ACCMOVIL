'use client'
import { getAllAttributes } from '@/api/attributes'
import { Autocomplete, AutocompleteItem, Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Key } from '@react-types/shared'
import AttributeValues from './attributeValues'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function ManagerAttributes() {
  const [selected, setSelected] = useState<Key | null | undefined>(null)
  const [selectedAttributes, setSelectedAttributes] = useState<Key[]>([])
  const { data, isPending } = useQuery({
    queryKey: ['Attributes'],
    queryFn: getAllAttributes,
    refetchOnWindowFocus: false,
  })
  const options =
    data?.map((attribute) => ({
      id: attribute._id,
      label: attribute.name,
    })) ?? []

  const handleAddAttribute = () => {
    if (selected) {
      setSelectedAttributes([...selectedAttributes, selected])
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
    setSelectedAttributes(newAttributes)
  }
  return (
    <div>
      <div className="flex items-center">
        <Autocomplete
          label="Selecciona un atributo"
          disabledKeys={selectedAttributes.map((att) => att.toString())}
          className="max-w-xs"
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
            {selectedAttributes.map((att) => {
              const attribute = data?.find((a) => a._id === att)
              return (
                <AttributeValues
                  key={att}
                  deleteAtt={setSelectedAttributes}
                  id={att.toString()}
                  name={attribute?.name ?? ''}
                  type={attribute?.type ?? ''}
                />
              )
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
