export default function EmptyCategory() {
  return (
    <>
      <div className="w-full flex justify-center items-center mt-14 flex-col">
        <picture>
          <img src="/static/add-category.png" className="max-w-56" />
        </picture>
        <p className="text-xs mt-3 text-zinc-700 font-semibold dark:text-zinc-300">
          Comience agregando nuevas categorías para sus productos.
        </p>
      </div>
    </>
  )
}
