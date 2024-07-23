import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { FC, useContext } from 'react'
import { CiLogout } from 'react-icons/ci'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'
import { SlSocialReddit } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import { logout, resetUser } from '../../redux/slices/userSlice.ts'
import { RootState } from '../../redux/store'
import { ThemeContext } from '../theme-provider'

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { isAuthenticated } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetUser())
    localStorage.removeItem('token')
    navigate('/auth')
  }

  const onClickLogo = () => {
    navigate('/')
    dispatch(resetUser())
  }

  return (
    <Navbar className='navbar-relative'>
      <NavbarBrand>
        <div onClick={onClickLogo} className='flex items-center cursor-pointer'>
          <SlSocialReddit size={40} className='mr-3' />
          <p className='font-bold text-lg text-inherit'>BlogSphere</p>
        </div>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem
          onClick={() => toggleTheme()}
          className='lg:flex text-3xl cursor-pointer'
        >
          {theme === 'light' ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              className='gap-2'
              onClick={handleLogout}
              color='default'
              variant='flat'
            >
              <CiLogout />
              <span className='text-base'>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
