import { usePublishStore } from '@/store/publish'

export default function VariationsValues() {
  // Suscríbete a los cambios de estado usando el hook usePublishStore
  const attributes = usePublishStore((state) => state.attributes)
  console.log(attributes, 'attributes')
  return (
    <div>
      <p>Variaciones xd</p>
      {attributes?.map((att) => {
        return (
          <div key={att.id} className="mb-5">
            <p>{att.name}</p>
            {att.terms.map((term) => {
              return <p key={term.id}>{term.name}</p>
            })}
          </div>
        )
      })}
    </div>
  )
}
