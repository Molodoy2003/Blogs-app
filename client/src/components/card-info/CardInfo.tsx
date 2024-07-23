import { FC } from 'react'
import { IconType } from 'react-icons'

type Props = {
  count: number
  Icon: IconType
}

const CardInfo: FC<Props> = ({ count, Icon }) => {
  return (
    <div className='flex items-center gap-2 cursor-pointer'>
      {count > 0 && (
        <p className='font-semibold text-default-400 text-l'>{count}</p>
      )}

      <p className='text-default-400 text-xl hover:text-2xl ease-in duration-200'>
        <Icon />
      </p>
    </div>
  )
}

export default CardInfo
