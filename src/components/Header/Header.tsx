import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LINKS } from '@src/links';
import { useAuth } from '@src/providers/AuthProvider';

import { Button } from '@components/Button';

import FrendyLogo from '@assets/icons/frendy-logo.png';
import HeaderTemplate from '@assets/header_template.png';

import * as ST from './styled';

const Header: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuth, userInfo } = useAuth();

  const navigateToHome = () => {
    navigate(LINKS.home);
  };

  const loginHandler = () => {
    navigate(LINKS.auth);
  };

  const profileHandler = () => {
    navigate(LINKS.profile);
  };

  return (
    <ST.HeaderWrapper>
      <ST.Logo
        src={FrendyLogo}
        alt="Frendy Логотип"
        onClick={navigateToHome}
      />
      <ST.HeaderButtons>
        {isAuth ? (
          <ST.HeaderIconWrapper onClick={profileHandler}>
            {userInfo.firstName}
            {userInfo.avatar ? (
              <ST.HeaderAvatar src={userInfo.avatar} />
            ) : (
              <ST.HeaderAvatar src={HeaderTemplate} />
            )}
          </ST.HeaderIconWrapper>
        ) : (
          pathname !== '/auth' && (
            <Button
              text="Вход"
              onClick={loginHandler}
              size="md"
            />
          )
        )}
      </ST.HeaderButtons>
    </ST.HeaderWrapper>
  );
};

export { Header };
