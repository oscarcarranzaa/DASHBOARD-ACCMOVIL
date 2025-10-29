import { pipelineSchema } from '@/types/crm/pipeline'
import styles from '../simple/style.module.css'
import { Button } from '@heroui/react'
import { MoveRight } from 'lucide-react'
import Spinner from '@/components/icons/spinner'
import { useState } from 'react'
import { getOneLeadShema, stageHistorySchema } from '@/types/crm/leads'
import TimerStage from './timerStage'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

type TProps = {
  pipeline?: pipelineSchema
  currentStage?: string | null
  onChange?: (id: string) => void
  leadStatus: getOneLeadShema['status']
  isLoading?: boolean
  stageHistory: stageHistorySchema[] | null
  leadVisibility: getOneLeadShema['visibility']
}

export default function DetailedPipelineStages({
  pipeline,
  currentStage,
  stageHistory,
  isLoading,
  onChange,
  leadVisibility,
  leadStatus,
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

  const findHistoryStage = stageHistory?.find(
    (idx) => idx.stageId === findCurrentStage?.id
  )

  const activeIndex = pipeline.stages.findIndex((p) => p.id === currentStage)

  const isDisabled = isLoading || leadVisibility !== 'ACTIVE'

  return (
    <>
      <div className={`flex w-full max-w-full grow`}>
        {pipeline.stages.map((stage, index) => {
          const findTime = stageHistory?.find((id) => id.stageId === stage.id)

          const totalTime = findTime ? findTime.totalTimeSpent : 0

          // Se obtiene el tiempo total desde que el lead entró al stage
          const secondsSinceEntered = findTime?.enteredAt
            ? dayjs().diff(findTime.enteredAt, 'seconds')
            : 0

          // Si el stage es el actual y el lead está activo, se calcula el tiempo desde que entró
          const isSecondEntered =
            currentStage === stage.id && leadStatus === 'ACTIVE'
              ? secondsSinceEntered
              : 0

          // Si el stage es el actual y el lead está activo, se suma el tiempo actual
          const totalTimeFromNow = isSecondEntered + totalTime

          const dur = dayjs.duration(totalTimeFromNow, 'seconds')

          return (
            <div key={stage.id} className={`flex grow ${styles.box_content}`}>
              <Button
                onPress={() => {
                  if (stage.id === currentStage) return
                  handleChange(stage.id)
                }}
                isDisabled={isDisabled}
                className={`${index === 0 ? styles.first_stage_selector : styles.stage_selector} ${styles.box_content} ${leadStatus !== 'ACTIVE' ? 'opacity-30' : ''} ${index <= activeIndex ? (leadStatus === 'LOST' ? 'bg-danger-600' : 'bg-green-600') : ''}`}
              >
                <div className="absolute">
                  {isLoading && stage.id === savingStageId ? (
                    <Spinner size={18} fill="#fff" />
                  ) : (
                    <p className="text-tiny">{`${dur.days()} días`}</p>
                  )}
                </div>
              </Button>
              <div className={styles.card_tooltip}>
                <div className="bg-gray-50 border dark:bg-zinc-800 dark:border-zinc-700 border-zinc-300 px-2 py-1 rounded-lg shadow-xl">
                  <p className="text-xs min-w-full text-center whitespace-nowrap">
                    {stage.name}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-xs mt-2 flex flex-wrap flex-row gap-1 items-center">
        <p>{pipeline.name}</p>
        <div className="flex items-center gap-1">
          <MoveRight size={14} />
          <p>{findCurrentStage?.name}</p>
          {leadStatus === 'ACTIVE' && !isLoading && findHistoryStage && (
            <>
              <p>•</p>
              <p>Tiempo: </p>
              <TimerStage
                initDate={findHistoryStage.enteredAt}
                totalTimeSpent={findHistoryStage.totalTimeSpent}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
