'use client'

import { select, Tab, Tabs } from '@nextui-org/react'
import NewCategoryForm from './newCategoryForm'
import DisplayCategory, { selectCategory } from '../displayCategory'
import { useState } from 'react'

export default function CategoryEditor() {
  const [category, setCategory] = useState<selectCategory>()

  return (
    <>
      <section className="grid grid-cols-6 gap-x-4">
        <div className=" bg-white dark:bg-zinc-800 p-2 rounded-xl pt-5 py-1 col-span-3 2xl:col-span-2">
          <Tabs size="md" aria-label="Tabs form" variant="bordered">
            <Tab key="nuevo" title="Nuevo">
              <NewCategoryForm
                category={`Agregar a: ${category ? category.name : '[Root]'}`}
                categorySelected={category && category._id}
              />
            </Tab>
            <Tab key="editar" title="Editar">
              <div className="mt-5"></div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-span-3">
          <DisplayCategory
            onSelectCategory={(cat) => {
              setCategory(cat[0])
            }}
            isOnly
          />
        </div>
      </section>
    </>
  )
}
