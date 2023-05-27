import { FC, useState } from 'react';

import { LoginForm } from '@components/Auth/Forms/LoginForm';
import { RegistrationForm } from '@components/Auth/Forms/RegistrationForm';

import * as ST from './styled';

const Auth: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  return (
    <ST.AuthPageWrapper
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      {!isRegistration ? (
        <LoginForm toggleRegistration={() => setIsRegistration(!isRegistration)} />
      ) : (
        <RegistrationForm toggleRegistration={() => setIsRegistration(!isRegistration)} />
      )}
    </ST.AuthPageWrapper>
  );
};

export { Auth };
