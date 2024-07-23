import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { resetUser } from '../../redux/slices/userSlice'
import Button from '../button/Button'

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

const NavButton: FC<Props> = ({ children, icon, href }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClickFollowing = () => {
    navigate(`/${href}`)
    dispatch(resetUser())
  }

  return (
    <Button className='flex justify-start text-xl' icon={icon}>
      <Link onClick={onClickFollowing} to={href}>
        {children}
      </Link>
    </Button>
  )
}

export default NavButton
