'use client'
import { getAllProducts } from '@/api/products'
import Search from '@/components/UI/search'
import PlusSVG from '@/components/icons/plus'
import NavegationPages from '@/components/navegationPages'
import ProductList from '@/components/products/productList/'
import { Button } from '@nextui-org/button'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Dash() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('p')) || 1
  const search = searchParams.get('search') || ''

  const rows = 20
  const { data, isPending } = useQuery({
    queryKey: ['products', currentPage.toString(), search],
    queryFn: () =>
      getAllProducts(currentPage.toString(), rows.toString(), search),
    refetchOnWindowFocus: false,
  })
  return (
    <>
      <NavegationPages text="Ver productos" />
      <div className="dark:fill-white flex justify-between items-center mb-3">
        <Search />
        <Button
          color="primary"
          className="fill-white"
          as={Link}
          href="/dash/productos/nuevo"
        >
          Agregar Nuevo <PlusSVG size={20} />
        </Button>
      </div>
      <ProductList data={data} rows={rows} isPending={isPending} />
    </>
  )
}
