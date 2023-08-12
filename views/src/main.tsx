import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import VideoDetailPage from './pages/VideoDetailPage';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import PageLayout from './layouts/PageLayout';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageLayout>
        <HomePage />
      </PageLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/video/:id',
    element: (
      <PageLayout>
        <VideoDetailPage />
      </PageLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <PageLayout>
        <AuthPage />
      </PageLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <PageLayout>
        <AuthPage />
      </PageLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <PageLayout>
        <ProfilePage />
      </PageLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
