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
    <ST.SettingsWrapper
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{
        hidden: { opacity: 0, x: +20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      }}
      key="SETTINGS_WRAPPER"
    >
      <ST.SettingsTitle>Информация о пользователе</ST.SettingsTitle>
      <ST.SettingsBlockWrapper>
        <ST.SettingsBlock>
          <div>Электронная почта: {userInfo.email}</div>
          <div>
            {`Зарегистрирован: ${registrationDate.toLocaleDateString()} / ${registrationDate
              .toLocaleTimeString()
              .slice(0, 5)} (На сайте уже: ${diff()} дня)`}
          </div>
          <div>
            {`Последнее обновление профиля: ${updateDate.toLocaleDateString()} / ${updateDate
              .toLocaleTimeString()
              .slice(0, 5)}`}
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
        <Avatar />
      </ST.SettingsBlock>
    </ST.SettingsWrapper>
  );
};

export { Settings };
