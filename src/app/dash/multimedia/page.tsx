import Media from '@/components/media'
import NavegationPages from '@/components/navegationPages'

export default function Multimedia() {
  return (
    <>
      <NavegationPages text="Archivos multimedia" />
      <div className="mt-10">
        <Media />
      </div>
    </>
  )
}
