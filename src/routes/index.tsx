import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import { LINKS } from '@src/links';

const WelcomePage = lazy(() => import('@src/pages/WelcomePage'));
const ProfilePage = lazy(() => import('@src/pages/ProfilePage'));

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
];

export { ROUTES };
