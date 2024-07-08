import { CategorySchema } from '@/types/category'
import { useState } from 'react'

interface CategoryTreeProps {
  categories: CategorySchema[]
}

interface CategoryTree extends CategorySchema {
  children?: CategoryTree[]
}

export default function CategoryTree({ categories }: CategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategories((prevExpanded) => {
      const newExpanded = new Set(prevExpanded)
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId)
      } else {
        newExpanded.add(categoryId)
      }
      return newExpanded
    })
  }
  const renderCategories = (categoriesData: CategorySchema[]) => {
    return categoriesData.map((category) => {
      const children = categories.filter((c) => c.parent === category._id)
      const isExpanded = expandedCategories.has(category._id)
      return (
        <li
          key={category._id}
          className={`p-2 mt-1 rounded-md ${isExpanded ? 'block absolute top-0 z-10 h-96 overflow-scroll bg-red-500 ' : 'block'} `}
        >
          <button
            onClick={() => handleCategoryClick(category._id)}
            className={isExpanded ? 'block ' : 'hidden'}
          >
            regre
          </button>
          <button onClick={() => handleCategoryClick(category._id)}>
            {category.name}
          </button>

          {children.length > 0 && (
            <ul className={`${isExpanded ? 'block ' : ' hidden'}`}>
              {renderCategories(children)}
            </ul>
          )}
        </li>
      )
    })
  }
  console.log(expandedCategories)
  const rootCategories = categories.filter((cat) => !cat.parent)

  return (
    <div className=" h-96 w-full overflow-scroll text-left relative">
      <ul>{renderCategories(rootCategories)}</ul>
    </div>
  )
}
