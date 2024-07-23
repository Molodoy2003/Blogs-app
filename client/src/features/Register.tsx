import { Button, Link } from '@nextui-org/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../components/input/Input'
import { useRegisterMutation } from '../services/userApi'

type Register = {
  email: string
  password: string
  name: string
}

type Props = {
  setSelected: (value: string) => void
}

const Register: FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<Register>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const [register, { isLoading }] = useRegisterMutation()
  // const navigate = useNavigate()

  const onSubmit = async (data: Register) => {
    try {
      await register(data)
      setSelected('login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div>
        <Input
          name='name'
          control={control}
          label='Name'
          type='text'
          required='Обязательное поле'
        />
      </div>
      <div>
        <Input
          name='email'
          control={control}
          label='Email'
          type='email'
          required='Обязательное поле'
        />
      </div>
      <div>
        <Input
          name='password'
          control={control}
          label='Password'
          type='password'
          required='Обязательное поле'
        />
      </div>
      <p className='text-center text-small'>
        Есть аккаунт?{' '}
        <Link
          size='sm'
          className='cursor-pointer'
          onPress={() => setSelected('login')}
        >
          Войдите
        </Link>
      </p>
      <div className='flex gap-2 justify-end'>
        <Button isLoading={isLoading} fullWidth color='primary' type='submit'>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default Register
