'use client'
import NavegationPages from '@/components/navegationPages'
import PostsList from '@/components/publish/PostsList'

export default function Posts() {
  return (
    <>
      <NavegationPages text="Ver posts" />
      <PostsList />
    </>
  )
}
