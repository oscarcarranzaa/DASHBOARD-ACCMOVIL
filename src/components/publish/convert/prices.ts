import { productSchema } from '@/types/products'
import { PostSchema } from '@/types/posts'
import validDiscountPrice from '@/utils/validationDateDiscountPrice'

type TProps = {
  product?: productSchema | null
  variations?: PostSchema['variations']
  type: 'simple' | 'variable'
}

export default function ConvertPricePost({
  product,
  variations,
  type,
}: TProps) {
  const priceVariations = variations?.map((varia) => {
    if (varia.productId) {
      const { Product: productVariation } = varia
      return {
        price: productVariation?.price,
        discount: productVariation?.discountPrice,
        porcentDiscount: porcentDiscount(productVariation),
        startDiscount: productVariation?.startDiscount,
        endDiscount: productVariation?.endDiscount,
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
    discount: product?.discountPrice,
    startDiscount: product?.startDiscount,
    porcentDiscount: porcentDiscount(product),
    endDiscount: product?.endDiscount,
  }
  return type === 'variable' ? priceVariations : priceProduct
}
const porcentDiscount = (product?: productSchema | null) => {
  if (product) {
    const differentPrice = product?.discountPrice
      ? product.price - product.discountPrice
      : 0
    const totalDiscount = Math.round((differentPrice / product?.price) * 100)
    const { validDiscount } = validDiscountPrice(
      product?.startDiscount,
      product?.endDiscount
    )
    return totalDiscount > 0 && validDiscount ? totalDiscount : undefined
  }
  return undefined
}
