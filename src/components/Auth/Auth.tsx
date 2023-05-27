import { FC, useState } from 'react';

import { LoginForm } from '@components/Auth/Forms/LoginForm';
import { RegistrationForm } from '@components/Auth/Forms/RegistrationForm';

import * as ST from './styled';

const Auth: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  const toggleRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRegistration(!isRegistration);
  };

  return (
    <ST.AuthPageWrapper>
      {!isRegistration ? (
        <LoginForm toggleRegistration={toggleRegistration} />
      ) : (
        <RegistrationForm toggleRegistration={toggleRegistration} />
      )}
    </ST.AuthPageWrapper>
  );
};

export { Auth };
