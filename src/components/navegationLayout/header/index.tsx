'use client'
import Image from 'next/image'
import ProfileMenu from './profileMenu'
import HeaderSkeleton from './skeleton/skeletonLoader'
import DarkModeButton from './darkMode'
import useUserInfo from '@/hooks/useUserInfo'
import Link from 'next/link'
import SearchAllHeader from './search'
export default function Header() {
  const { userData } = useUserInfo()

  return (
    <>
      <header className="p-3 bg-white fixed z-50 w-full dark:bg-[#131315] flex justify-between border-b flex-nowrap border-gray-300 dark:border-zinc-600">
        <div className="ml-5 flex items-center min-w-[200px]">
          <Link href={'/dash/dashboard'}>
            <Image
              src={'/static/logo.webp'}
              width={180}
              height={37}
              alt="Accmovil Logo"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center justify-center w-full z-50">
          <div className=" min-w-[250px] relative max-w-[800px] w-full md:w-6/12 lg:w-5/12">
            <SearchAllHeader />
          </div>
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
