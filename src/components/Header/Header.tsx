import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '@src/links';
import { useAuth } from '@src/providers/AuthProvider';

import { Button } from '@components/Button';

import FrendyLogo from '@assets/icons/frendy-logo.png';
import { ReactComponent as ProfileIcon } from '@assets/icons/profile_header_icon.svg';

import * as ST from './styled';

const Header: FC = () => {
  const navigate = useNavigate();
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
            <ProfileIcon width="32px" />
          </ST.HeaderIconWrapper>
        ) : (
          <Button
            text="войти"
            onClick={loginHandler}
          />
        )}
      </ST.HeaderButtons>
    </ST.HeaderWrapper>
  );
};

export { Header };
