import { Card, CardBody } from '@nextui-org/react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import User from '../../components/user/User'
import { RootState } from '../../redux/store'

const FollowingPage: FC = () => {
  const { current } = useSelector((state: RootState) => state.user)

  if (!current) {
    return null
  }

  // if (current.following.length === 0) {
  //   return (
  //     <div className='flex  min-h-screen'>
  //       <p className='text-lg font-bold'>
  //         У вас нет подписок <span>☹️</span>
  //       </p>
  //     </div>
  //   )
  // }

  return (
    <>
      {current.followers.length > 0 ? (
        <div className='gap-5 flex flex-col'>
          {current.following.map(user => (
            <Link key={user.id} to={`/users/${user.following.id}`}>
              <Card>
                <CardBody className='block'>
                  <User
                    name={user.following.name ?? ''}
                    avatarUrl={user.following.avatarUrl ?? ''}
                    description={user.following.email ?? ''}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className='mb-1 ml-1 font-bold text-lg text-inherit'>
          У вас нет подписок <span>☹️</span>
        </p>
      )}
    </>
  )
}
export default FollowingPage
