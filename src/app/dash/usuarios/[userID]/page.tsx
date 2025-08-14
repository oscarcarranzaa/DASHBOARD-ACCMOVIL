'use client'
import { getOneUser } from '@/api/users'
import NavegationPages from '@/components/navegationPages'
import UserDetails from '@/components/users/userDetails'
import AllUserDetailsSearch from '@/components/users/userDetails/allUserDetailSearch'
import { Button } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

type paramsID = {
  userID: string
}
export default function ClientSee() {
  const router = useRouter()
  const params: paramsID = useParams()
  const ID = params.userID
  const { data, isPending } = useQuery({
    queryKey: ['user', ID],
    queryFn: () => getOneUser(ID),
    refetchOnWindowFocus: false,
  })

  console.log(data)
  const name = data && `${data?.firstName} ${data?.lastName}`
  const avatar = data?.avatar
  const userName = data?.username

  return (
    <>
      <div className="flex items-center gap-2">
        <div>
          <Button onPress={() => router.back()} isIconOnly>
            <ArrowLeft size={18} />
          </Button>
        </div>
        <AllUserDetailsSearch
          currentUserId={ID}
          isLoading={isPending}
          name={name}
          avatar={avatar}
          userName={userName}
        />
      </div>

      <div></div>
      <div className="grid grid-cols-3">
        <div className=" col-span-2"></div>
      </div>
    </>
  )
}
