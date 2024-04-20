import Link from 'next/link'

interface IProps {
  items: {
    name: string
    href: string
  }[]
}

export default function MenuItems({ items }: IProps) {
  return (
    <>
      {items.map((i, index) => {
        return (
          <Link key={index} href={i.href} className="mt-2 mb-1">
            <p className=" text-sm hover:text-sky-600 p-2">{i.name}</p>
          </Link>
        )
      })}
    </>
  )
}
