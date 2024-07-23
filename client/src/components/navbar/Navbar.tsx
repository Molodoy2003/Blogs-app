import { FC } from 'react'
import { BsPostcard } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { TbFileInfo } from 'react-icons/tb'
import NavButton from '../nav-button/NavButton'

const Navbar: FC = () => {
  return (
    <nav>
      <ul className='flex flex-col gap-5'>
        <li>
          <NavButton href='/' icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href='following' icon={<FiUsers />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href='followers' icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li>
        <li>
          <NavButton href='about' icon={<TbFileInfo />}>
            О платформе
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
