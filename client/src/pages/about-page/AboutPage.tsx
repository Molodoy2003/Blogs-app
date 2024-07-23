import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
} from '@nextui-org/react'
import { FC } from 'react'

const AboutPage: FC = () => {
  return (
    <>
      <Card
        style={{
          maxWidth: '700px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <CardHeader style={{ textAlign: 'center', paddingBottom: '0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            О нашей платформе для блогов ✨
          </h2>
        </CardHeader>
        <CardBody style={{ padding: '2rem 0' }}>
          <div style={{ paddingBottom: '1rem' }}>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                textAlign: 'justify',
              }}
            >
              Добро пожаловать на нашу платформу BlogSphere — ваше идеальное
              решение для создания, публикации и управления блогами. Мы
              предлагаем понятный интерфейс, который позволяет вам легко
              запускать и поддерживать собственный блог, управлять его
              содержимым и взаимодействовать с вашей аудиторией. 🌟
            </p>
          </div>
          <Spacer y={1} />
          <div style={{ paddingBottom: '1rem' }}>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                textAlign: 'justify',
              }}
            >
              С помощью удобных функций поиска вы сможете быстро находить нужные
              вам публикации . 🔍📚
            </p>
          </div>
          <Spacer y={1} />
          <div>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                textAlign: 'justify',
              }}
            >
              Взаимодействие с читателями становится проще благодаря системе
              комментариев. Ваши посетители могут оставлять отзывы и обсуждать
              статьи. 💬🤝
            </p>
          </div>
        </CardBody>
        <CardFooter style={{ textAlign: 'center' }}>
          <strong style={{ fontSize: '1.2rem' }}>
            Благодарим за использование нашей платформы и желаем вам успешных
            публикаций! 🚀
          </strong>
        </CardFooter>
      </Card>
    </>
  )
}

export default AboutPage
