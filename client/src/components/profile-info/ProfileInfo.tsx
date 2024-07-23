import { FC } from 'react'

type Props = {
  title: string
  info?: string
}

const ProfileInfo: FC<Props> = ({ title, info }) => {
  if (!info) {
    null
  }
  return (
    <p className='font-semibold '>
      <span className='text-gray-500 mr-2'>{title}</span>
      {info}
    </p>
  )
}

export default ProfileInfo
