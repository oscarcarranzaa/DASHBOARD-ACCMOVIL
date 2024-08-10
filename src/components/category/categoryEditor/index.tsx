'use client'

import { Tab, Tabs } from '@nextui-org/react'
import CategoryForm from './categoryForm'
import DisplayCategory from '../displayCategory'
import { useRouter } from 'next/navigation'

export default function CategoryEditor() {
  const router = useRouter()

  return (
    <>
      <section className="grid grid-cols-6 gap-x-4">
        <div className=" bg-white dark:bg-zinc-800 p-2 rounded-xl py-5 col-span-3 2xl:col-span-2">
          <Tabs size="md" aria-label="Tabs form" variant="bordered">
            <Tab key="nuevo" title="Nuevo">
              <div className="mt-10">
                <CategoryForm />
              </div>
            </Tab>
            <Tab key="editar" title="Editar">
              <div className="mt-10">
                <CategoryForm />
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="col-span-3">
          <DisplayCategory
            onSelectCategory={(category) => {
              const categoryID = category[0]._id
              router.push(`/dash/posts/categories/${categoryID}`)
            }}
            noClosed
            isOnly
          />
        </div>
      </section>
    </>
  )
}
