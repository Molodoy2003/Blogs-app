import { FC, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Container from '../components/container/Container'
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import UserProfile from '../components/user-profile/UserProfile'
import { RootState } from '../redux/store'

const Layout: FC = () => {
  const { isAuthenticated, user, token } = useSelector(
    (state: RootState) => state.user
  )
  const navigate = useNavigate()
  const notify = () => toast.success('Вы успешно вошли в аккаунт!')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
    }

    if (token) {
      notify()
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className='flex-2 p-4'>
          <Navbar />
        </div>
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
        <div className='flex-2 p-4'>
          <div className='flex-col flex gap-5'>{!user && <UserProfile />}</div>
        </div>
      </Container>
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
    </>
  )
}

export default Layout
