'use client'
import { getProduct } from '@/api/request'
import { useEffect } from 'react'

export default function Dash() {
  useEffect(() => {
    const product = getProduct().then((data) => console.log(data, 'hhh'))
  }, [])
  return (
    <>
      <div>Desde el dash</div>
    </>
  )
}
