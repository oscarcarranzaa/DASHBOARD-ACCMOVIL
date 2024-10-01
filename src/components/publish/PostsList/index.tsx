'use client'

import PublishSVG from '@/components/icons/publish'
import TrashSVG from '@/components/icons/trahs'
import UserCheckSVG from '@/components/icons/userCheck'
import PostsListTarget from '@/components/publish/PostsList/targets'
import PostItem from './postItem'
import Search from '@/components/UI/search'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import PlusSVG from '@/components/icons/plus'
import { useQuery } from '@tanstack/react-query'
import { getLisPostsData } from '@/api/posts'
import { useSearchParams } from 'next/navigation'
import PaginationPage from '@/components/UI/pagination'
import { useEffect, useState } from 'react'
import SkeletonPostItem from './skeleton'
import ConvertPricePost from '../convert/prices'

export default function PostsList() {
  const [totalPages, setTotalPages] = useState(0)
  const params = useSearchParams()
  const search = params.get('search') || ''
  const currentPage = params.get('p') || '1'
  const status = params.get('status') ?? undefined
  const rows = '32'
  const { data } = useQuery({
    queryKey: ['postsLists', currentPage, rows, search, status],
    queryFn: () => getLisPostsData(currentPage, rows, search, status),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })
  useEffect(() => {
    if (data) setTotalPages(data?.totalPages)
  }, [data])
  const itemData = data && data.data
  return (
    <>
      <div className="flex gap-3 border-b border-zinc-500">
        <PostsListTarget
          title="Publicados"
          query="publish"
          icon={<PublishSVG size={24} />}
        />
        <PostsListTarget
          title="Borradores"
          query="draft"
          icon={<TrashSVG size={24} />}
        />
        <PostsListTarget
          title="Tus publicaciones"
          query="me"
          icon={<UserCheckSVG size={24} />}
        />
      </div>
      <div className="dark:fill-white flex justify-between items-center mb-3 mt-8">
        <Search />
        <Button
          color="primary"
          className="fill-white"
          as={Link}
          href="/dash/posts/nuevo"
        >
          Agregar Nuevo <PlusSVG size={20} />
        </Button>
      </div>
      <div className=" bg-white dark:bg-neutral-900 py-10 rounded-xl mt-5 px-5 flex justify-center">
        {itemData && itemData.length === 0 ? (
          <p>No se encontraron resultados...</p>
        ) : (
          <ul
            className="grid gap-x-5 gap-y-1 w-full"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            }}
          >
            {itemData
              ? itemData.map((post) => {
                  const {
                    title,
                    type,
                    gallery,
                    variations,
                    Product,
                    totalStock,
                    id,
                  } = post
                  const outStock = totalStock === 0
                  const prices = ConvertPricePost({
                    variations,
                    product: Product,
                    type,
                  })
                  return (
                    <PostItem
                      id={id}
                      price={prices?.price ? prices.price : 0}
                      discount={prices?.discount ? prices.discount : undefined}
                      porcentDiscount={
                        prices ? prices.porcentDiscount : undefined
                      }
                      name={title}
                      image={gallery[0]}
                      outStock={outStock}
                      key={id}
                    />
                  )
                })
              : Array.from({ length: 30 }).map((_, i) => (
                  <SkeletonPostItem key={i} />
                ))}
          </ul>
        )}
      </div>
      <div className=" float-right mt-10">
        {totalPages > 0 && <PaginationPage totalPages={totalPages} />}
      </div>
    </>
  )
}
