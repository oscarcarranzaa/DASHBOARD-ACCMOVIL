'use client'
import { getDataMedias } from '@/api/media'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function getMedia() {
  const searchParams = useSearchParams()
  const pageValue = searchParams.get('pageMedia') ?? '1'
  const page = Number(pageValue) || 1
  const search = searchParams.get('searchMedia') ?? ''

  const { data } = useQuery({
    queryKey: ['medias', pageValue, search],
    queryFn: () => getDataMedias(page, 53, search),
    refetchOnWindowFocus: false,
  })
  const allMedia = data?.data
  const dataItem = allMedia
    ? allMedia.map((i) => {
        const mediaImage = i.images ? i.images[2].src : i.url
        const urlImage = i.images ? i.images[6].src : i.url
        return {
          imgURI: mediaImage,
          urlMedia: urlImage,
          name: i.title,
          id: i.mediaId,
          mediaIDItem: i._id,
        }
      })
    : null
  return { data: dataItem, totalPages: data?.totalPages }
}
