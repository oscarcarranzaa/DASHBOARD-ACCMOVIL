'use client'
import Media from '@/components/media'
import NavegationPages from '@/components/navegationPages'

export default function Multimedia() {
  return (
    <>
      <NavegationPages text="Multimedia" />
      <div className="mt-10">
        <Media />
      </div>
    </>
  )
}
