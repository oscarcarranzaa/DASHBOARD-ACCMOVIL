import { pipelineSchema } from '@/types/crm/pipeline'
import styles from '../simple/style.module.css'
import { Button } from '@heroui/react'
import { MoveRight } from 'lucide-react'
import Spinner from '@/components/icons/spinner'
import { useState } from 'react'
import { getOneLeadShema, stageHistorySchema } from '@/types/crm/leads'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import timerCountStage from '@/utils/crm/timerCountStage'

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

// Función helper para calcular el tiempo total de una etapa
const calculateStageTime = (
  stageHistory: stageHistorySchema | undefined,
  isCurrentStage: boolean,
  leadStatus: getOneLeadShema['status']
): number => {
  if (!stageHistory) return 0

  const totalTimeSpent = stageHistory.totalTimeSpent || 0

  // Si la etapa ya fue cerrada (tiene exitedAt), retornar el tiempo guardado
  if (stageHistory.exitedAt) {
    return totalTimeSpent
  }

  // Si es la etapa actual y el lead está activo, sumar el tiempo transcurrido
  if (isCurrentStage && leadStatus === 'ACTIVE' && stageHistory.enteredAt) {
    const secondsSinceEntered = dayjs().diff(stageHistory.enteredAt, 'seconds')
    return totalTimeSpent + secondsSinceEntered
  }

  // En cualquier otro caso, retornar el tiempo congelado
  return totalTimeSpent
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

  const { days, hours, minutes, seconds } = timerCountStage({
    initDate: findHistoryStage?.enteredAt,
    totalTimeSpent: findHistoryStage?.totalTimeSpent,
    interval: 1000,
  })

  const activeIndex = pipeline.stages.findIndex((p) => p.id === currentStage)
  const isDisabled = isLoading || leadVisibility !== 'ACTIVE'

  return (
    <>
      <div className={`flex w-full max-w-full grow`}>
        {pipeline.stages.map((stage, index) => {
          const stageHistoryItem = stageHistory?.find(
            (h) => h.stageId === stage.id
          )
          const isCurrentStage = currentStage === stage.id

          // Calcular el tiempo total para esta etapa
          const totalTimeInSeconds = calculateStageTime(
            stageHistoryItem,
            isCurrentStage,
            leadStatus
          )

          const dur = dayjs.duration(totalTimeInSeconds, 'seconds')
          const stageDays = Math.floor(dur.asDays())
          const stageHours = dur.hours()
          const stageMinutes = dur.minutes()
          const stageSeconds = dur.seconds()

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
                    <p className="text-tiny">{`${stageDays} días`}</p>
                  )}
                </div>
              </Button>
              <div className={styles.card_tooltip}>
                <div className="bg-gray-50 border dark:bg-zinc-800 dark:border-zinc-700 border-zinc-300 px-2 py-1 rounded-lg shadow-xl">
                  <p className="text-xs min-w-full text-center whitespace-nowrap">
                    {stage.name}
                  </p>
                  {/* Mostrar tiempo detallado en el tooltip */}
                  {totalTimeInSeconds > 0 ? (
                    <p className="text-[10px] text-center text-gray-600 dark:text-gray-400 mt-1">
                      He estado aquí por{' '}
                      {stageDays > 0 && <span>{stageDays}d </span>}
                      <span>{String(stageHours).padStart(2, '0')}:</span>
                      <span>{String(stageMinutes).padStart(2, '0')} min </span>
                      <span> {String(stageSeconds).padStart(2, '0')} seg</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-center text-gray-600 dark:text-gray-400 mt-1">
                      Este negocio no ha pasado por esta etapa
                    </p>
                  )}
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
              <div>
                {days > 0 && <span>{days}d </span>}
                <span>{String(hours).padStart(2, '0')}:</span>
                <span>{String(minutes).padStart(2, '0')} min</span>
                <span> {String(seconds).padStart(2, '0')} seg</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
