'use client'
import { useAuthStore } from '@/store/auth'
import AccountInformationForm from './accountForm'
import ChangeAvatar from './changeAvatar'

export default function AccountInformation() {
  const userInformation = useAuthStore((store) => store.user)
  return (
    <div className=" max-w-5xl">
      <ChangeAvatar avatar={userInformation?.avatar} />
      {userInformation && <AccountInformationForm user={userInformation} />}
    </div>
  )
}
