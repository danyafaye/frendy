import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import { LINKS } from '@src/links';

const ProfilePage = lazy(() => import('@src/pages/ProfilePage'));
const WelcomePage = lazy(() => import('@src/pages/WelcomePage'));
const AuthPage = lazy(() => import('@src/pages/AuthPage'));

const ROUTES: RouteObject[] = [
  {
    path: LINKS.home,
    element: <WelcomePage />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  {
    path: LINKS.main,
    element: <ProfilePage />,
  },
  {
    path: LINKS.auth,
    element: <AuthPage />,
  },
];

export {ROUTES}
