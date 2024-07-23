import { NextUIProvider } from '@nextui-org/react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthGuard from './components/auth-guard/AuthGuard.tsx'
import { ThemeProvider } from './components/theme-provider/index.tsx'
import './index.css'
import Layout from './layout/Layout.tsx'
import AboutPage from './pages/about-page/AboutPage.tsx'
import AuthPage from './pages/auth-page/AuthPage.tsx'
import CurrentPostPage from './pages/current-post/CurrentPostPage.tsx'
import FollowersPage from './pages/followers-page/FollowersPage.tsx'
import FollowingPage from './pages/following-page/FollowingPage.tsx'
import PostsPage from './pages/posts-page/PostsPage.tsx'
import UserPage from './pages/user-page/UserPage.tsx'
import { store } from './redux/store.ts'

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path2: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PostsPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: 'posts/:id',
        element: <CurrentPostPage />,
      },
      {
        path: 'users/:id',
        element: <UserPage />,
      },
      {
        path: 'followers',
        element: <FollowersPage />,
      },
      {
        path: 'following',
        element: <FollowingPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <Provider store={store}>
      <ThemeProvider>
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </ThemeProvider>
    </Provider>
  </NextUIProvider>
)
