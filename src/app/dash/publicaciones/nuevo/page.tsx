'use client'
import NavegationPages from '@/components/navegationPages'
import PublishEditor from '@/components/publish/publishEditor/'

export default function NewPublish() {
  return (
    <>
      <NavegationPages text="Nueva publicación" />
      <PublishEditor />
    </>
  )
}
