'use client'

import { useTheme } from 'next-themes'
import MoonSVG from '@/components/icons/moon'
import LightSVG from '@/components/icons/light'
import { useEffect, useState } from 'react'
import Spinner from '@/components/icons/spinner'

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const icon = theme === 'dark' ? <LightSVG size={24} /> : <MoonSVG size={24} />
  const setIcon = mounted ? (
    icon
  ) : (
    <div className=" animate-spin">
      <Spinner size={24} fill="#777" />
    </div>
  )
  return (
    <>
      <button
        onClick={handleTheme}
        title="Modo oscuro"
        className="fill-black stroke-black dark:fill-zinc-300 dark:stroke-zinc-300 hover:bg-slate-100 p-3 rounded-full dark:hover:bg-zinc-700"
      >
        {setIcon}
      </button>
    </>
  )
}
