import api from '@/lib/axios'
import axiosInstance from '@/lib/axiosClient'
import { Response, ZResponse } from '@/types/auth'
import { changePassSchema } from '@/types/users'
import axios, { isAxiosError } from 'axios'

export async function changePass(formData: changePassSchema) {
  try {
    const { data } = await axiosInstance.patch(
      '/admin/auth/change-password',
      formData
    )
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response?.data?.response?.msg || 'Error desconocido',
        {
          cause: error.response.status,
        }
      )
    } else {
      throw new Error('Error al actualizar la contraseña')
    }
  }
}

type TParamsForgotPassword = {
  email: string
}

export async function forgotPassword({ email }: TParamsForgotPassword) {
  try {
    const { data } = await api.post<Response>('/admin/auth/forgot-password', {
      email,
    })
    const validData = ZResponse.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrio un error al solicitar el cambio de contraseña')
    }
  }
}
type TParamsForgotOTP = {
  token: string
}

export async function sendOTPForgotPassword({ token }: TParamsForgotOTP) {
  try {
    const { data } = await api.post<Response>('/admin/auth/verify-code', {
      token,
    })
    const validData = ZResponse.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrio un error al validar el codigo')
    }
  }
}
type TParamsChangePassword = {
  token: string
  password: string
}
export async function sendChangePassword({
  token,
  password,
}: TParamsChangePassword) {
  try {
    const { data } = await api.post<Response>(
      `/admin/auth/reset-password/${token}`,
      {
        password,
      }
    )
    const validData = ZResponse.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrio un error al cambiar la contraseña')
    }
  }
}
