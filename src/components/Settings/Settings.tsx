import { FC, ReactNode } from 'react';

import { useAuth } from '@src/providers/AuthProvider';

import { PersonalForm } from '@components/Settings/Forms/PersonalForm';
import { ChangePassForm } from '@components/Settings/Forms/ChangePassForm';
import { Avatar } from '@components/Avatar';

import * as ST from './styled';

const Settings: FC = () => {
  const { userInfo } = useAuth();

  const registrationDate = new Date(userInfo.createdAt);
  const updateDate = new Date(userInfo.updatedAt);

  const diff = () => {
    const now = new Date();
    const timeDiff = Math.abs(now.getTime() - registrationDate.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) as ReactNode;
  };

  return (
    <ST.SettingsWrapper key="SETTINGS_WRAPPER">
      <ST.SettingsTitle>Информация о пользователе</ST.SettingsTitle>
      <ST.SettingsBlockWrapper>
        <ST.SettingsBlock>
          <div>Электронная почта: {userInfo.email}</div>
          <div>
            {`Зарегистрирован: ${registrationDate.toLocaleDateString()} / ${registrationDate
              .toLocaleTimeString()
              .slice(0, -3)} (На сайте уже: ${diff()} д.)`}
          </div>
          <div>
            {`Последнее обновление профиля: ${updateDate.toLocaleDateString()} / ${updateDate
              .toLocaleTimeString()
              .slice(0, -3)}`}
          </div>
        </ST.SettingsBlock>
      </ST.SettingsBlockWrapper>
      <ST.SettingsTitle>Редактирование информации</ST.SettingsTitle>
      <ST.SettingsBlockWrapper>
        <ST.SettingsBlock>
          <PersonalForm />
        </ST.SettingsBlock>
        <ST.SettingsBlock>
          <ChangePassForm />
        </ST.SettingsBlock>
      </ST.SettingsBlockWrapper>
      <ST.SettingsBlock>
        <ST.HelpingBlock>
          <ST.HelpingBlockTitle>Инструкция к использованию</ST.HelpingBlockTitle>
          <ST.HelpingBlockContent>
            <ST.HelpingBlockList>
              <ST.HelpingBlockListItem>
                Чтобы увидеть в левом окне свой аватар, загрузите свою 3D модель нажатием на кнопку
                Загрузить. Поддерживается любой формат 3D моделей.
              </ST.HelpingBlockListItem>
              <ST.HelpingBlockListItem>
                В левом окне вы можете отредактировать положение вашей модели чтобы потом сделать из
                нее аватар для профиля. Управление: лкм отвечает за поворот вокруг камеры по осям
                xyz, пкм за поворот по xy, колесо за отдаление/приближение камеры.
              </ST.HelpingBlockListItem>
              <ST.HelpingBlockListItem>
                Далее, отредактировав положение необходимо нажать на кнопку Фото 3D-аватара, для
                того, чтобы загрузить изображение вашей модели на сервер.
              </ST.HelpingBlockListItem>
            </ST.HelpingBlockList>
            <ST.HelpingBlockWelcome>
              Добро пожаловать в frendy, мир 3D-аватаров! Желаем вам приятного времяпрепровождения
              на нашем дружелюбном сайте!
            </ST.HelpingBlockWelcome>
          </ST.HelpingBlockContent>
        </ST.HelpingBlock>
        <Avatar />
      </ST.SettingsBlock>
    </ST.SettingsWrapper>
  );
};

export { Settings };
