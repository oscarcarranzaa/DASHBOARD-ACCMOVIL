'use client'

import { userData } from '@/api/userData'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import ProfileMenu from './profileMenu'
import HeaderSkeleton from './skeleton/skeletonLoader'

export default function Header() {
  const { data, isPending, isLoading, status, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: userData,
    retry: false,
  })
  console.log(isPending, 'jjjjj', data, isLoading, isFetching)

  return (
    <>
      <header className="p-3 bg-white flex justify-between border-b border-gray-300">
        <div className="ml-5">
          <Image
            src={'/static/logo.webp'}
            width={180}
            height={37}
            alt="Accmovil Logo"
            priority
          />
        </div>
        {data && !isPending ? <ProfileMenu data={data} /> : <HeaderSkeleton />}
      </header>
    </>
  )
}
