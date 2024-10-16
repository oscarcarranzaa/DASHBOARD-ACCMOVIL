import {
  billingInfoSchema,
  contactOrderSchema,
  createOrderSchema,
  createShippingInfoSchema,
  orderDetailsSchema,
  orderItemsSchema,
  orderSchema,
  typeOrderItem,
  ZBillingInfo,
  ZOrder,
  ZOrderDetails,
  ZOrderItems,
  ZOrderItemsProduct,
} from './../types/order'
import axiosInstance from '@/lib/axiosClient'
import { countrySchema, ZGetCountry } from '@/types/schemas'
import { isAxiosError } from 'axios'

export async function createOrder(orderData: createOrderSchema) {
  try {
    const { data } = await axiosInstance.post<orderSchema>(
      '/admin/order/create',
      orderData
    )
    const validOrder = ZOrder.parse(data)
    return validOrder
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al crear una orden nueva')
    }
  }
}

export async function updateContactOrder(orderData: contactOrderSchema) {
  try {
    const { data } = await axiosInstance.put<billingInfoSchema>(
      '/admin/order/add/contact',
      orderData
    )
    const validOrderData = ZBillingInfo.parse(data)
    return validOrderData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al agregar la informacion de contacto.')
    }
  }
}

export async function updateOrder({
  orderData,
  id,
}: {
  orderData: createOrderSchema
  id: string
}) {
  try {
    const { data } = await axiosInstance.put(`/admin/order/${id}`, orderData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al actualizar la orden.')
    }
  }
}
export async function addShippingData({
  form,
}: {
  form: createShippingInfoSchema
}) {
  try {
    const { data } = await axiosInstance.put(
      '/admin/order/~/shippingData',
      form
    )
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al agregar datos de envio al pedido.')
    }
  }
}
export async function getCountry() {
  try {
    const { data } = await axiosInstance.get<countrySchema>(
      '/static/assets/info/country.json'
    )
    const validCountry = ZGetCountry.parse(data)
    return validCountry
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error('Error al obtener las ciudades.', {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al crear una orden nueva')
    }
  }
}
export async function finishOrder({ form }: { form: FormData }) {
  try {
    const { data } = await axiosInstance.put(
      `/admin/order/~/finishOrder`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error('Error al finalizar pedido.', {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al crear una orden nueva')
    }
  }
}

export async function persistOrderQuery() {
  try {
    const { data } = await axiosInstance.get<orderDetailsSchema>(
      '/admin/order/persist/creating'
    )
    const validOrderData = ZOrderDetails.parse(data)
    return validOrderData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al crear una orden nueva')
    }
  }
}

type TUpdateQuantityProductOrder = {
  id: string
  quantity: number
}
export async function updateProductOrder(product: TUpdateQuantityProductOrder) {
  try {
    const { data } = await axiosInstance.put<orderItemsSchema>(
      '/admin/order/product/quantity/update',
      product
    )
    const validOrderData = ZOrderItems.parse(data)
    return validOrderData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al actualizar la cantidad.')
    }
  }
}
export async function deleteProductOrder(id: string) {
  try {
    const { data } = await axiosInstance.delete<typeOrderItem>(
      `/admin/order/product/${id}`
    )
    const validOrderData = ZOrderItems.parse(data)
    return validOrderData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al eliminar el producto.')
    }
  }
}
export async function addProductOrder(id: string) {
  try {
    const { data } = await axiosInstance.post<orderItemsSchema>(
      `/admin/order/product/${id}`
    )
    const validOrderData = ZOrderItemsProduct.parse(data)
    return validOrderData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al eliminar el producto.')
    }
  }
}
