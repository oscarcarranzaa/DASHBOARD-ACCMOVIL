import AccountInformation from '@/components/users/profile/accountInformation'

const PROFILE_MENU = [
  {
    name: 'General',
    href: '/dash/account',
  },
]
export default function AccountSetting() {
  return (
    <>
      <div>
        <p className="pb-10 mb-10 text-xl font-semibold border-b border-zinc-500">
          Informacion de la cuenta
        </p>
        <AccountInformation />
      </div>
    </>
  )
}
