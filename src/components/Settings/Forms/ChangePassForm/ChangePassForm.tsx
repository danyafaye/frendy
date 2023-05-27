import { FC, useState } from 'react';

import { useFormik } from 'formik';

import { useChangeUserPasswordMutation } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ST from '../../styled';

const ChangePassForm: FC = () => {
  const [isPassword, setIsPassword] = useState(true);

  const [changePassword] = useChangeUserPasswordMutation();

  const toast = useToast();

  const changePassForm = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    onSubmit: (values) => {
      try {
        const { oldPassword, newPassword } = values;
        changePassword({ password: oldPassword, newPassword: newPassword });
        toast.success({ text: 'Пароль успешно изменен!' });
      } catch (e) {
        throw e;
      }
    },
  });

  return (
    <ST.EditForm onSubmit={changePassForm.handleSubmit}>
      <Input
        required
        inputLabel="Текущий пароль"
        placeholder="********"
        type={isPassword ? 'password' : 'text'}
        icon={
          isPassword ? (
            <ST.EyeIconStyled onClick={() => setIsPassword(false)} />
          ) : (
            <ST.EyeCloseIconStyled onClick={() => setIsPassword(true)} />
          )
        }
        id="oldPassword"
        onChange={changePassForm.handleChange}
        value={changePassForm.values.oldPassword}
      />
      <Input
        required
        inputLabel="Новый пароль"
        placeholder="********"
        type={isPassword ? 'password' : 'text'}
        icon={
          isPassword ? (
            <ST.EyeIconStyled onClick={() => setIsPassword(false)} />
          ) : (
            <ST.EyeCloseIconStyled onClick={() => setIsPassword(true)} />
          )
        }
        id="newPassword"
        onChange={changePassForm.handleChange}
        value={changePassForm.values.newPassword}
      />
      <Button
        type="submit"
        text="Применить"
        decoration="filled"
        size="md"
      />
    </ST.EditForm>
  );
};

export { ChangePassForm };
