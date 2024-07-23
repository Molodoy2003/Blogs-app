import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextCard,
  Spinner,
} from '@nextui-org/react'
import { format } from 'date-fns'
import { FC } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { FcDislike } from 'react-icons/fc'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useDeleteCommentMutation } from '../../services/commentsApi'
import {
  useDislikePostMutation,
  useLikePostMutation,
} from '../../services/likesApi'
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../services/postsApi'
import CardInfo from '../card-info/CardInfo'
import User from '../user/User'

type Props = {
  avatarUrl: string
  content: string
  name: string
  authorId: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardType: 'comment' | 'post' | 'current-post'
  likedByUser?: boolean
}

const Card: FC<Props> = ({
  avatarUrl = '',
  content = '',
  name = '',
  authorId = 0,
  commentId = '',
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = '',
  cardType = 'post',
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation()
  const [dislikePost] = useDislikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const navigate = useNavigate()
  const { current } = useSelector((state: RootState) => state.user)
  const notify = () => toast.success('Пост успешно удалён!')

  const refetchPosts = async () => {
    switch (cardType) {
      case 'post': {
        await triggerGetAllPosts().unwrap()
        break
      }
      case 'current-post': {
        await triggerGetAllPosts().unwrap()
        break
      }
      case 'comment': {
        await triggerGetPostById(id).unwrap()
        break
      }
      default: {
        throw new Error('Ошибка при удалении')
      }
    }
  }

  const onDeletePost = async () => {
    switch (cardType) {
      case 'post': {
        await deletePost(id).unwrap()
        await refetchPosts()
        notify()
        break
      }
      case 'current-post': {
        await deletePost(id).unwrap()
        navigate('/')
        notify()
        break
      }
      case 'comment': {
        await deleteComment(commentId).unwrap()
        await refetchPosts()
        toast.success('Комментарий успешно удалён!')
        break
      }
      default: {
        throw new Error('Ошибка при удалении')
      }
    }
  }

  const onClickLike = async () => {
    likedByUser
      ? await dislikePost(id).unwrap()
      : await likePost({ postId: id }).unwrap()

    if (cardType === 'current-post') {
      await triggerGetPostById(id).unwrap()
    }

    if (cardType === 'post') {
      await triggerGetAllPosts().unwrap()
    }

    await refetchPosts()
  }

  const formattedDate = createdAt
    ? format(new Date(createdAt), 'yyyy-MM-dd HH:mm')
    : ''

  return (
    <NextCard className='mb-5 '>
      <CardHeader className='justify-between items-center bg-transparent'>
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className='text-base font-semibold leading-none text-default-600'
            avatarUrl={avatarUrl}
            description={formattedDate}
          />
        </Link>
        {authorId === current?.id && (
          <div className='cursor-pointer' onClick={onDeletePost}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine size={20} />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className='px-3 py-2 mb-5 '>
        <p className='text-xl'>{content}</p>
      </CardBody>
      {cardType !== 'comment' && (
        <CardFooter className='gap-3'>
          <div className='flex gap-5 items-center'>
            <div onClick={onClickLike}>
              <CardInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : FaRegHeart}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <CardInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
        </CardFooter>
      )}
      <Toaster
        position='bottom-right'
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            border: '1px solid #007124',
            backgroundColor: '#007124',
            padding: '5px 15px',
            color: '#e7e7e7',
            fontWeight: '600',
            width: '300px',
          },
        }}
      />
    </NextCard>
  )
}

export default Card
