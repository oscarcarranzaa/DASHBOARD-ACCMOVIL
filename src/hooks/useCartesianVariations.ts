import { TVariations } from '@/store/publish'
import { useMemo } from 'react'

type TProps = {
  terms: { id: string; name: string }[][] | null
  variations?: TVariations[]
}

type TCartesianProduct = { id: string; name: string }[][]

const createCartesianProduct = (
  terms: { id: string; name: string }[][]
): TCartesianProduct => {
  return terms.reduce<TCartesianProduct>(
    (acc, current) =>
      acc.flatMap((item) => current.map((term) => [...item, term])),
    [[]] as TCartesianProduct
  )
}

const createVariationMap = (variations?: TVariations[]) => {
  const map = new Map<string, TVariations>()
  variations?.forEach((variation) => {
    const key = variation.attributesTerms
      .map((term) => term.id)
      .sort()
      .join(',')
    map.set(key, variation)
  })
  return map
}

export const useCartesianVariations = ({ terms, variations }: TProps) => {
  const cartesianVariations = useMemo(() => {
    if (!terms || terms.length === 0) return []
    const isDeleted = variations?.every((v) => v.isNew === false)

    // Generar el producto cartesiano de los términos
    const cartesianProduct = createCartesianProduct(terms)

    // Crear un mapa de las variaciones existentes para búsqueda rápida
    const variationMap = createVariationMap(variations)

    // Generar variaciones finales
    return cartesianProduct.map((attributesTerms) => {
      const key = attributesTerms
        .map((term) => term.id)
        .sort()
        .join(',')
      const existingVariation = variationMap.get(key)

      return existingVariation
        ? { ...existingVariation, attributesTerms }
        : { id: key, product: null, isNew: true, isDeleted, attributesTerms }
    })
  }, [terms, variations])

  return cartesianVariations
}
