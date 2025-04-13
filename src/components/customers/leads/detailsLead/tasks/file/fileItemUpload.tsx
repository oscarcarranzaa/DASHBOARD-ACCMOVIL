import { formatFileSize } from '@/utils/formatFileSize'
import { Button, CircularProgress } from '@heroui/react'
import { Upload, X } from 'lucide-react'
import { useEffect } from 'react'

type TProps = {
  id: number
  progress: number | null
  name: string
  size: number
  mimeType?: string
  isError?: boolean
  onRetry?: (key: number) => void
  onCancel?: (key: number) => void
}

export default function FileItemUpload({
  id,
  progress,
  name,
  size,
  mimeType,
  isError,
  onRetry,
  onCancel,
}: TProps) {
  const handleRetry = (key: number) => {
    if (onRetry) {
      onRetry(key)
    }
  }
  const handleCancel = (key: number) => {
    if (onCancel) {
      onCancel(key)
    }
  }
  useEffect(() => {
    if (progress === 101) {
      handleCancel(id)
    }
  }, [progress])
  console.log(progress ? progress === 100 : undefined)
  return (
    <>
      <div
        className={`flex gap-2 items-center border-2 w-56 ${isError ? 'dark:bg-[#6b1f1b] bg-[#f9d7d7]  border-[#ffb0b0] dark:border-[#ad2929]' : 'dark:bg-[#0c383c] bg-[#d7f9e6]  border-[#b0ffc0] dark:border-[#1e6352]'}   p-1 rounded-md relative`}
      >
        <div>
          {isError ? (
            <Button
              size="md"
              isIconOnly
              variant="bordered"
              color="danger"
              onPress={() => handleRetry(id)}
            >
              <Upload size={18} />
            </Button>
          ) : (
            <CircularProgress
              aria-label="Loading..."
              color="success"
              showValueLabel={true}
              size="md"
              isIndeterminate={progress ? progress === 100 : undefined}
              value={progress ?? 0}
            />
          )}
        </div>
        <div>
          <p className=" line-clamp-1 text-sm max-w-40 break-words">{name}</p>
          <div className="flex gap-1">
            <p className="text-xs">{formatFileSize(size)}</p>
            {mimeType && (
              <>
                <p className="text-xs">-</p>
                <p className="text-xs">{mimeType.toUpperCase()}</p>
              </>
            )}
          </div>
        </div>
        <div
          className={`absolute -top-1 -right-1 rounded-[50%] ${isError ? 'bg-[#bb3b3b] dark:bg-[#ec6464]' : 'bg-[#3bbb90] dark:bg-[#0a7a54]'} `}
        >
          <button
            title="Cancelar"
            disabled={progress ? progress === 100 : undefined}
            onClick={() => handleCancel(id)}
            className="w-5 h-5 rounded-[50%] flex justify-center items-center text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  )
}
