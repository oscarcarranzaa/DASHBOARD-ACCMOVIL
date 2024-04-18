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
          <div key={index} className="mb-2">
            <p className=" text-sm hover:text-sky-600">{i.name}</p>
          </div>
        )
      })}
    </>
  )
}
