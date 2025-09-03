'use client'
import { getOneUser } from '@/api/users'
import { Container3D } from '@/components/UI/container3D'
import NavegationPages from '@/components/navegationPages'
import UserDetails from '@/components/users/userDetails'
import AllUserDetailsSearch from '@/components/users/userDetails/allUserDetailSearch'
import EditUser from '@/components/users/userDetails/editUser'
import UserCard from '@/components/users/userDetails/userCard'
import { Button } from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

type paramsID = {
  userID: string
}
export default function UserDetailsPage() {
  const router = useRouter()
  const params: paramsID = useParams()
  const ID = params.userID
  const { data, isPending } = useQuery({
    queryKey: ['user', ID],
    queryFn: () => getOneUser(ID),
    refetchOnWindowFocus: false,
  })

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

      <div className="grid grid-cols-8 px-10 gap-10 mb-10">
        <div className="mt-20 col-span-5">
          {data && (
            <Container3D>
              <UserCard
                username={data?.username}
                name={data && `${data?.firstName} ${data?.lastName}`}
                avatar={data?.avatar}
                email={data?.email}
                role={data?.role?.name ?? 'Administrador'}
                is_owner={data?.is_owner}
                status={data?.status}
                description={data?.job}
              />
            </Container3D>
          )}
        </div>
        <div className="col-span-3">{data && <EditUser user={data} />}</div>
      </div>
    </>
  )
}
