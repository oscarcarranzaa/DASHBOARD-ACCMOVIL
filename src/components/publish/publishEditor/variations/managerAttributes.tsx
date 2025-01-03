/* eslint-disable react-hooks/exhaustive-deps */
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
import SearchSVG from '@/components/icons/search'

const MAX_ATT = 3
export default function ManagerAttributes() {
  //// Store
  const setAttribute = usePublishStore((state) => state.setAttributes)
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
  useEffect(() => {
    setSelectedAttributes(initialSelected)
  }, [getAttribute])

  const attribute = selectedAttributes.map((att) => {
    return data?.find((a) => a.id === att)
  })

  const options =
    data?.map((attribute) => ({
      id: attribute.id,
      label: attribute.name,
    })) ?? []

  //// Agregar un atributo
  const handleAddAttribute = () => {
    if (selected && !selectedAttributes.includes(selected)) {
      const updateValues = [...selectedAttributes, selected]
      const attributeFind = updateValues.map((att) => {
        return data?.find((a) => a.id === att)
      })
      setSelectedAttributes(updateValues)
      const attStoreValue = attributeFind.map((att) => {
        const isExists = getAttribute?.find((a) => a.id === att?.id)
        if (isExists) return isExists

        return {
          id: att?.id ?? '',
          name: att?.name ?? '',
          terms: [],
        }
      })

      setAttribute(attStoreValue)
      setSelected(null)
    }
  }

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
      return data?.find((a) => a.id === att)
    })

    const attStoreValue = attributeFind.map((att) => {
      const isExists = getAttribute?.find((a) => a.id === att?.id)
      if (isExists) return isExists
      return {
        id: att?.id ?? '',
        name: att?.name ?? '',
        terms: [],
      }
    })

    setAttribute(attStoreValue)

    setSelectedAttributes(newAttributes)
  }
  const deleteAtt = (id: string) => {
    const newAttributes = selectedAttributes.filter((att) => att !== id)
    setSelectedAttributes(newAttributes)
    const attributeFind = newAttributes.map((att) => {
      return data?.find((a) => a.id === att)
    })
    const attStoreValue = attributeFind.map((att) => {
      const isExists = getAttribute?.find((a) => a.id === att?.id)
      if (isExists) return isExists
      return {
        id: att?.id ?? '',
        name: att?.name ?? '',
        terms: [],
      }
    })
    setAttribute(attStoreValue)
  }

  const maxAtt = attribute && attribute.length >= MAX_ATT
  return (
    <div className=" mt-5">
      <p className=" font-semibold text-sm mb-2">Atributos:</p>
      <div className="flex items-center">
        <Autocomplete
          isDisabled={maxAtt}
          classNames={{
            base: 'max-w-xs',
            listboxWrapper: 'max-h-[320px]',
            selectorButton: 'text-default-500',
          }}
          inputProps={{
            classNames: {
              input: 'ml-1',
              inputWrapper: 'h-[48px]',
            },
          }}
          listboxProps={{
            hideSelectedIcon: true,
            itemClasses: {
              base: [
                'rounded-medium',
                'text-default-500',
                'transition-opacity',
                'data-[hover=true]:text-foreground',
                'dark:data-[hover=true]:bg-default-50',
                'data-[pressed=true]:opacity-70',
                'data-[hover=true]:bg-default-200',
                'data-[selectable=true]:focus:bg-default-100',
                'data-[focus-visible=true]:ring-default-500',
              ],
            },
          }}
          aria-label="Selecciona un atributo"
          placeholder="Selecciona un atributo"
          popoverProps={{
            offset: 10,
            classNames: {
              base: 'rounded-large',
              content: 'p-1 border-small border-default-100 bg-background',
            },
          }}
          startContent={
            <div className="dark:fill-white fill-black">
              <SearchSVG size={20} />
            </div>
          }
          radius="full"
          variant="bordered"
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
        <p className=" text-xs ml-2 opacity-65">
          {attribute ? attribute.length : '0'}/{MAX_ATT} atributos
        </p>
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
                  key={att.id}
                  deleteAtt={deleteAtt}
                  id={att.id.toString()}
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
