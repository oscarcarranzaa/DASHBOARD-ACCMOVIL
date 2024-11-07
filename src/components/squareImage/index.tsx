type TProps = {
  src?: string
  isDisabled?: boolean
}

export default function SquareImage({ src, isDisabled }: TProps) {
  const image = src ?? '/static/image-not-found.webp'
  return (
    <div
      className=" rounded-md  overflow-hidden relative "
      style={{ paddingTop: '100%' }}
    >
      <div
        className=" absolute h-full w-full overflow-hidden flex items-center justify-center"
        style={{
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
        }}
      >
        <picture>
          <img
            src={image}
            loading="lazy"
            decoding="async"
            alt="Imagen de covertor"
            className={`rounded-md w-full  h-full object-contain m-auto ${isDisabled && 'grayscale'}`}
          />
        </picture>
      </div>
    </div>
  )
}
