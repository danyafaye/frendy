import { FC, useState } from 'react';

import { useFormik } from 'formik';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ST from './styled';

const Auth: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [type, setType] = useState('password');
  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <ST.AuthPageWrapper>
      {isRegistration === false ? (
        <ST.AuthForm onSubmit={formik.handleSubmit}>
          <ST.ControlWrapper>
            <Input
              inputLabel="электронная почта"
              placeholder="example@gmail.com"
            />
            <Input
              inputLabel="пароль"
              placeholder="********"
              type={type}
              icon={
                type === 'password' ? (
                  <ST.EyeIconStyled onClick={togglePassInput} />
                ) : (
                  <ST.EyeCloseIconStyled onClick={togglePassInput} />
                )
              }
            />
          </ST.ControlWrapper>
          <ST.ControlWrapper>
            <Button
              type="submit"
              text="войти"
              decoration="filled"
            />
            <Button
              onClick={() => setIsRegistration(true)}
              text="ещё не зарегистрированы?"
              decoration="underlined"
            />
          </ST.ControlWrapper>
        </ST.AuthForm>
      ) : (
        <ST.AuthForm onSubmit={formik.handleSubmit}>
          <ST.ControlWrapper>
            <Input
              inputLabel="имя"
              placeholder="Александр"
            />
            <Input
              inputLabel="фамилия"
              placeholder="Александров"
            />
            <Input
              inputLabel="электронная почта"
              placeholder="example@gmail.com"
            />
            <Input
              inputLabel="пароль"
              placeholder="********"
              type={type}
              icon={
                type === 'password' ? (
                  <ST.EyeIconStyled onClick={togglePassInput} />
                ) : (
                  <ST.EyeCloseIconStyled onClick={togglePassInput} />
                )
              }
            />
          </ST.ControlWrapper>
          <ST.ControlWrapper>
            <Button
              type="submit"
              text="зарегистрироваться"
              decoration="filled"
            />
            <Button
              onClick={() => setIsRegistration(false)}
              text="вернуться ко входу"
              decoration="underlined"
            />
          </ST.ControlWrapper>
        </ST.AuthForm>
      )}
    </ST.AuthPageWrapper>
  );
};

export { Auth };
