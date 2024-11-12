export const ORDER_STATUS = [
  { key: 'pending', label: 'PENDIENTE' },
  { key: 'processing', label: 'PROCESANDO' },
  { key: 'completed', label: 'COMPLETADO' },
  { key: 'cancelled', label: 'CANCELADO' },
  { key: 'refund', label: 'REEMBOLSADO' },
  { key: 'failed', label: 'FALLIDO' },
]
const keys = [
  'pending',
  'processing',
  'completed',
  'cancelled',
  'refund',
  'failed',
]

const disabledKeysMap: Record<string, string[]> = {
  completed: keys.filter((k) => k !== 'refund'),
  refund: keys,
  pending: ['refund', 'pending'],
  cancelled: ['refund', 'cancelled'],
  processing: ['pending', 'processing'],
}

export const getDisabledKeys = (key: string): string[] | string => {
  return disabledKeysMap[key] || [key]
}
