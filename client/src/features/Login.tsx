import { Button, Link } from '@nextui-org/react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from '../components/input/Input'
import { useLazyCurrentQuery, useLoginMutation } from '../services/userApi'

type Login = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

const Login: FC<Props> = ({ setSelected }) => {
  const [loginError, setLoginError] = useState<string | null>(null)
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<Login>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [login, { isLoading }] = useLoginMutation()
  const [triggerCurrentUser] = useLazyCurrentQuery()
  const navigate = useNavigate()

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentUser().unwrap()
      navigate('/')
    } catch (error) {
      setLoginError('Неправильный email или пароль')
      setTimeout(() => {
        setLoginError(null)
      }, 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Input
          name='email'
          control={control}
          label='Email'
          type='email'
          required='Обязательное поле'
        />
        <Input
          name='password'
          control={control}
          label='Password'
          type='password'
          required='Обязательное поле'
        />
        {loginError && <p className='text-left text-red-500'>{loginError}</p>}
        <p className='text-center text-small'>
          Нет аккаунта?{' '}
          <Link
            size='sm'
            className='cursor-pointer'
            onPress={() => setSelected('sign-up')}
          >
            Зарегистрируйтесь
          </Link>
        </p>
        <div className='flex gap-2 justify-end'>
          <Button fullWidth color='primary' type='submit' isLoading={isLoading}>
            Войти
          </Button>
        </div>
      </form>
    </>
  )
}

export default Login
