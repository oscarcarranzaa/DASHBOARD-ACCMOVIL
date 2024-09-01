import { newTerm } from '@/api/attributes'
import Spinner from '@/components/icons/spinner'
import SelectImage from '@/components/media/selectImage'
import { IUploads } from '@/types'
import { newTermSchema, ZNewTerm } from '@/types/attributes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type TProps = {
  type: 'image' | 'colors' | 'option'
  id: string
}
export default function FormTerms({ type, id }: TProps) {
  const [image, setImage] = useState<IUploads[]>()
  const [colorType, setColorType] = useState<string>('color')
  const queryClient = useQueryClient()
  const defaultValues = {
    name: '',
    option: '',
    slug: '',
    colors: [],
  }
  const { handleSubmit, control, reset, setValue } = useForm<newTermSchema>({
    resolver: zodResolver(ZNewTerm),
    defaultValues,
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: newTerm,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['oneAtt', id] })
      reset()
    },
  })
  useEffect(() => {
    setValue('image', image ? image[0].mediaIDItem : undefined)
  }, [image, setValue])
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColorType(e.target.value)
  }
  const submitTerm = (termData: newTermSchema) => {
    mutate({ formData: termData, id: id })
  }
  return (
    <>
      <p className="mb-3 text-lg font-semibold">Crear nuevo término</p>
      <form onSubmit={handleSubmit(submitTerm)}>
        <div className="p-5 rounded-xl dark:bg-zinc-900 bg-white dark:border-zinc-600 border-zinc-300 border flex flex-col gap-5">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nombre del término"
                label="Nombre"
                variant="bordered"
                isRequired
                required
              />
            )}
          />
          {type === 'option' && (
            <Controller
              name="option"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nombre de la opción"
                  label="Opción"
                  variant="bordered"
                  isRequired
                  required
                />
              )}
            />
          )}
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Slug URL"
                label="Slug"
                name="slug"
                variant="bordered"
              />
            )}
          />
          {type === 'image' && (
            <div className="max-w-40">
              <p className="text-sm dark:text-zinc-300 text-zinc-600 mb-1">
                Imagen (obligatorio)
              </p>
              <SelectImage iconSize={100} setValue={setImage} />
            </div>
          )}
          {type === 'colors' && (
            <>
              <div>
                <p className="text-sm dark:text-zinc-300 text-zinc-600 pl-1 mb-1">
                  Color
                </p>
                <Select
                  onChange={handleSelectionChange}
                  selectedKeys={[colorType]}
                  label="Tipo de color"
                >
                  <SelectItem key="color">Color</SelectItem>
                  <SelectItem key="bicolor">Bicolor</SelectItem>
                </Select>
                <div className="flex mt-5 gap-2">
                  <Controller
                    name="colors.0"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="color"
                        className=" w-20 rounded-full"
                      />
                    )}
                  />

                  {colorType === 'bicolor' && (
                    <Controller
                      name="colors.1"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="color"
                          className=" w-20 rounded-full"
                        />
                      )}
                    />
                  )}
                </div>
              </div>
            </>
          )}
          <div>
            <Button color="primary" type="submit" className="w-full mt-5">
              {isPending ? (
                <div className=" animate-spin">
                  <Spinner size={24} fill="#fff" />
                </div>
              ) : (
                'Crear término'
              )}
            </Button>
            {error && (
              <p className="text-sm font-semibold text-red-600 mt-1">
                {error.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  )
}
