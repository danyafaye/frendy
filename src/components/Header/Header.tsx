import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '@src/links';

import { Button } from '@components/Button';

import FrendyLogo from '@assets/icons/frendy-logo.png';

import * as ST from './styled';

const Header: FC = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(LINKS.home);
  };

  const loginHandler = () => {
    //TODO: async await function или rtk query mutation hook сюда всуну но скорее второе а может пойду через контекст
  };

  return (
    <ST.HeaderWrapper>
      <ST.Logo
        src={FrendyLogo}
        alt="Frendy Логотип"
        onClick={navigateToHome}
      />
      <ST.HeaderButtons>
        <Button
          text="войти"
          onClick={loginHandler}
        />
      </ST.HeaderButtons>
    </ST.HeaderWrapper>
  );
};

export { Header };
