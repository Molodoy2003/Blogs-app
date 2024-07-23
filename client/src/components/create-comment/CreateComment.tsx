import { Button, Textarea } from '@nextui-org/react'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { IoMdCreate } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { useCreateCommentMutation } from '../../services/commentsApi'
import { useLazyGetPostByIdQuery } from '../../services/postsApi'

const CreateComment: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()
  const notify = () => toast.success('Комментарий успешно добавлен!')

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        setValue('comment', '')
        await getPostById(id).unwrap()
        notify()
      }
    } catch (error) {
      errors?.post?.message as string
    }
  }

  return (
    <form className='flex-grow' onSubmit={handleSubmit(onSubmit)}>
      <p className='mb-1 ml-1 font-bold text-lg text-inherit'>
        Оставьте комментарий
      </p>
      <Controller
        rules={{ required: 'Обязательное поле' }}
        name='comment'
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
        color='primary'
        className='flex-end text-base'
        endContent={<IoMdCreate />}
        type='submit'
      >
        Отправить
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

export default CreateComment
