import { useState } from 'react'
import DisplayItemsVariations from './displayItemsVariations'
import DisplayDeleteItemsVariations from './displayDeleteItemsVariations'
import ArrowAngleSVG from '@/components/icons/arrowAngle'
import { TVariations } from '@/store/publish'

type TProps = {
  variations?: TVariations[]
  termGroup: {
    id: string
    name: string
  }
}
export default function DisplayGroupVariations({
  termGroup,
  variations,
}: TProps) {
  const [open, setOpen] = useState(false)
  const totalVariations =
    variations?.filter((att) => {
      return att.attributesTerms[0].id === termGroup.id && !att.isDeleted
    }) ?? []

  return (
    <>
      <div className="">
        <div
          className={`p-3 border-2 hover:border-primary border-zinc-200 dark:border-zinc-700   mt-2 cursor-pointer bg-zinc-50 dark:bg-transparent dark:bg-zinc-900" ${open ? 'rounded-t-2xl' : 'rounded-2xl'}`}
          onClick={() => setOpen(!open)}
        >
          <div className=" p-3 flex justify-between items-center">
            <p>{termGroup.name}: </p>
            <div className="flex items-center">
              <span
                className={`transform ${open ? ' rotate-180' : 'rotate-0'} dark:fill-white mr-1 transition-transform`}
              >
                <ArrowAngleSVG size={18} />
              </span>
              <p className="text-sm">{totalVariations.length} variaciones </p>
            </div>
          </div>
        </div>
        <div
          className={`${open ? 'block rounded-b-2xl overflow-hidden border-2 border-t-0 border-zinc-200 dark:border-zinc-700' : 'hidden'}`}
        >
          {variations?.map((att, index) => {
            const isTerm = att.attributesTerms[0].id === termGroup.id
            if (!isTerm || att.attributesTerms.length === 1) return null
            const terName = att.attributesTerms
              .map((term) => term.name)
              .join('/')
            if (!att.isDeleted) {
              return (
                <DisplayItemsVariations
                  key={index}
                  variation={att}
                  termName={terName}
                />
              )
            }
            return null
          })}
          {variations?.map((att, index) => {
            const isTerm = att.attributesTerms[0].id === termGroup.id
            if (!isTerm || att.attributesTerms.length === 1) return null
            const terName = att.attributesTerms
              .map((term) => term.name)
              .join('/')
            if (att.isDeleted) {
              return (
                <DisplayDeleteItemsVariations
                  key={index}
                  variationId={att.id}
                  termName={terName}
                />
              )
            }
            return null
          })}
        </div>
      </div>
    </>
  )
}
