import { FC, useState } from 'react';

import { useFormik } from 'formik';

import { useAuth } from '@src/providers/AuthProvider';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ST from '../../styled';

type RegistrationFormType = {
  toggleRegistration: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const RegistrationForm: FC<RegistrationFormType> = ({ toggleRegistration }) => {
  const { registration } = useAuth();
  const [isPassword, setIsPassword] = useState(true);

  const registrationForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      registration(values.email, values.firstName, values.lastName, values.password);
    },
  });
  return (
    <ST.AuthForm onSubmit={registrationForm.handleSubmit}>
      <ST.ControlWrapper>
        <Input
          inputLabel="имя"
          placeholder="Александр"
          id="firstName"
          onChange={registrationForm.handleChange}
          value={registrationForm.values.firstName}
        />
        <Input
          inputLabel="фамилия"
          placeholder="Александров"
          id="lastName"
          onChange={registrationForm.handleChange}
          value={registrationForm.values.lastName}
        />
        <Input
          inputLabel="электронная почта"
          placeholder="example@gmail.com"
          id="email"
          onChange={registrationForm.handleChange}
          value={registrationForm.values.email}
        />
        <Input
          inputLabel="пароль"
          placeholder="********"
          id="password"
          type={isPassword ? 'password' : 'text'}
          icon={
            isPassword ? (
              <ST.EyeIconStyled onClick={() => setIsPassword(false)} />
            ) : (
              <ST.EyeCloseIconStyled onClick={() => setIsPassword(true)} />
            )
          }
          onChange={registrationForm.handleChange}
          value={registrationForm.values.password}
        />
      </ST.ControlWrapper>
      <ST.ControlWrapper>
        <Button
          type="submit"
          text="зарегистрироваться"
          decoration="filled"
        />
        <Button
          onClick={toggleRegistration}
          text="вернуться ко входу"
          decoration="underlined"
          type="button"
        />
      </ST.ControlWrapper>
    </ST.AuthForm>
  );
};

export { RegistrationForm };