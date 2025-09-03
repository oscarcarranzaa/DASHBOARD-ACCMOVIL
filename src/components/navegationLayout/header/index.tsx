'use client'
import Image from 'next/image'
import ProfileMenu from './profileMenu'
import HeaderSkeleton from './skeleton/skeletonLoader'
import DarkModeButton from './darkMode'
import useUserInfo from '@/hooks/useUserInfo'
import Link from 'next/link'
import SearchAllHeader from './search'
import { cn } from '@/lib/utils'
import { AnimatedGradientText } from '@/components/UI/effects/animateGradientText'
import { ChevronRight } from 'lucide-react'

export default function Header() {
  const { userData } = useUserInfo()

  return (
    <>
      <header className="p-3 bg-white fixed z-50 w-full dark:bg-[#131315] flex justify-between border-b flex-nowrap border-gray-300 dark:border-zinc-600">
        <div className="ml-5 flex items-center">
          <div className="min-w-[200px]">
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
          <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
            <span
              className={cn(
                'absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]'
              )}
              style={{
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitClipPath: 'padding-box',
              }}
            />

            <AnimatedGradientText className="text-sm font-medium">
              BETA
            </AnimatedGradientText>
          </div>
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
