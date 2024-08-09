import SearchProductLabel from '@/components/publish/publishEditor/variations/searchProductLabel'
import useOutsideClick from '@/hooks/useOutSideClick'
import { getProductImageSchema } from '@/types/poducts'
import { Button } from '@nextui-org/button'
import { SetStateAction, useRef, useState } from 'react'

type TProps = {
  open: React.Dispatch<SetStateAction<boolean>>
  onSelectProduct?: (value: getProductImageSchema) => void
  selectedProduct?: getProductImageSchema
  title?: string
}
export default function SelectProduct({
  open,
  onSelectProduct,
  selectedProduct,
  title,
}: TProps) {
  const initialSelect = selectedProduct ? selectedProduct : undefined
  const [productSelected, setProductSelected] = useState<
    getProductImageSchema | undefined
  >(initialSelect)

  const ref = useRef<HTMLElement>(null)
  useOutsideClick(ref, () => open(false))

  return (
    <>
      <div
        className="fixed top-0 bg-[var(--box-opacity)] left-0 right-0 bottom-0 min-h-screen min-w-[100vw] z-50 flex justify-center items-center "
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <div
          ref={ref as React.MutableRefObject<HTMLDivElement>}
          className="bg-zinc-50 border border-zinc-400 dark:bg-zinc-950 min-w-96 min-h-40 max-w-96 rounded-xl px-5 "
        >
          <div className=" flex flex-col justify-center items-center text-center p-1 pt-5">
            <h3 className=" font-semibold text-xl mt-4">
              Selecciona un producto
            </h3>
            {title && <p className="text-sm text-zinc-500 mt-2">{title}</p>}
            <div className="w-full mt-5 ">
              <SearchProductLabel
                onSelect={(value) => setProductSelected(value)}
                seleted={productSelected ?? undefined}
              />
            </div>
          </div>
          <div className="w-full gap-2 p-2 mb-3 mt-5">
            <div className="mb-2">
              <Button
                className="w-full"
                onClick={() => {
                  open(false)
                  if (
                    onSelectProduct &&
                    selectedProduct?._id !== productSelected?._id
                  ) {
                    onSelectProduct(productSelected as getProductImageSchema)
                  }
                }}
                color="primary"
              >
                {!productSelected ? 'Aceptar' : 'Seleccionar'}
              </Button>
            </div>
            <Button className="w-full" onClick={() => open(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
