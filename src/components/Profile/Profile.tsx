import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ProfileSidebar } from '@components/Profile/ProfileSidebar';

import * as ST from './styled';

const Profile: FC = () => {
  return (
    <ST.ProfileWrapper
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      key="PROFILE_WRAPPER"
    >
      <ProfileSidebar />
      <ST.ProfileContentWrapper>
        <Outlet />
      </ST.ProfileContentWrapper>
    </ST.ProfileWrapper>
  );
};

export { Profile };
