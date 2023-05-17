import { ReactNode } from 'react';

import { LINKS } from '@src/links';

import { ReactComponent as DialogsIcon } from '@assets/icons/dialogs.svg';
import { ReactComponent as ProfileIcon } from '@assets/icons/profile_icon.svg';
import { ReactComponent as NewsIcon } from '@assets/icons/newsicon.svg';

type sidebarTabsType = {
  text: string;
  icon: ReactNode;
  link: string;
}[];

export const sidebarTabs: sidebarTabsType = [
  {
    text: 'Профиль',
    icon: <ProfileIcon />,
    link: LINKS.main,
  },
  {
    text: 'Диалоги',
    icon: <DialogsIcon />,
    link: LINKS.main,
  },
  {
    text: 'Новости',
    icon: <NewsIcon />,
    link: LINKS.main,
  },
];
