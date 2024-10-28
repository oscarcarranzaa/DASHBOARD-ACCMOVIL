import {
  addProductOrderSchema,
  billingInfoSchema,
  contactOrderSchema,
  createOrderSchema,
  createShippingInfoSchema,
  orderDetailsRead,
  orderDetailsSchema,
  orderEditShema,
  orderItemUpdatedSchema,
  orderListSchema,
  orderSchema,
  orderSuccessSchema,
  typeOrderItem,
  ZAddProductOrder,
  ZBillingInfo,
  ZGetOrderList,
  ZGetOrderSuccess,
  ZOrder,
  ZOrderDetails,
  ZOrderDetailsRead,
  ZOrderItems,
  ZOrderItemUpdate,
} from './../types/order'
import axiosInstance from '@/lib/axiosClient'
import { filterQueryType } from '@/types'
import {
  countrySchema,
  resposeIdSchema,
  ZGetCountry,
  ZResponseId,
} from '@/types/schemas'
import { FilterQueryUrl } from '@/utils/filterQueryUrl'
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
    const { data } = await axiosInstance.put<resposeIdSchema>(
      `/admin/order/~/finishOrder`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    const validData = ZResponseId.parse(data)
    return validData
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

type TUpdateQuantityProductOrder = {
  id: string
  quantity: number
}
export async function updateProductOrder(product: TUpdateQuantityProductOrder) {
  try {
    const { data } = await axiosInstance.put<orderItemUpdatedSchema>(
      '/admin/order/product/quantity/update',
      product
    )
    const validOrderData = ZOrderItemUpdate.parse(data)
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
    const { data } = await axiosInstance.delete<orderItemUpdatedSchema>(
      `/admin/order/product/${id}`
    )
    const validOrderData = ZOrderItemUpdate.parse(data)
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
    const { data } = await axiosInstance.post<addProductOrderSchema>(
      `/admin/order/product/${id}`
    )
    const validOrderData = ZAddProductOrder.parse(data)
    return validOrderData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al agregar producto a la orden.')
    }
  }
}
export async function getAllsOrder({
  page,
  limit,
  q,
  startDate,
  endDate,
  status,
}: filterQueryType) {
  try {
    const { filterUrl } = FilterQueryUrl({
      page,
      limit,
      q,
      startDate,
      endDate,
      status,
    })
    const { data } = await axiosInstance.get<orderListSchema>(
      `/admin/order/all${filterUrl}`
    )

    const validOrders = ZGetOrderList.parse(data)
    return validOrders
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al agregar producto a la orden.')
    }
  }
}
export async function getOrderSuccess(id: string) {
  try {
    const { data } = await axiosInstance.get<orderSuccessSchema>(
      `/admin/order/${id}/success`
    )
    const validOrderData = ZGetOrderSuccess.parse(data)
    return validOrderData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al obtener los datos de la orden.')
    }
  }
}
export async function getOrderDetails(id: string) {
  try {
    const { data } = await axiosInstance.get<orderDetailsRead>(
      `/admin/order/${id}/details`
    )
    const validOrderData = ZOrderDetailsRead.parse(data)
    return validOrderData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al obtener los datos de la orden.')
    }
  }
}

export async function updateTrackUrl({ id, url }: { id: string; url: string }) {
  try {
    const { data } = await axiosInstance.put(`/admin/order/${id}/trackUrl`, {
      url,
    })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al actualizar la URL de seguimiento.')
    }
  }
}
type TUpdateOrder = {
  id: string
  orderUpdate: orderEditShema
}
export async function updateOrderData({ id, orderUpdate }: TUpdateOrder) {
  try {
    const { data } = await axiosInstance.put(
      `/admin/order/${id}/update`,
      orderUpdate
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al actualizar el pedido.')
    }
  }
}
