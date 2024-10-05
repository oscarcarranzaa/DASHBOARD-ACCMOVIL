import validDiscountPrice from './validationDateDiscountPrice'

type TProduct = {
  price: number
  quantity: number
  discountPrice?: number | null
  startDiscount?: string | null
  endDiscount?: string | null
}

type TProps = {
  items: TProduct[]
}

export default function CalcSubToltalOrder({ items }: TProps) {
  let subtotal = 0
  let total = 0
  let discount = 0

  items.forEach((product) => {
    const { price, discountPrice, startDiscount, endDiscount, quantity } =
      product

    // Convertir los precios a centavos
    const priceInCents = Math.round(price * 100)
    const itemSubtotal = priceInCents * quantity
    subtotal += itemSubtotal

    const { validDiscount } = validDiscountPrice(startDiscount, endDiscount)

    if (validDiscount && discountPrice) {
      const discountPriceInCents = Math.round(discountPrice * 100)
      const itemDiscount = (priceInCents - discountPriceInCents) * quantity
      discount += -itemDiscount
      total += discountPriceInCents * quantity
    } else {
      total += itemSubtotal // Sin descuento
    }
  })

  // Devolver los valores en formato de dinero con dos decimales
  return {
    subtotal: subtotal / 100,
    discount: discount / 100,
    total: total / 100,
  }
}
