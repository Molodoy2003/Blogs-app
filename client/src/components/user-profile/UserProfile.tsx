import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react'
import { FC } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../constants'
import { RootState } from '../../redux/store'

const UserProfile: FC = () => {
  const { current } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  const handleProfileClick = () => {
    navigate(`/users/${id}`)
  }

  return (
    <Card className='py-4 w-[300px]'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-center '>
        <Image
          alt='profile'
          className='object-cover rounded-xl'
          src={`${BASE_URL}${avatarUrl}`}
          width={200}
        />
      </CardHeader>
      <CardBody>
        <h4 className='font-bold text-large mb-2'>{name}</h4>
        <p className='flex items-center gap-2 text-default-500'>
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
      <CardFooter>
        <Button
          onClick={handleProfileClick}
          size='lg'
          color='default'
          variant='flat'
        >
          Мой профиль
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserProfile
