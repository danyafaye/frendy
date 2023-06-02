import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { LINKS } from '@src/links';

import { Auth } from '@components/Auth/Auth';
import { PageGuard } from '@components/PageGuard';

const AuthPage: FC = () => {
  return (
    <PageGuard
      type="auth"
      Navigate={<Navigate to={LINKS.main} />}
    >
      <Auth />
    </PageGuard>
  );
};

export default AuthPage;
