import NavegationPages from '@/components/navegationPages'
import GeneralSettings from '@/components/settings/general'

export default function SettingsPage() {
  return (
    <div>
      <NavegationPages text="Configuración general" />
      <GeneralSettings />
    </div>
  )
}
