'use client'

import { LoginSchema } from '@/types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import ErrorsMessage from './errorsMessage'
import { useState } from 'react'
import EyeSVG from '../icons/eye'
import EyeInvisibleSVG from '../icons/eyeInvisible'
import Spinner from '../icons/spinner'

type LoginFormProps = {
  register: UseFormRegister<LoginSchema>
  errors: FieldErrors<LoginSchema>
  loading: boolean
  error: string | undefined
}

export default function LoginForm({
  errors,
  register,
  loading,
  error,
}: LoginFormProps) {
  const [see, setSee] = useState(false)

  return (
    <>
      <div className="mb-5">
        <label>
          <p>
            Email: <span className="text-red-600">*</span>
          </p>
          <input
            type="email"
            className={`${errors.email ? 'border-red-300' : ''} w-80 p-3 border  rounded-md`}
            placeholder="Ingrese su correo"
            autoComplete="email"
            {...register('email', {
              required: 'El email es obligatorio',
            })}
          />
        </label>
        {errors.email && <ErrorsMessage>{errors.email.message}</ErrorsMessage>}
      </div>

      <div>
        <label>
          <p>
            Contraseña: <span className="text-red-600">*</span>
          </p>

          <div
            className={`${errors.password ? 'border-red-300' : ''} w-80 max-w-full border  rounded-md flex items-center overflow-hidden`}
          >
            <input
              type={see ? 'text' : 'password'}
              className="p-3 w-full"
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              {...register('password', {
                required: 'Contraseña obligatoria',
              })}
            />
            <button
              className="bg-white p-3 hover:bg-slate-200 rounded-md"
              type="button"
              onClick={() => setSee(!see)}
            >
              {see ? <EyeInvisibleSVG size={24} /> : <EyeSVG size={24} />}
            </button>
          </div>
        </label>
        <div className=" max-w-80">
          {errors.password && (
            <ErrorsMessage>{errors.password.message}</ErrorsMessage>
          )}
        </div>
      </div>
      <div className=" max-w-80 h-14">
        {error && <ErrorsMessage>{error}</ErrorsMessage>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`${loading ? 'cursor-not-allowed bg-blue-300 hover:bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} w-full  text-white font-semibold text-xl p-3 rounded-2xl mt-5  transition-colors flex justify-center`}
      >
        {loading ? (
          <div className="animate-spin w-7 h-7 flex items-center justify-center">
            <Spinner size={28} fill="#ffffff" />
          </div>
        ) : (
          'Iniciar sesión'
        )}
      </button>
    </>
  )
}
