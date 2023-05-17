import { FC, ReactNode } from 'react';

import * as ST from './styled';

type SidebarItemProps = {
  icon?: ReactNode;
  text: string;
};

const SidebarItem: FC<SidebarItemProps> = ({ text, icon }) => {
  return (
    <ST.SidebarItemWrapper>
      {icon}
      {text}
    </ST.SidebarItemWrapper>
  );
};

export { SidebarItem };
