import { CSSProperties, FC, ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as ST from './styled';

type SidebarItemProps = {
  icon?: ReactNode;
  text: string;
  link: string;
  style: CSSProperties;
};

const SidebarItem: FC<SidebarItemProps> = ({ text, icon, link, style }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPage = () => {
    navigate(link);
  };

  useEffect(() => {
    if (location.pathname === link) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  return (
    <ST.SidebarItemWrapper
      isActive={isActive}
      onClick={navigateToPage}
      style={style}
    >
      {icon}
      {text}
    </ST.SidebarItemWrapper>
  );
};

export { SidebarItem };
export type { SidebarItemProps };
