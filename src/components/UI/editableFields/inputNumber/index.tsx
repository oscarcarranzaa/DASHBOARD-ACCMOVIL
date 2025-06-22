import Edit from '@/components/icons/edit'
import { Input, NumberInput, Spinner } from '@heroui/react'
import { ReactNode, useState } from 'react'
import style from '../input/field.module.css'
import WarningInfo from '@/components/icons/warningInfo'

type EditableFieldProps = {
  value?: number
  onValueChange: (newValue: number | undefined) => void
  onBlur?: (newValue: number | undefined) => void
  type?: 'number'
  placeholder?: string
  label?: string
  error?: string
  startContent?: ReactNode
  isRequired?: boolean
  isPending?: boolean
}

export default function NumberInputField({
  value,
  onValueChange,
  onBlur,
  type = 'number',
  placeholder,
  error,
  label = 'Haz clic para editar',
  startContent,
  isPending,
  isRequired,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [internalValue, setInternalValue] = useState<number | undefined>(value)

  const handleChange = (e: number) => {
    setInternalValue(e)
    onValueChange(e)
  }
  const handleBlur = () => {
    setIsEditing(false)
    if (onBlur) {
      onBlur(internalValue)
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }
  return (
    <>
      <div
        style={{ marginTop: '0.6rem' }}
        title="Editar campo"
        className="flex items-center"
      >
        <button
          onClick={() => setIsEditing(true)}
          className="dark:stroke-white stroke-black mr-2 flex-none"
        >
          {startContent}
        </button>
        <div className={isEditing ? 'w-full' : ''}>
          <label>
            <div className={`flex items-center ${style.fiel_contaier}`}>
              {isEditing ? (
                <NumberInput
                  size="sm"
                  isRequired={isRequired}
                  isDisabled={isPending}
                  type={type}
                  value={internalValue}
                  onValueChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                  classNames={{
                    innerWrapper: ['px-0'],
                    inputWrapper: ['px-0'],
                    input: ['px-3'],
                  }}
                  className="min-h-10"
                  labelPlacement="outside"
                  variant="bordered"
                  errorMessage={error}
                  placeholder={placeholder}
                  aria-label={label}
                  aria-describedby={error ? 'error-message' : undefined}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <>
                  <span
                    onClick={() => setIsEditing(true)}
                    className={`border-b border-dashed ${error ? 'border-red-500' : 'border-zinc-500'}`}
                    style={{ cursor: 'pointer', padding: '0.6rem' }}
                  >
                    <p
                      className={`${!error ? 'text-blue-500' : 'text-red-500'} line-clamp-2 text-sm`}
                    >
                      {internalValue || label}
                    </p>
                  </span>

                  <button
                    className={`flex stroke-blue-500 ${!isPending ? style.edit_icon_field : ''}`}
                    onClick={() => setIsEditing(true)}
                  >
                    {isPending ? (
                      <Spinner variant="dots" size="sm" className="w-4 h-4" />
                    ) : (
                      <Edit size={18} />
                    )}
                  </button>
                </>
              )}
            </div>
          </label>
          {error && (
            <div
              id="error-message"
              className="flex items-center stroke-red-500 mt-1"
            >
              <span>
                <WarningInfo size={16} />
              </span>
              <p className="text-xs ml-1 text-red-500"> {error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
