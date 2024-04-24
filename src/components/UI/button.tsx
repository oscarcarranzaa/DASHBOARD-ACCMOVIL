interface IProps {
  children: React.ReactNode
  Click: () => void
  color: 'info' | 'danger' | 'default' | 'warning' | 'success' | 'primary'
}

export default function ButtonUI({ children, Click, color }: IProps) {
  const variantClass = {
    info: 'bg-blue-600',
    danger: 'bg-red-600',
    default: 'bg-zinc-600',
    warning: 'bg-yellow-600',
    success: 'bg-green-600',
    primary: 'bg-blue-600',
  }
  return (
    <>
      <button onClick={Click} className={`${variantClass[color]} p-1`}>
        {children}
      </button>
    </>
  )
}
