import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { LINKS } from '@src/links';

import { SidebarItem } from '@components/Profile/ProfileSidebar/SidebarItem';
import { sidebarTabs } from '@components/Profile/data/sidebarTabs';

import * as ST from '../styled';

const ProfileSidebar: FC = () => {
  const location = useLocation();

  return (
    <ST.ProfileSidebarBlock
      variants={{
        hidden:
          location.pathname !== LINKS.settings ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 },
        visible:
          location.pathname !== LINKS.settings
            ? { opacity: 1, x: 0, transition: { duration: 0.3 } }
            : { opacity: 1, x: 0 },
      }}
      key="PROFILE_SIDEBAR"
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
