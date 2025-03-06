import CheckSVG from '@/components/icons/check'
import { usePublishStore } from '@/store/publish'
import { Button, Input } from '@heroui/react'
import { useEffect, useState } from 'react'

export default function EmbedVideo() {
  const youtubeVideoId = usePublishStore((store) => store.youtubeVideoId)
  const setVideo = usePublishStore((store) => store.setVideo)
  const defaultUrl = youtubeVideoId
    ? 'https://www.youtube.com/watch?v=' + youtubeVideoId
    : ''

  const [videoID, setVideoID] = useState<string | null>()
  const [url, setUrl] = useState<string>(defaultUrl)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setVideoID(youtubeVideoId)
    setUrl(defaultUrl)
  }, [youtubeVideoId])

  const handleVideo = async () => {
    if (url === '') {
      setError('Debes ingresar un enlace')
      return
    }
    if (youtubeVideoId && youtubeVideoId.length > 1) {
      setVideo('')
      setUrl('')
      return
    }

    const videoId = getVideoId(url)
    if (videoId) {
      setVideo(videoId.split('&')[0])
      setError('')
    } else {
      setError('El enlace no es válido')
    }
  }

  const getVideoId = (url: string) => {
    const youtube =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
    const youtubeMatch = url.match(youtube)

    if (youtubeMatch) {
      return youtubeMatch[1]
    }
    return null
  }

  return (
    <>
      <p className="mt-5">Video de YouTube</p>
      <div className="p-2 dark:bg-zinc-800 bg-white mt-1 rounded-xl">
        <div className="w-full ">
          <Input
            variant="bordered"
            label="Enlace del video"
            placeholder="Pega el enlace del video de YouTube"
            value={url}
            isInvalid={error ? true : false}
            onChange={(e) => {
              setUrl(e.target.value)
              handleVideo
            }}
            errorMessage={error}
          />
          <Button
            onPress={handleVideo}
            className="w-full mt-2 rounded-md"
            color={
              youtubeVideoId && youtubeVideoId.length > 1
                ? 'danger'
                : url === ''
                  ? 'default'
                  : 'primary'
            }
            disabled={url === ''}
          >
            {youtubeVideoId && youtubeVideoId.length > 1
              ? 'Eliminar'
              : 'Cargar video'}
          </Button>
        </div>
        <div className={youtubeVideoId ? 'block mt-3' : 'hidden  '}>
          <div className="w-full aspect-video">
            {videoID && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              ></iframe>
            )}
          </div>
          <div className="flex items-center dark:stroke-zinc-400 stroke-zinc-600 dark:text-zinc-400 text-zinc-600">
            <CheckSVG size={16} />
            <p className="text-sm">Tu vídeo aparecerá en la galería</p>
          </div>
        </div>
      </div>
    </>
  )
}
