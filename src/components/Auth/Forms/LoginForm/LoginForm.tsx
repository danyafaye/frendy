import { FC, useState } from 'react';

import { useFormik } from 'formik';

import { useAuth } from '@src/providers/AuthProvider';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { handleFormError } from '@utils/handleFormError';

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
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
      } catch (e) {
        handleFormError(e, loginForm);
      }
    },
  });

  return (
    <ST.AuthForm
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      onSubmit={loginForm.handleSubmit}
    >
      <ST.ControlWrapper>
        <div>
          <Input
            inputLabel="электронная почта"
            placeholder="example@gmail.com"
            name="email"
            onChange={loginForm.handleChange}
            value={loginForm.values.email}
          />
          {loginForm.errors && loginForm.errors.email}
        </div>
        <div>
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
            name="password"
            onChange={loginForm.handleChange}
            value={loginForm.values.password}
          />
          {loginForm.errors && loginForm.errors.password}
        </div>
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
