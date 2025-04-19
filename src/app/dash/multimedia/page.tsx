import Media from '@/components/media'
import NavegationPages from '@/components/navegationPages'
import { Suspense } from 'react'

export default function Multimedia() {
  return (
    <>
      <NavegationPages text="Archivos multimedia" />
      <div className="mt-10">
        <Suspense>
          <Media />
        </Suspense>
      </div>
    </>
  )
}
