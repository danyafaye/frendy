import { FC, useState } from 'react';

import { useFormik } from 'formik';

import { useChangeUserPasswordMutation } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { handleFormError } from '@utils/handleFormError';

import * as ST from '../../styled';

const ChangePassForm: FC = () => {
  const [isPassword, setIsPassword] = useState(true);

  const [changePassword] = useChangeUserPasswordMutation();

  const toast = useToast();

  const changePassForm = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    onSubmit: async (values) => {
      try {
        const { password, newPassword } = values;
        const res = await changePassword({ password, newPassword });
        if ('error' in res) {
          handleFormError(res.error, changePassForm);
        } else {
          toast.success({ text: 'Пароль успешно изменен!' });
        }
      } catch (e) {
        throw e;
      }
    },
  });

  return (
    <ST.EditForm onSubmit={changePassForm.handleSubmit}>
      <Input
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
        name="password"
        onChange={changePassForm.handleChange}
        value={changePassForm.values.password}
        error={Boolean(changePassForm.errors.password)}
      />
      {changePassForm.errors && (
        <div style={{ color: 'red' }}>{changePassForm.errors.password}</div>
      )}
      <Input
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
        name="newPassword"
        onChange={changePassForm.handleChange}
        value={changePassForm.values.newPassword}
        error={Boolean(changePassForm.errors.newPassword)}
      />
      {changePassForm.errors && (
        <div style={{ color: 'red' }}>{changePassForm.errors.newPassword}</div>
      )}
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
