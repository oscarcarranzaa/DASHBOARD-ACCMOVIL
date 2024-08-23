import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import Settings from '@/components/icons/settings'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategory } from '@/api/category'
import { useCategoryStore } from '@/store/category'

type TProps = {
  categoryID: string
  parent: string
  onSelectCategory: () => void
}
export default function AdvancedSettings({
  categoryID,
  parent,
  onSelectCategory,
}: TProps) {
  const queryClient = useQueryClient()
  const { setOpenCategory } = useCategoryStore()
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      onSelectCategory()
      queryClient.invalidateQueries({ queryKey: ['categories', parent] })
      setOpenCategory('')
    },
  })

  return (
    <div className="dark:fill-zinc-200 ">
      <Accordion variant="bordered" itemClasses={{ title: 'text-sm' }}>
        <AccordionItem
          title="Avanzado"
          startContent={<Settings size={18} />}
          key={1}
        >
          <p>Eliminar categoría</p>
          <p className="text-xs mt-1 mb-2">
            Si eliminas la categoría tus productos no se elminarán...
          </p>
          <Button
            color="danger"
            onClick={() => {
              mutate(categoryID)
            }}
          >
            Eliminar
          </Button>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
