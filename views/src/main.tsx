import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import VideoDetailPage from './pages/VideoDetailPage';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/video/:id',
    element: <VideoDetailPage />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/register',
    element: <AuthPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
