import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainLayout from '../layouts/MainLayout';
import Homepage from '../pages/Homepage';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import NewsListPage from '../pages/dashboard/NewsListPage';
import CreateNewsPage from '../pages/dashboard/CreateNewsPage';
import EditNewsPage from '../pages/dashboard/EditNewsPage';
import NewsPage from '../pages/NewsPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute component={DashboardLayout} />,
    children: [
      {
        index: true,
        element: <NewsListPage />
      },
      {
        path: 'publish',
        element: <CreateNewsPage />
      },
      {
        path: 'news/:slug/edit',
        element: <EditNewsPage />
      }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'news',
        element: <NewsPage />
      }
    ]
  }
]);

export default router;
