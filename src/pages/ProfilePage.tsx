import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { LINKS } from '@src/links';

import { Profile } from '@components/Profile';
import { PageGuard } from '@components/PageGuard';

const ProfilePage: FC = () => {
  return (
    <PageGuard
      type="main"
      Navigate={<Navigate to={LINKS.auth} />}
    >
      <Profile />
    </PageGuard>
  );
};

export default ProfilePage;
