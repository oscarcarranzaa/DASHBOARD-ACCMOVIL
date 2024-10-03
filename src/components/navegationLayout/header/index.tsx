'use client'
import Image from 'next/image'
import ProfileMenu from './profileMenu'
import HeaderSkeleton from './skeleton/skeletonLoader'
import DarkModeButton from './darkMode'
import { useAuthStore } from '@/store/auth'
import useUserInfo from '@/hooks/useUserInfo'

export default function Header() {
  const { userData } = useUserInfo()

  return (
    <>
      <header className="p-3 bg-white dark:bg-[#131315] flex justify-between border-b border-gray-300 dark:border-zinc-600">
        <div className="ml-5">
          <Image
            src={'/static/logo.webp'}
            width={180}
            height={37}
            alt="Accmovil Logo"
            priority
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="ml-3 mr-5">
            <DarkModeButton />
          </div>
          {userData ? <ProfileMenu data={userData} /> : <HeaderSkeleton />}
        </div>
      </header>
    </>
  )
}
