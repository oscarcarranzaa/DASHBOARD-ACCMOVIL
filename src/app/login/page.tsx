'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginForm from '@/components/forms/login'
import { LoginSchema, login } from '@/types'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/api/login'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const initialValues: LoginSchema = {
    email: '',
    password: '',
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(login), defaultValues: initialValues })

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      console.log('redirecting...')
      router.push('/dash')
    },
  })

  const setToken = useAuthStore((state) => state.setToken)
  useEffect(() => {
    if (data) {
      setToken(data.data.token)
    }
  }, [data, setToken])

  const handleForm = (formData: LoginSchema) => mutate(formData)
  return (
    <main className="flex justify-center items-center min-h-screen  md:bg-slate-200">
      <div className="z-10">
        <div className="max-w-[600px] md:p-8 rounded-xl md:bg-slate-50">
          <div className="p-3 pl-5 pr-5 w-full">
            <div className="mb-8 flex justify-center">
              <Image
                src={'/static/logo.webp'}
                width={300}
                height={62}
                alt="Accmovil Logo"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center text-zinc-800">
              Iniciar Sesión
            </h2>
            <form onSubmit={handleSubmit(handleForm)}>
              <LoginForm
                register={register}
                errors={errors}
                loading={isPending}
                error={error?.message}
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
