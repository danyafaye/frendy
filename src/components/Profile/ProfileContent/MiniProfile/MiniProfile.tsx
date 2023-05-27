import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '@src/links';
import { useAuth } from '@src/providers/AuthProvider';

import { Button } from '@components/Button';

import AvatarTemplate from '@assets/profile_template.png';

import * as ST from '../../styled';

const MiniProfile: FC = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate(LINKS.settings);
  };

  return (
    <>
      {userInfo.avatar ? (
        <ST.AvatarStyled src={userInfo.avatar} />
      ) : (
        <ST.AvatarStyled src={AvatarTemplate} />
      )}
      <ST.ProfileContentInnerWrapper>
        <ST.ProfileUserNameWrapper>
          <ST.ProfileUserName>{userInfo.firstName}</ST.ProfileUserName>
          <ST.ProfileUserName>{userInfo.lastName}</ST.ProfileUserName>
        </ST.ProfileUserNameWrapper>
        <Button
          text="Редактировать профиль"
          decoration="filled"
          size="sm"
          onClick={navigateToSettings}
        />
      </ST.ProfileContentInnerWrapper>
    </>
  );
};

export { MiniProfile };
