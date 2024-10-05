import AddShoppingCartIcon from '@/components/icons/addShoppingCartIcon'

export default function EmptyOrder({ size }: { size: number }) {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <AddShoppingCartIcon size={size} />
        <p className="text-sm mt-2 mb-5">
          Aún no tienes productos agregados a la lista.
        </p>
      </div>
    </>
  )
}
