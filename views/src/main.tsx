import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import VideoDetailPage from './pages/VideoDetailPage';
import ErrorPage from './pages/ErrorPage';
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
