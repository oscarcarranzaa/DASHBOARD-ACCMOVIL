import DisplayCategory from '@/components/category/displayCategory'
import { usePublishStore } from '@/store/publish'

export default function CategoriesProduct() {
  const categories = usePublishStore((state) => state.categories)
  const setCategories = usePublishStore((state) => state.setCategories)
  return (
    <DisplayCategory
      value={categories}
      onSelectCategory={(select) => setCategories(select)}
    />
  )
}
