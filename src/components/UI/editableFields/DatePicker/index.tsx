import Edit from '@/components/icons/edit'
import { DatePicker, DateValue } from '@heroui/react'
import { parseDate, getLocalTimeZone } from '@internationalized/date'
import { ReactNode, useRef, useState } from 'react'
import style from '../input/field.module.css'
import WarningInfo from '@/components/icons/warningInfo'
import dayjs from 'dayjs'
import useOutsideClick from '@/hooks/useOutSideClick'

type EditableFieldProps = {
  value?: string
  onValueChange: (newValue: string | undefined) => void
  onBlur?: (newValue: string | undefined) => void
  placeholder?: string
  label?: string
  error?: string
  startContent?: ReactNode
}

export default function DatePickerField({
  value,
  onValueChange,
  onBlur,
  error,
  label = 'Haz clic para editar',
  startContent,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [internalValue, setInternalValue] = useState<DateValue | null>(
    value ? (parseDate(value) as unknown as DateValue) : null
  )
  const ref = useRef(null)
  const handleChange = (e: DateValue) => {
    setInternalValue(e)
    onValueChange(e?.toDate(getLocalTimeZone()).toISOString().split('T')[0])
  }
  const handleBlur = () => {
    setIsEditing(false)
    if (onBlur) {
      onBlur(
        internalValue?.toDate(getLocalTimeZone()).toISOString().split('T')[0]
      )
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }
  useOutsideClick(ref, () => handleBlur())
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
                <div>
                  <DatePicker
                    ref={ref}
                    value={internalValue}
                    showMonthAndYearPickers
                    onChange={(v) => {
                      if (!v) return
                      handleChange(v)
                    }}
                    autoFocus
                    variant="bordered"
                    errorMessage={error}
                    aria-label={label}
                    aria-describedby={error ? 'error-message' : undefined}
                    onKeyDown={handleKeyDown}
                  />
                </div>
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
                      {internalValue
                        ? dayjs(
                            internalValue
                              .toDate(getLocalTimeZone())
                              .toISOString()
                          ).format('DD/MM/YYYY')
                        : label}
                    </p>
                  </span>
                  <button
                    className={`flex stroke-blue-500 ${style.edit_icon_field}`}
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={18} />
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
