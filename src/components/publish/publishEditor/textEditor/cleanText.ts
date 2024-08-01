const cleanText = (text: string) => {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\n\s*\n/g, '\n\n') // Eliminar líneas en blanco adicionales
}

export default cleanText
