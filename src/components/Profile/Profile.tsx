import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ProfileSidebar } from '@components/Profile/ProfileSidebar';

import * as ST from './styled';

const Profile: FC = () => {
  return (
    <ST.ProfileWrapper>
      <ProfileSidebar />
      <ST.ProfileContentWrapper>
        <Outlet />
      </ST.ProfileContentWrapper>
    </ST.ProfileWrapper>
  );
};

export { Profile };
