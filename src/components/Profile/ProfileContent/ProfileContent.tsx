import { FC } from 'react';

import { MiniProfile } from '@components/Profile/ProfileContent/MiniProfile';
import { Posts } from '@components/Profile/ProfileContent/Posts';

import * as ST from '../styled';

const ProfileContent: FC = () => {
  return (
    <ST.ProfileContentBlock>
      <ST.ProfileContentLeft>
        <Posts />
      </ST.ProfileContentLeft>
      <ST.ProfileContentRight>
        <MiniProfile />
      </ST.ProfileContentRight>
    </ST.ProfileContentBlock>
  );
};

export { ProfileContent };
