import { FC } from 'react';

import { MiniProfile } from '@components/Profile/ProfileContent/MiniProfile';
import { Posts } from '@components/Profile/ProfileContent/Posts';

import * as ST from '../styled';

const ProfileContent: FC = () => {
  return (
    <ST.ProfileContentBlock
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <ST.ProfileContentLeft
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
      >
        <Posts />
      </ST.ProfileContentLeft>
      <ST.ProfileContentRight
        variants={{
          hidden: { opacity: 0, x: +20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        }}
      >
        <MiniProfile />
      </ST.ProfileContentRight>
    </ST.ProfileContentBlock>
  );
};

export { ProfileContent };
