import CloudSVG from '../../icons/cloud'

export default function DragFiles() {
  return (
    <>
      <div
        className=" pointer-events-none w-full h-screen flex items-center justify-center flex-col dark:text-white bg-[var(--box-opacity)]"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <div className=" dark:fill-zinc-200 -mt-10">
          <CloudSVG size={100} />
        </div>
        <h4 className="text center  text-lg font-semibold mt-5">
          Suelte los archivos para subir
        </h4>
        <p className="text-sm ">Solo se aceptan imágenes :)</p>
      </div>
    </>
  )
}
