import React from 'react'

type TProps = {
  message?: string
}

export default function HistoryMessage({ message }: TProps) {
  // Expresión regular para detectar URLs
  const urlPattern = /(https?:\/\/[^\s]+)/g

  // Comprobar si el mensaje contiene un enlace
  const renderMessage = () => {
    if (!message) return 'Mensaje no disponible'

    return message.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <a
          key={index}
          href={part.startsWith('http') ? part : `https://${part}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    )
  }

  return (
    <div className="bg-zinc-50 dark:bg-black py-2 px-3 inline-block border dark:border-zinc-600 border-zinc-200 rounded-lg">
      <p className="inline-block text-sm">{renderMessage()}</p>
    </div>
  )
}
