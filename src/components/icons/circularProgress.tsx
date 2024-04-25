import React from 'react'

interface IProps {
  size: number
  progress: number
}
const CircularProgress = ({ size, progress }: IProps) => {
  // Calculamos el radio del círculo
  const radius = (size - 4) / 2
  // Calculamos la circunferencia del círculo completo
  const circumference = 2 * Math.PI * radius
  // Calculamos la longitud de la porción de círculo que queremos mostrar
  const progressLength = (circumference * progress) / 100

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className=" animate-spin"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#777"
        strokeWidth="10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#fff"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progressLength}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

export default CircularProgress
