import CheckSVG from '@/components/icons/check'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

export default function EmbedVideo() {
  const [url, setUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [video, setVideo] = useState<string>('')
  const [videoType, setVideoType] = useState<string>('')

  const handleVideo = async () => {
    if (url === '') {
      setError('Debes ingresar un enlace')
      return
    }
    if (video.length > 1) {
      setVideo('')
      setVideoType('')
      setVideo('')
      setUrl('')
      return
    }

    const videoId = getVideoId(url)
    if (videoId) {
      setVideo(videoId.split('&')[0])
      setVideoType('youtube')
      setError('')
    } else {
      setError('El enlace no es válido')
    }
  }

  const getVideoId = (url: string) => {
    const youtube =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
    const youtubeMatch = url.match(youtube)
    console.log(youtubeMatch)
    if (youtubeMatch) {
      return youtubeMatch[1]
    }
    return null
  }
  return (
    <>
      <p className="mt-5">Video gallery</p>
      <div className="p-2 dark:bg-zinc-800 bg-white mt-1 rounded-md">
        <div className="w-full ">
          <Input
            variant="bordered"
            label="Enlace del video"
            value={url}
            isInvalid={error ? true : false}
            onChange={(e) => {
              setUrl(e.target.value)
              handleVideo
            }}
            errorMessage={error}
          />
          <Button
            onClick={handleVideo}
            className="w-full mt-2 rounded-md"
            color={
              video.length > 1 ? 'danger' : url === '' ? 'default' : 'primary'
            }
            disabled={url === ''}
          >
            {video.length > 1 ? 'Eliminar' : 'Cargar video'}
          </Button>
        </div>
        <div className={video ? 'block mt-3' : 'hidden  '}>
          <div className="w-full aspect-video">
            {videoType === 'youtube' && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video}`}
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
