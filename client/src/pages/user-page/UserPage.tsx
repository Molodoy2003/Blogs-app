import { Button, Card, Image, useDisclosure } from '@nextui-org/react'
import { FC, useEffect } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import EditProfile from '../../components/edit-profile/EditProfile'
import ProfileInfo from '../../components/profile-info/ProfileInfo'
import { BASE_URL } from '../../constants'
import { resetUser } from '../../redux/slices/userSlice'
import { RootState } from '../../redux/store'
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../services/followsApi'
import { formatToClientDate } from '../../utils/format-to-client-date'
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from './../../services/userApi'

const UserPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { current } = useSelector((state: RootState) => state.user)
  const { data } = useGetUserByIdQuery(id ?? '')
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetUser())
  }, [])

  const onClickBack = () => {
    navigate('/')
    dispatch(resetUser())
  }

  const handleClose = async () => {
    if (id) {
      await triggerGetUserByIdQuery(id)
      await triggerCurrentQuery()
      onClose()
    }
  }

  const onFollow = async () => {
    if (id) {
      data?.isFollowing
        ? await unfollowUser({ followingId: id }).unwrap()
        : await followUser({ followingId: id })

      await triggerGetUserByIdQuery(id)
      await triggerCurrentQuery()
    }
  }

  return (
    <>
      <div
        onClick={onClickBack}
        className='text-default-500 text-lg flex items-center gap-2 mb-5 cursor-pointer hover:text-white hover:duration-500'
      >
        <FaRegArrowAltCircleLeft size={17} />
        Назад
      </div>
      <div className='flex items-center gap-4'>
        <Card className='flex flex-col items-center text-center space-y-4 p-5 flex-2'>
          <Image
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data?.name}
            width={200}
            height={200}
            className='border-4 border-white '
          />
          <div className='flex flex-col text-2xl font-bold gap-4 items-center'>
            {data?.name}
            {current?.id === id ? (
              <Button onClick={() => onOpen()} endContent={<CiEdit />}>
                Редактировать
              </Button>
            ) : (
              <Button
                variant='flat'
                className='gap-2'
                onClick={onFollow}
                color={data?.isFollowing ? 'default' : 'primary'}
                endContent={
                  data?.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data?.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            )}
          </div>
        </Card>
        <Card className='flex flex-col space-y-4 p-5 flex-1'>
          <ProfileInfo title='Почта:' info={data?.email} />
          <ProfileInfo title='Местоположение:' info={data?.location} />
          <ProfileInfo
            title='Дата рождения:'
            info={formatToClientDate(data?.dateOfBirth)}
          />
          <ProfileInfo title='Обо мне:' info={data?.bio} />

          <div className='flex gap-2'>
            <div className='flex flex-col items-center space-x-2 p-4'>
              <span className='text-4xl font-semibold'>
                {data?.followers.length}
              </span>
              <span>Подписчики</span>
            </div>
            <div className='flex flex-col items-center space-x-2 p-4'>
              <span className='text-4xl font-semibold'>
                {data?.following.length}
              </span>
              <span>Подписки</span>
            </div>
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}

export default UserPage
