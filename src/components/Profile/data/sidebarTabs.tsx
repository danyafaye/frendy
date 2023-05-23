import { CSSProperties, ReactNode } from 'react';

import { LINKS } from '@src/links';

import { ReactComponent as DialogsIcon } from '@assets/icons/dialogs.svg';
import { ReactComponent as ProfileIcon } from '@assets/icons/profile_icon.svg';
import { ReactComponent as SettingsIcon } from '@assets/icons/settings_icon.svg';
import { ReactComponent as LogoutIcon } from '@assets/icons/logouticon.svg';

type sidebarTabsType = {
  text: string;
  icon: ReactNode;
  link: string;
  style: CSSProperties;
}[];

export const sidebarTabs: sidebarTabsType = [
  {
    text: 'Профиль',
    icon: <ProfileIcon />,
    link: LINKS.profile,
    style: {},
  },
  {
    text: 'Диалоги',
    icon: <DialogsIcon />,
    link: LINKS.dialogs,
    style: {},
  },
  {
    text: 'Настройки',
    icon: <SettingsIcon />,
    link: LINKS.settings,
    style: {},
  },
  {
    text: 'Выйти',
    icon: <LogoutIcon />,
    link: '',
    style: { color: 'red', fill: 'red' },
  },
];
