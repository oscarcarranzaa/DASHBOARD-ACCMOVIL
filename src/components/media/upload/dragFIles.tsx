import CloudSVG from '../../icons/cloud'

export default function DragFiles() {
  return (
    <>
      <div
        className=" pointer-events-none w-full h-screen flex items-center justify-center flex-col text-white"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
      >
        <div className=" fill-zinc-200 -mt-10">
          <CloudSVG size={100} />
        </div>
        <h4 className="text center  text-lg font-semibold mt-5">
          Suelte los archivos para subir
        </h4>
        <p className="text-sm text-zinc-300">Solo se aceptan imágenes :)</p>
      </div>
    </>
  )
}
