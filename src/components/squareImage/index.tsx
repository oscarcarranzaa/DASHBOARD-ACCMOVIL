type TProps = {
  src: string
}

export default function SquareImage({ src }: TProps) {
  return (
    <div
      className=" rounded-md  overflow-hidden relative bg-zinc-200 dark:bg-zinc-800"
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
            src={src}
            loading="lazy"
            decoding="async"
            alt="Imagen de covertor"
            className="  rounded-md w-full  h-full object-contain m-auto"
          />
        </picture>
      </div>
    </div>
  )
}
