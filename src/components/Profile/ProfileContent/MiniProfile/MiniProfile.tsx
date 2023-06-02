import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';

import { LINKS } from '@src/links';
import { MiniProfilePostsProps } from '@src/@types/profile';

import { useCreateDialogsMutation } from '@api/DialogsApi/DialogsApi';

import { useToast } from '@hooks/useToast';

import { Button } from '@components/Button';

import AvatarTemplate from '@assets/profile_template.png';

import * as ST from '../../styled';

const MiniProfile: FC<MiniProfilePostsProps> = ({ userInfo, otherUserId }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState<string>('');

  const [createDialogs] = useCreateDialogsMutation();

  const navigateToSettings = () => {
    navigate(LINKS.settings);
  };

  const openModal = () => {
    setVisible(true);
  };

  const onDialogCreateHandler = async () => {
    try {
      const res = await createDialogs({ text, userId: userInfo.id });
      if ('error' in res) {
        toast.error(res.error);
      } else {
        toast.success({ text: 'Сообщение отправлено!' });
        navigate(`${LINKS.dialogs}?id=${res.data.id}`);
      }
    } catch (e) {
      throw e;
    }
  };

  const dialogHeaderContent = () => {
    return (
      <ST.DialogHeader>
        {userInfo.avatar ? (
          <ST.AvatarHeader src={userInfo.avatar} />
        ) : (
          <ST.AvatarHeader src={AvatarTemplate} />
        )}
        <ST.ProfileUserNameWrapper>
          <ST.ProfileUserName>
            {userInfo.firstName} {userInfo.lastName}
          </ST.ProfileUserName>
        </ST.ProfileUserNameWrapper>
      </ST.DialogHeader>
    );
  };

  return (
    <>
      <ST.AvatarWrapper>
        {userInfo.avatar ? (
          <ST.AvatarStyled src={userInfo.avatar} />
        ) : (
          <ST.AvatarStyled src={AvatarTemplate} />
        )}
      </ST.AvatarWrapper>
      <ST.ProfileContentInnerWrapper>
        <ST.ProfileUserNameWrapper>
          <ST.ProfileUserName>{userInfo.firstName}</ST.ProfileUserName>
          <ST.ProfileUserName>{userInfo.lastName}</ST.ProfileUserName>
        </ST.ProfileUserNameWrapper>
        {otherUserId ? (
          <Button
            text="Написать сообщение"
            decoration="filled"
            size="sm"
            onClick={openModal}
          />
        ) : (
          <Button
            text="Редактировать профиль"
            decoration="filled"
            size="sm"
            onClick={navigateToSettings}
          />
        )}
        <Dialog
          header={dialogHeaderContent}
          visible={visible}
          style={{ width: '20vw' }}
          onHide={() => setVisible(false)}
        >
          <ST.DialogWrapper>
            <ST.PostsTextArea
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              placeholder="Тут обычно пишется приветствие, но вы можете написать что угодно"
            />
            <Button
              text="Отправить"
              onClick={onDialogCreateHandler}
              autoFocus
              decoration="filled"
              size="sm"
            />
          </ST.DialogWrapper>
        </Dialog>
      </ST.ProfileContentInnerWrapper>
    </>
  );
};

export { MiniProfile };
