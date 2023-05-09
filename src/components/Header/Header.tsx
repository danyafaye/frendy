import { FC } from 'react';

import { Button } from '@components/Button';

import FrendyLogo from '@assets/icons/frendy-logo.png';

import * as ST from './styled';

const Header: FC = () => {
  const loginHandler = () => {
    //TODO: async await function или rtk query mutation hook сюда всуну но скорее второе а может пойду через контекст
  };

  const registerHandler = () => {
    //TODO: async await function или rtk query mutation hook сюда всуну но скорее второе а может пойду через контекст
  };

  return (
    <ST.HeaderWrapper>
      <ST.Logo
        src={FrendyLogo}
        alt="Frendy Логотип"
      />
      <ST.HeaderButtons>
        <Button
          text="войти"
          onClick={loginHandler}
        />
        <Button
          text="регистрация"
          onClick={registerHandler}
        />
      </ST.HeaderButtons>
    </ST.HeaderWrapper>
  );
};

export { Header };
