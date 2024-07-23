import { Spinner } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/card/Card'
import CreateComment from '../../components/create-comment/CreateComment'
import '../../index.css'
import { useGetPostByIdQuery } from '../../services/postsApi'

const CurrentPostPage: FC = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? '')
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const commentsPerPage = 4

  // если удалить единственный комментарий не на первой странице, чтоб перекидывало на первую страницу
  useEffect(() => {
    if (
      data?.comments &&
      data.comments.length <= currentPage * commentsPerPage
    ) {
      setCurrentPage(0)
    }
  }, [data, currentPage, commentsPerPage])

  if (!data) {
    return <Spinner />
  }

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt,
  } = data

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected)
  }

  const indexOfLastComment = (currentPage + 1) * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = comments?.slice(
    indexOfFirstComment,
    indexOfLastComment
  )

  const pageCount = Math.ceil((comments?.length || 0) / commentsPerPage)

  return (
    <>
      <div
        onClick={() => navigate('/')}
        className='text-default-500 text-lg flex items-center gap-2 mb-5 cursor-pointer hover:text-white hover:duration-500'
      >
        <FaRegArrowAltCircleLeft size={17} />
        Назад
      </div>
      <Card
        cardType='current-post'
        avatarUrl={author?.avatarUrl ?? ''}
        content={content}
        name={author?.name ?? ''}
        likesCount={likes.length}
        commentsCount={comments?.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className='mt-10'>
        <CreateComment />
      </div>
      <div className='mt-10'>
        {currentComments && currentComments.length > 0 ? (
          <>
            {currentComments.map(comment => (
              <Card
                cardType='comment'
                key={comment.id}
                avatarUrl={comment.user.avatarUrl}
                content={comment.content}
                authorId={comment.userId}
                name={comment.user.name ?? ''}
                commentId={comment.id}
                id={id}
              />
            ))}
            {pageCount > 1 && (
              <div className='flex justify-center mt-4'>
                <ReactPaginate
                  previousLabel={'Назад'}
                  nextLabel={'Вперед'}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  previousClassName={'previous'}
                  nextClassName={'next'}
                  disabledClassName={'disabled'}
                />
              </div>
            )}
          </>
        ) : (
          <p className='mb-1 ml-1 font-bold text-lg text-inherit'>
            Нет комментариев <span>☹️</span>
          </p>
        )}
      </div>
    </>
  )
}

export default CurrentPostPage
