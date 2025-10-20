import { pipelineSchema } from '@/types/crm/pipeline'
import styles from './style.module.css'
import { Button } from '@heroui/react'
import { MoveRight } from 'lucide-react'
import Spinner from '@/components/icons/spinner'
import { useState } from 'react'
import { getOneLeadShema } from '@/types/crm/leads'

type TProps = {
  pipeline?: pipelineSchema
  currentStage: string
  onChange?: (id: string) => void
  leadStatus: getOneLeadShema['status']
  leadVisibility: getOneLeadShema['visibility']
  isLoading?: boolean
}

export default function SimplePipelineStages({
  pipeline,
  currentStage,
  isLoading,
  leadStatus,
  leadVisibility,
  onChange,
}: TProps) {
  const [savingStageId, setSavingStageId] = useState('')
  if (!pipeline) return null
  const findCurrentStage = pipeline.stages.find((p) => p.id === currentStage)
  const handleChange = (id: string) => {
    if (onChange) {
      onChange(id)
      setSavingStageId(id)
    }
  }
  const isDisabled = isLoading || leadVisibility !== 'ACTIVE'
  return (
    <>
      <div className={`flex w-full max-w-full grow`}>
        {pipeline.stages.map((stage, index) => {
          const activeIndex = pipeline.stages.findIndex(
            (p) => p.id === currentStage
          )

          return (
            <div key={stage.id} className={`flex grow ${styles.box_content}`}>
              <Button
                onPress={() => {
                  if (stage.id === currentStage) return
                  handleChange(stage.id)
                }}
                isDisabled={isDisabled}
                color={index <= activeIndex ? 'success' : 'default'}
                className={`${index === 0 ? styles.first_stage_selector : styles.stage_selector} ${styles.box_content} ${leadStatus !== 'ACTIVE' ? 'opacity-30' : ''} ${index <= activeIndex ? (leadStatus === 'LOST' ? 'bg-danger-600' : 'bg-green-600') : ''}`}
              >
                <div className=" absolute">
                  {isLoading && stage.id === savingStageId && (
                    <Spinner size={18} fill="#fff" />
                  )}
                </div>
              </Button>
              <div className={styles.card_tooltip}>
                <div className="bg-gray-50 border dark:bg-zinc-800 dark:border-zinc-700 border-zinc-300 px-2 py-1 rounded-lg shadow-xl ">
                  <p className="text-xs min-w-full text-center whitespace-nowrap">
                    {stage.name}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-xs mt-2 flex flex-wrap flex-row gap-1  items-center">
        <p>{pipeline.name}</p>
        <div className="flex items-center gap-1">
          <MoveRight size={14} />
          <p>{findCurrentStage?.name}</p>
        </div>
      </div>
    </>
  )
}
