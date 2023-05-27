import { FC, useState } from 'react';

import { useFormik } from 'formik';

import { useAuth } from '@src/providers/AuthProvider';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ST from '../../styled';

type LoginFormType = {
  toggleRegistration: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoginForm: FC<LoginFormType> = ({ toggleRegistration }) => {
  const { login } = useAuth();
  const [isPassword, setIsPassword] = useState(true);
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <ST.AuthForm onSubmit={loginForm.handleSubmit}>
      <ST.ControlWrapper>
        <Input
          inputLabel="электронная почта"
          placeholder="example@gmail.com"
          id="email"
          onChange={loginForm.handleChange}
          value={loginForm.values.email}
        />
        <Input
          inputLabel="пароль"
          placeholder="********"
          type={isPassword ? 'password' : 'text'}
          icon={
            isPassword ? (
              <ST.EyeIconStyled onClick={() => setIsPassword(false)} />
            ) : (
              <ST.EyeCloseIconStyled onClick={() => setIsPassword(true)} />
            )
          }
          id="password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
        />
      </ST.ControlWrapper>
      <ST.ControlWrapper>
        <Button
          type="submit"
          text="войти"
          decoration="filled"
        />
        <Button
          onClick={toggleRegistration}
          text="ещё не зарегистрированы?"
          decoration="underlined"
          type="button"
        />
      </ST.ControlWrapper>
    </ST.AuthForm>
  );
};

export { LoginForm };
