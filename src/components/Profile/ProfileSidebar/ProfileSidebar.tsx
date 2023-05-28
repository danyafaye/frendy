import { FC } from 'react';

import { SidebarItem } from '@components/Profile/ProfileSidebar/SidebarItem';
import { sidebarTabs } from '@components/Profile/data/sidebarTabs';

import * as ST from '../styled';

const ProfileSidebar: FC = () => {
  return (
    <ST.ProfileSidebarBlock
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      }}
    >
      {sidebarTabs.map((tab) => {
        return (
          <SidebarItem
            key={tab.link}
            text={tab.text}
            icon={tab.icon}
            link={tab.link}
            style={tab.style}
          />
        );
      })}
    </ST.ProfileSidebarBlock>
  );
};

export { ProfileSidebar };
