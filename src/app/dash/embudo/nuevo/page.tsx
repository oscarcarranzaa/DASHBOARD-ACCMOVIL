import PipelineEditor from '@/components/customers/crm/pipeline/editor'
import NavegationPages from '@/components/navegationPages'

export default function AddPipeline() {
  return (
    <>
      <NavegationPages text="Nuevo embudo" />
      <PipelineEditor />
    </>
  )
}
