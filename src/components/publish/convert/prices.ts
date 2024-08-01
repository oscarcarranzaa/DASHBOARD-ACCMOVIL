import { getOneProductSchema } from '@/types/poducts'
import { variationsPost } from '@/types/posts'
import validDiscountPrice from '@/utils/validationDateDiscountPrice'

type TProps = {
  product?: getOneProductSchema | null
  variations?: variationsPost[]
  type: 'simple' | 'variable'
}

export default function ConvertPricePost({
  product,
  variations,
  type,
}: TProps) {
  const priceVariations = variations?.map((varia) => {
    if (varia.product) {
      const { product: productVar } = varia
      return {
        price: productVar.price,
        discount: productVar.priceDiscount?.price,
        porcentDiscount: porcentDiscount(productVar),
        startDiscount: varia.product.priceDiscount?.start,
        endDiscount: varia.product.priceDiscount?.end,
      }
    }
    return {
      price: 0,
      discount: undefined,
      startDiscount: undefined,
      porcentDiscount: undefined,
      endDiscount: undefined,
    }
  })[0]

  const priceProduct = {
    price: product?.price ?? 0,
    discount: product?.priceDiscount?.price,
    startDiscount: product?.priceDiscount?.start,
    porcentDiscount: porcentDiscount(product),
    endDiscount: product?.priceDiscount?.end,
  }
  return type === 'variable' ? priceVariations : priceProduct
}
const porcentDiscount = (product?: getOneProductSchema | null) => {
  if (product) {
    const differentPrice = product?.priceDiscount?.price
      ? product.price - product.priceDiscount.price
      : 0
    const totalDiscount = Math.round((differentPrice / product?.price) * 100)
    const { validDiscount } = validDiscountPrice(
      product?.priceDiscount?.start,
      product?.priceDiscount?.end
    )
    return totalDiscount > 0 && validDiscount ? totalDiscount : undefined
  }
  return undefined
}
