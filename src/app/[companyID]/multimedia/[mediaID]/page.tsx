'use client'
import { deleteMedia, editOneMedia, getOneMedia } from '@/api/media'
import CardImageDetails from '@/components/cards/cardImageDetails'
import DownloadSVG from '@/components/icons/download'
import FireSVG from '@/components/icons/fire'
import LinkSVG from '@/components/icons/link'
import useClipboard from '@/hooks/useClipBoard'
import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Input,
} from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NavegationPages from '@/components/navegationPages'
import { toast } from 'sonner'
import SendSVG from '@/components/icons/send'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Settings from '@/components/icons/settings'

interface IEditMedia {
  title: string
}
const ZMediaName = z.object({
  title: z.string().min(3, { message: 'Nombre muy corto (min: 3)' }),
})

export default function MediaID() {
  const { isCopied, copyToClipboard } = useClipboard()
  const queryClient = useQueryClient()
  const router = useRouter()
  const param = useParams()
  const id = param.mediaID.toString()
  const { data, isFetching } = useQuery({
    queryKey: ['oneMedia'],
    queryFn: () => getOneMedia(id),
    refetchOnWindowFocus: false,
  })
  const { mutate } = useMutation({
    mutationFn: deleteMedia,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['medias'] })
      router.push('/dash/multimedia')
      console.log(data)
    },
  })
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isDirty, errors },
  } = useForm<z.infer<typeof ZMediaName>>({
    resolver: zodResolver(ZMediaName),
    defaultValues: {
      title: '',
    },
  })

  const { mutate: editMutate } = useMutation({
    mutationFn: editOneMedia,
    onSuccess: (da) => {
      queryClient.invalidateQueries({ queryKey: ['medias'] })
      reset({ title: getValues('title') })
      toast.success(da ?? 'Nombre actualizado')
    },
    onError: () => {
      toast.error('Ocurrio un error')
    },
  })

  useEffect(() => {
    setValue('title', data ? data.title : '')
  }, [data, setValue])

  const fileName = data?.title ?? 'Medios'
  // si no hay datos retornamos que no hay datos
  if (isFetching) return 'Cargando...'
  if (!data) {
    router.push('/dash/multimedia')
    return 'No hay datos'
  }
  const avatar = data.user.avatar
    ? data.user.avatar
    : '/static/default-profile.png'
  const handleCopy = (string: string) => {
    return () => {
      copyToClipboard(string)
    }
  }
  const handleForm = (formData: IEditMedia) => {
    const dataMedia = {
      mediaID: data.id,
      title: formData.title,
    }
    if (isDirty) {
      editMutate(dataMedia)
    }
  }
  return (
    <>
      <NavegationPages text="Previsualizar medio" />
      <h2 className="text-xl mt-5 font-semibold pl-5">{fileName}</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 mt-2 gap-8">
        <section className="w-full col-span-3 p-5 justify-center">
          {data && (
            <Image
              src={data.url}
              className="w-full"
              alt="Imagen del medio"
              isBlurred
            />
          )}
        </section>
        <section className="col-span-3 pt-5 max-w-2xl">
          <form onSubmit={handleSubmit(handleForm)}>
            <div className="flex gap-4   justify-center">
              <Input
                size="md"
                label="Editar Nombre"
                variant="bordered"
                className="w-full"
                placeholder="Ingrese el nombre"
                labelPlacement="outside"
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                {...register('title')}
              />
              <div className="mt-6">
                <Button
                  color={isDirty ? 'primary' : 'default'}
                  type="submit"
                  disabled={!isDirty}
                >
                  <div className=" stroke-white">
                    <SendSVG size={24} />
                  </div>
                </Button>
              </div>
            </div>
          </form>
          <section className="col-span-1 pt-5">
            <div className="flex gap-5">
              <Button className="w-full" onClick={handleCopy(data.url)}>
                <span className="stroke-black dark:stroke-white">
                  <LinkSVG size={20} />
                </span>
                {isCopied ? 'Enlace copiado' : 'Copiar enlace'}
              </Button>
              <div className="w-full flex ">
                <a
                  href={data.url}
                  download
                  className="w-full bg-blue-600 flex justify-center items-center p-2 rounded-xl text-white"
                  target="_blank"
                >
                  <span className="stroke-white fill-white  ">
                    <DownloadSVG size={20} />
                  </span>
                  <p className="text-sm">Descargar</p>
                </a>
              </div>
            </div>
          </section>
          <h3 className=" font-medium mb-2 mt-8">Información</h3>
          <ul className="text-sm">
            <li className="pb-1">
              <span className="font-semibold">ID: </span>
              {data?.id}
            </li>
            <li className="pb-1">
              <span className="font-semibold">Nombre: </span>
              {data?.title}
            </li>
            <li className="pb-1">
              <span className="font-semibold">Nombre del archivo: </span>
              {fileName}
            </li>
            <li className="pb-1">
              <span className="font-semibold pr-1">URL:</span>
              <a
                href={data?.url ?? '#'}
                target="_blank"
                className="hover:underline text-primary line-clamp-1"
              >
                {data?.url}
              </a>
            </li>
            <li className="pb-1">
              <span className="font-semibold">Tamaño: </span>
              {data?.size ? Math.round(data.size / 1024) : ''} KB
            </li>
            <li className="pb-1">
              <span className="font-semibold">Tipo: </span>
              {data?.type}
            </li>
            <li className="pb-1">
              <span className="font-semibold">Subido: </span>
              {data?.createdAt
                ? dayjs(data.createdAt).format('DD/MM/YYYY hh:mm a')
                : ''}
            </li>
          </ul>
          <h3 className=" font-medium mb-3 mt-10">Recursos optimizados</h3>
          <div className="grid grid-cols-2 gap-1 gap-x-3 ">
            {data.qualities
              ? data.qualities.map((img) => {
                  return (
                    <CardImageDetails
                      url={img.src}
                      key={img.key}
                      width={img.width}
                      height={img.height}
                    />
                  )
                })
              : 'No se encontraron resultados'}
          </div>
          <div className="w-full mt-10 border border-dashed border-zinc-400 rounded-xl min-h-32 flex justify-center items-center flex-col p-2">
            <h4 className="font-semibold">Medio subido por:</h4>
            <div className="w-16 h-16 rounded-full overflow-hidden mt-3">
              <img src={avatar} />
            </div>
            <p className="text-sm font-semibold">{data.user.firstName}</p>
          </div>
          <div className="dark:fill-zinc-200 mt-10 mb-20 ">
            <Accordion variant="bordered" itemClasses={{ title: 'text-sm' }}>
              <AccordionItem
                title="Ajustes"
                startContent={<Settings size={18} />}
                key={1}
              >
                <div className="mt-5 text-red-600">
                  <h3 className="font-semibold text-xl ">Zona peligrosa</h3>
                  <p className="text-sm text-rose-500">
                    ¡Cuidado! esta acción eliminará de forma permanente este
                    elemento, piénsalo 2 veces.
                  </p>
                  <div className="flex justify-end w-full mt-10">
                    <Button
                      color="danger"
                      className="bg-red-600 rounded-xl focus:outline-none"
                      onClick={() => mutate(data.id)}
                    >
                      <span className=" stroke-white">
                        <FireSVG size={20} />
                      </span>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </>
  )
}
