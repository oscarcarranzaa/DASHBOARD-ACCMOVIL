'use client'
import ButtonBack from './button'
interface IProps {
  text: string
}
export default function NavegationPages({ text }: IProps) {
  return (
    <>
      <div className="flex items-center mb-10">
        <ButtonBack />
        <div>
          <h2 className="text-xl font-semibold ml-2 line-clamp-1">{text}</h2>
        </div>
      </div>
    </>
  )
}
