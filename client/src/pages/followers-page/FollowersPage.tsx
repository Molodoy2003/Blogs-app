import { Card, CardBody } from '@nextui-org/react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import User from '../../components/user/User'
import { RootState } from '../../redux/store'

const FollowersPage: FC = () => {
  const { current } = useSelector((state: RootState) => state.user)

  if (!current) {
    return null
  }

  // if (current.followers.length === 0) {
  //   return (
  //     <div className='flex  min-h-screen'>
  //       <p className='text-lg font-bold'>
  //         У вас нет подписчиков <span>☹️</span>
  //       </p>
  //     </div>
  //   )
  // }

  return (
    <>
      {current.followers.length > 0 ? (
        <div className='gap-5 flex flex-col'>
          {current.followers.map(user => (
            <Link key={user.id} to={`/users/${user.follower.id}`}>
              <Card>
                <CardBody className='block'>
                  <User
                    name={user.follower.name ?? ''}
                    avatarUrl={user.follower.avatarUrl ?? ''}
                    description={user.follower.email ?? ''}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className='mb-1 ml-1 font-bold text-lg text-inherit'>
          У вас нет подписчиков <span>☹️</span>
        </p>
      )}
    </>
  )
}
export default FollowersPage
