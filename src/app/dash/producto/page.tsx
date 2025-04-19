'use client'
import NavegationPages from '@/components/navegationPages'
import PostsList from '@/components/publish/PostsList'
import { Suspense } from 'react'

export default function Posts() {
  return (
    <>
      <NavegationPages text="Ver productos" />
      <Suspense>
        <PostsList />
      </Suspense>
    </>
  )
}
