import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import { LINKS } from '@src/links';

const ProfilePage = lazy(() => import('@src/pages/ProfilePage'));
const WelcomePage = lazy(() => import('@src/pages/WelcomePage'));
const AuthPage = lazy(() => import('@src/pages/AuthPage'));
const DialogsPage = lazy(() => import('@src/pages/DialogsPage'));
const ProfileContentPage = lazy(() => import('@src/pages/ProfileContentPage'));
const SettingsPage = lazy(() => import('@src/pages/SettingsPage'));

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
    path: LINKS.auth,
    element: <AuthPage />,
  },
  {
    path: LINKS.main,
    element: <ProfilePage />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to={LINKS.profile}
            replace
          />
        ),
      },
      {
        path: LINKS.profile,
        element: <ProfileContentPage />,
      },
      {
        path: LINKS.dialogs,
        element: <DialogsPage />,
      },
      {
        path: LINKS.settings,
        element: <SettingsPage />,
      },
    ],
  },
];

export { ROUTES };
