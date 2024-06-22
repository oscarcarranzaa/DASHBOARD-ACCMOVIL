function equalsArrays(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) return false

  // Ordenar ambos arrays
  const sortedArr1 = arr1.slice().sort()
  const sortedArr2 = arr2.slice().sort()

  // Comparar los arrays ordenados
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false
    }
  }

  return true
}
