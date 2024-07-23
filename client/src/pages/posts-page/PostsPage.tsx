import { Input } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import ReactPaginate from 'react-paginate'
import Card from '../../components/card/Card'
import CreatePost from '../../components/create-post/CreatePost'
import '../../index.css'
import { useGetAllPostsQuery } from '../../services/postsApi'

const PostsPage: FC = () => {
  const { data } = useGetAllPostsQuery()
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const postsPerPage = 4

  // если удалить единственный пост не на первой странице, чтоб перекидывало на первую страницу
  useEffect(() => {
    if (data && data.length <= currentPage * postsPerPage) {
      setCurrentPage(0)
    }
  }, [data, currentPage, postsPerPage])

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected)
  }

  const filteredPosts = data?.filter(
    post =>
      post.content.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.author.name?.toLowerCase().includes(searchValue.toLowerCase())
  )

  const indexOfLastPost = (currentPage + 1) * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost)

  const pageCount = Math.ceil((filteredPosts?.length || 0) / postsPerPage)

  return (
    <>
      <div style={{ marginBottom: '25px' }}>
        <Input
          startContent={<BiSearch size={20} />}
          size='lg'
          type='text'
          placeholder='Поиск поста ...'
          isClearable
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
        />
      </div>
      <div className='mb-10 w-full'>
        <p className='mb-1 ml-1 font-bold text-lg text-inherit'>Создать пост</p>
        <CreatePost />
      </div>
      {currentPosts && currentPosts.length > 0 ? (
        <>
          {currentPosts.map(post => (
            <Card
              key={post.id}
              avatarUrl={post.author.avatarUrl ?? ''}
              content={post.content}
              name={post.author.name ?? ''}
              likesCount={post.likes.length}
              commentsCount={post.comments.length}
              authorId={post.authorId}
              id={post.id}
              likedByUser={post.likedByUser}
              createdAt={post.createdAt}
              cardType='post'
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
          Посты не найдены <span>☹️</span>
        </p>
      )}
    </>
  )
}

export default PostsPage
