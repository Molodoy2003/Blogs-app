import { Button, Textarea } from '@nextui-org/react'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { IoMdCreate } from 'react-icons/io'
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from '../../services/postsApi'

const CreatePost: FC = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const notify = () => toast.success('Пост успешно добавлен!')

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue('post', '')
      await triggerAllPosts().unwrap()
      notify()
    } catch (error) {
      errors?.post?.message as string
    }
  }

  return (
    <form className='flex-grow' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        rules={{ required: 'Обязательное поле' }}
        name='post'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Textarea
            style={{ fontSize: '17px' }}
            placeholder='Введите текст...'
            labelPlacement='outside'
            {...field}
            className='mb-5'
          />
        )}
      />
      <Button
        color='success'
        className='flex-end text-base'
        endContent={<IoMdCreate />}
        type='submit'
      >
        Добавить пост
      </Button>
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
    </form>
  )
}

export default CreatePost
