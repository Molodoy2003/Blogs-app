import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react'
import { FC, useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MdOutlineEmail } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useUpdateMutation } from '../../services/userApi'
import { User } from '../../types/types'
import Input from '../input/Input'
import { ThemeContext } from '../theme-provider'

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

const EditProfile: FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()
  const { handleSubmit, control } = useForm<User>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      const formData = new FormData()
      data.name && formData.append('name', data.name)
      data.email &&
        data.email !== user?.email &&
        formData.append('email', data.email)
      data.dateOfBirth &&
        formData.append('dateOfBirth', new Date(data.dateOfBirth).toISOString())
      data.bio && formData.append('bio', data.bio)
      data.location && formData.append('location', data.location)
      selectedFile && formData.append('avatar', selectedFile)

      await updateUser({ userData: formData, id }).unwrap()
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Изменение профиля
            </ModalHeader>
            <ModalBody>
              <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name='email'
                  label='Почта'
                  type='email'
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name='name' label='Имя' type='text' />
                <input
                  type='file'
                  name='avatarUrl'
                  style={{ borderRadius: '5px' }}
                  placeholder='Выберите файл'
                  onChange={handleFileChange}
                />
                <Input
                  control={control}
                  name='dateOfBirth'
                  label='Дата рождения'
                  type='date'
                  placeholder='Введите дату...'
                />
                <Controller
                  name='bio'
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} rows={4} placeholder='Обо мне' />
                  )}
                />
                <Input
                  control={control}
                  name='location'
                  label='Местоположение'
                  type='text'
                />
                <div className='flex gap-2 justify-end'>
                  <Button
                    fullWidth
                    color='primary'
                    type='submit'
                    isLoading={isLoading}
                  >
                    Обновить
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' variant='light' onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
