import { countrySchema } from '@/types/schemas'

type TProps = {
  country: countrySchema
  state?: string
  city?: string
}
export default function getCountrySelect({ country, state, city }: TProps) {
  const seenStates = new Set()
  const states = country
    ?.filter((item) => {
      if (!seenStates.has(item.StateName_C)) {
        seenStates.add(item.StateName_C)
        return true
      }
      return false
    })
    .map((st) => st.StateName_C)

  const getCityByStates = (stateSelect: string): string[] => {
    return country
      .filter((c) => c.StateName_C === stateSelect)
      .map((ct) => ct.County_c)
  }

  const cities = state ? Array.from(new Set(getCityByStates(state))) : []

  const getZoneByCity = (stateSelect: string, citySelect: string) => {
    const zone = country
      .filter((z) => {
        return z.StateName_C === stateSelect && z.County_c === citySelect
      })
      .map((zn) => zn.City_c)
    return zone
  }

  const zones = state && city ? getZoneByCity(state, city) : []
  return { states, cities, zones }
}
