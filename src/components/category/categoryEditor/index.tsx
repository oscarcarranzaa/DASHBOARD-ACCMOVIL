'use client'

import { Tab, Tabs } from '@nextui-org/react'
import NewCategoryForm from './newCategoryForm'
import DisplayCategory, { selectCategory } from '../displayCategory'
import { useEffect, useState } from 'react'
import { Key } from '@react-types/shared'
import EditCategoryForm from './editCategoryForm'

export default function CategoryEditor() {
  const [category, setCategory] = useState<selectCategory>()
  const [selectedTabs, setSelectedTabs] = useState<Key>('nuevo')

  useEffect(() => {
    if (!category && selectedTabs === 'editar') {
      setSelectedTabs('nuevo')
    }
  }, [setSelectedTabs, category, selectedTabs])

  return (
    <>
      <section className="grid grid-cols-6 gap-x-4">
        <div className=" bg-white dark:bg-zinc-800 p-2 rounded-xl pt-5 py-1 col-span-4 md:col-span-3 relative overflow-hidden">
          <Tabs
            size="md"
            aria-label="Tabs form"
            variant="bordered"
            disabledKeys={category ? [''] : ['editar']}
            selectedKey={selectedTabs}
            onSelectionChange={setSelectedTabs}
          >
            <Tab key="nuevo" title="Nuevo">
              <NewCategoryForm
                parentCategory={category?.parent ? category.parent : ''}
                category={`Agregar a: ${category ? category.name : '[Root]'}`}
                categorySelected={category && category.id}
              />
            </Tab>
            <Tab key="editar" title="Editar">
              <div className="mt-5">
                {category && (
                  <EditCategoryForm
                    onCloseCategory={() => setCategory(undefined)}
                    category={`Agregar a: ${category ? category.name : '[Root]'}`}
                    categorySelected={category.id}
                  />
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-span-3">
          <DisplayCategory
            onSelectCategory={(cat) => {
              setCategory(cat[0])
            }}
            value={category ? [category] : undefined}
            isOnly
          />
        </div>
      </section>
    </>
  )
}
