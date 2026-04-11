import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import AIToolsPage from '@/pages/AIToolsPage';
import UsersPage from '@/pages/UsersPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ProfilePage from '@/pages/ProfilePage';
import RequestsPage from '@/pages/RequestsPage';
import ProcessesPage from '@/pages/ProcessesPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/cadastro',
    element: <RegisterPage />,
  },
  {
    path: '/esqueci-senha',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/termos',
    element: <TermsPage />,
  },
  {
    path: '/privacidade',
    element: <PrivacyPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'solicitacoes',
            element: <RequestsPage />,
          },
          {
            path: 'processos',
            element: <ProcessesPage />,
          },
          {
            path: 'ai-assistente',
            element: <AIToolsPage />,
          },
          {
            path: 'usuarios',
            element: <UsersPage />,
          },
          {
            path: 'perfil',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
