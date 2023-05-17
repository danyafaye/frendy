import { FC } from 'react';

import { SidebarItem } from '@components/Profile/ProfileSidebar/SidebarItem';
import { sidebarTabs } from '@components/Profile/data/sidebarTabs';

import * as ST from '../styled';

const ProfileSidebar: FC = () => {
  return (
    <ST.ProfileSidebarBlock>
      {sidebarTabs.map((tab) => {
        return (
          <SidebarItem
            key={tab.link}
            text={tab.text}
            icon={tab.icon}
          />
        );
      })}
    </ST.ProfileSidebarBlock>
  );
};

export { ProfileSidebar };
