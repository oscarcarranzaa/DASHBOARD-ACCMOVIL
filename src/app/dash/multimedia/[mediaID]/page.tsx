'use client'
import { deleteMedia, editOneMedia, getOneMedia } from '@/api/media'
import ButtonBack from '@/components/buttonBack/button'
import CardImageDetails from '@/components/cards/cardImageDetails'
import DownloadSVG from '@/components/icons/download'
import FireSVG from '@/components/icons/fire'
import LinkSVG from '@/components/icons/link'
import useClipboard from '@/hooks/useClipBoard'
import { Button, Image, Input } from '@nextui-org/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IEditMedia {
  title: string
}

export default function MediaID() {
  const { isCopied, copyToClipboard } = useClipboard()
  const queryClient = useQueryClient()
  const router = useRouter()
  const param = useParams()
  const id = String(param.mediaID)
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
  const { mutate: editMutate, data: editData } = useMutation({
    mutationFn: editOneMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medias'] })
    },
  })
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
    },
  })

  useEffect(() => {
    setValue('title', data ? data.title : '')
  }, [data])

  const fileName = data?.key.split('/').pop() ?? 'Cargando'
  // si no hay datos retornamos que no hay datos
  if (isFetching) return 'Cargando...'
  if (!data) {
    router.push('/dash/multimedia')
    return 'No hay datos'
  }
  const getAvatar = data.user.avatar
  const avatar = getAvatar.images
    ? getAvatar.images[0].src
    : '/static/default-profile.png'
  const handleCopy = (string: string) => {
    return () => {
      copyToClipboard(string)
    }
  }
  const handleForm = (formData: IEditMedia) => {
    const dataMedia = {
      mediaID: data.mediaId,
      title: formData.title,
    }
    editMutate(dataMedia)
  }
  return (
    <>
      <div className="flex items-center">
        <ButtonBack />
        <h1 className="text-2xl font-semibold ml-3">Previsualizar medio</h1>
      </div>
      <div className="">
        <h2 className="text-xl mt-5 font-semibold pl-5">{fileName}</h2>
      </div>
      <div className="grid grid-cols-6 mt-2 gap-8">
        <section className="w-full col-span-3 p-5 flex justify-center">
          {data && <Image src={data.url} className="w-full" />}
        </section>
        <section className="col-span-2 pt-5">
          <h3 className="text-xl font-semibold mb-3">Editar</h3>

          <form onSubmit={handleSubmit(handleForm)}>
            <div className="flex flex-col justify-end items-end">
              <Input
                size="md"
                label={'Nombre'}
                variant="bordered"
                {...register('title')}
              />
              <div className="mt-2 flex justify-between items-center w-full">
                <p className="text-xs text-green-600">{editData}</p>
                <Button size="sm" color="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          </form>

          <h3 className="text-xl font-semibold mb-2 mt-8">Información</h3>
          <ul className="text-sm">
            <li className="pb-1">
              <span className="font-semibold">ID: </span>
              {data?.mediaId}
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
              {data?.url}
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

          <div className="w-full mt-10 border border-dashed border-zinc-400 rounded-xl min-h-32 flex justify-center items-center flex-col p-2">
            <h4 className="font-semibold">Medio subido por:</h4>
            <div className="w-16 h-16 rounded-full overflow-hidden mt-3">
              <img src={avatar} />
            </div>
            <p className="text-sm font-semibold">{data.user.name}</p>
          </div>
          <div className="mt-20 text-red-600">
            <h3 className="font-semibold text-xl ">Zona peligrosa</h3>
            <p className="text-sm text-rose-500">
              ¡Cuidado! esta acción eliminará de forma permanente este elemento,
              piénsalo 2 veces.
            </p>
            <div className="flex justify-end w-full mt-10">
              <Button
                color="danger"
                className="bg-red-600 rounded-xl focus:outline-none"
                onClick={() => mutate(data.mediaId)}
              >
                <span className=" stroke-white">
                  <FireSVG size={20} />
                </span>
                Eliminar
              </Button>
            </div>
          </div>
        </section>
        <section className="col-span-1 pt-5">
          <h3 className="text-xl font-semibold mb-3 ">Acciones</h3>
          <div>
            <Button className="w-full" onClick={handleCopy(data.url)}>
              <span className="stroke-black dark:stroke-white">
                <LinkSVG size={20} />
              </span>
              {isCopied ? 'Enlace copiado' : 'Copiar enlace'}
            </Button>
            <div className="w-full flex mt-3 ">
              <a
                href={data.url}
                download
                className="w-full bg-blue-600 flex justify-center items-center p-3 rounded-lg text-white"
                target="_blank"
              >
                <span className="stroke-white fill-white pr-1 ">
                  <DownloadSVG size={20} />
                </span>
                <p className="text-sm">Descargar</p>
              </a>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 mt-10">
            Recursos optimizados
          </h3>
          <div className="flex  flex-col-reverse">
            {data.images
              ? data.images.map((img) => {
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
        </section>
      </div>
    </>
  )
}
