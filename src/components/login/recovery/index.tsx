'use client'
import { useState } from 'react'
import EmailRecoveryForm from './emailForm'
import StatusBarRecovery from './statusBar'
import FormOTPRecovery from './FormOTP'
import { useMutation } from '@tanstack/react-query'
import {
  forgotPassword,
  sendChangePassword,
  sendOTPForgotPassword,
} from '@/api/auth'
import ChangePasswordRecovery from './changePassword'
import { useRouter } from 'next/navigation'
import { addToast } from '@heroui/react'

type TRecoveryState = {
  email?: string
  token?: string
}

export default function RecoveryPassword() {
  const [step, setStep] = useState(1)
  const [recoveryState, setRecoveryState] = useState<TRecoveryState>({})
  const router = useRouter()
  const {
    mutate: forgotPasswordMutation,
    isPending: forgotPasswordIsPending,
    error: forgotPasswordError,
  } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setStep(2)
    },
  })

  const {
    mutate: sendOTPMutation,
    isPending: sendOTPIsPending,
    error: sendOTPError,
  } = useMutation({
    mutationFn: sendOTPForgotPassword,
    onSuccess: () => {
      setStep(3)
    },
  })
  const {
    mutate: changePasswordMutation,
    isPending: changePasswordIsPending,
    error: changePasswordError,
  } = useMutation({
    mutationFn: sendChangePassword,
    onSuccess: () => {
      addToast({
        title: 'Contraseña cambiada',
        description: 'Tu contraseña ha sido cambiada exitosamente',
        variant: 'bordered',
        color: 'success',
      })
      router.push('/login')
    },
    onError: (error) => {
      addToast({
        title: 'Error',
        color: 'danger',
        description: error?.message,
        variant: 'bordered',
      })
    },
  })
  return (
    <div>
      <StatusBarRecovery step={step} />
      {step === 1 && (
        <EmailRecoveryForm
          initialValues={recoveryState.email}
          onSendEmail={(email) => {
            forgotPasswordMutation({ email })
            setRecoveryState({ email })
          }}
          isPending={forgotPasswordIsPending}
          error={forgotPasswordError?.message}
        />
      )}
      {step === 2 && (
        <FormOTPRecovery
          onBack={() => setStep(1)}
          isPending={sendOTPIsPending}
          error={sendOTPError?.message}
          initialValues={recoveryState.token}
          onSendOTP={(otp) => {
            sendOTPMutation({ token: otp })
            setRecoveryState({ ...recoveryState, token: otp })
          }}
        />
      )}
      {step === 3 && (
        <ChangePasswordRecovery
          onSendPassword={(e) => {
            if (recoveryState.token) {
              changePasswordMutation({
                token: recoveryState.token,
                password: e,
              })
            }
          }}
          isPending={changePasswordIsPending}
          error={changePasswordError?.message}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  )
}
