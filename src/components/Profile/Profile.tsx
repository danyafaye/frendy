import { FC } from 'react';

import { ProfileSidebar } from '@components/Profile/ProfileSidebar';
import { ProfileContent } from '@components/Profile/ProfileContent';

import * as ST from './styled';

const Profile: FC = () => {
  return (
    <ST.ProfileWrapper>
      <ProfileSidebar />
      <ProfileContent />
    </ST.ProfileWrapper>
  );
};

export { Profile };
