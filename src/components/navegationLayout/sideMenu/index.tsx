'use server'
import { cookies } from 'next/headers'
import SideMenuContent from './content'

export default async function SideMenu() {
  const cookieStore = cookies()
  const theme = cookieStore.get('openMenu')
  const isOpened = theme?.value === 'true' || false
  return <SideMenuContent startMenu={isOpened} />
}
