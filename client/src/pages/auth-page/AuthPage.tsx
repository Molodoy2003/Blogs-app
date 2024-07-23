import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { FC, useState } from 'react'
import Login from '../../features/Login'
import Register from '../../features/Register'

const AuthPage: FC = () => {
  const [selected, setSelected] = useState('login')

  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='flex flex-col'>
        <Card className='max-w-full w-[400px] h-[450px]'>
          <CardBody className='overflow-hidden'>
            <Tabs
              fullWidth
              size='lg'
              selectedKey={selected}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key='login' title='Вход'>
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key='sign-up' title='Регистрация'>
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
