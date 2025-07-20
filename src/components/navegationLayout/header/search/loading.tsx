import { Spinner } from '@heroui/react'

export default function SearchLoading() {
  return (
    <>
      <div className="w-full flex mt-20 flex-col justify-center items-center">
        <div>
          <Spinner variant="simple" size="lg" />
        </div>
        <p className="text-sm">Buscando resultados...</p>
      </div>
    </>
  )
}
