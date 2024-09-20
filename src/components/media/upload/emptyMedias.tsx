export default function EmptyMedia() {
  return (
    <>
      <div className=" border-dashed border-3 dark:border-zinc-500 flex justify-center py-36 select-none">
        <div>
          <picture>
            <img
              className=" w-60"
              src="/static/upload-file.webp"
              alt="upload file"
            />
          </picture>
          <div className="mt-5">
            <p className=" font-semibold">Comienza subiendo imágenes...</p>
            <p className=" text-center text-sm">Arrastralas hasta aquí</p>
          </div>
        </div>
      </div>
    </>
  )
}
