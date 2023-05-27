import { FC } from 'react';

import { useFormik } from 'formik';

import { useAuth } from '@src/providers/AuthProvider';

import { useChangeUserPersonalInfoMutation } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ST from '../../styled';

const PersonalForm: FC = () => {
  const { userInfo, getProfile } = useAuth();
  const [changeUserInfo] = useChangeUserPersonalInfoMutation();

  const toast = useToast();

  const personalInfoForm = useFormik({
    initialValues: {
      name: userInfo.firstName,
      surname: userInfo.lastName,
    },
    onSubmit: (values) => {
      try {
        const { name, surname } = values;
        changeUserInfo({ firstName: name, lastName: surname });
        toast.success({ text: 'Информация успешно изменена' });
        getProfile();
      } catch (e) {
        throw e;
      }
    },
  });
  return (
    <ST.EditForm onSubmit={personalInfoForm.handleSubmit}>
      <Input
        inputLabel="Имя"
        id="name"
        onChange={personalInfoForm.handleChange}
        value={personalInfoForm.values.name}
      />
      <Input
        inputLabel="Фамилия"
        id="surname"
        onChange={personalInfoForm.handleChange}
        value={personalInfoForm.values.surname}
      />
      <Button
        type="submit"
        text="Редактировать"
        decoration="filled"
        size="md"
      />
    </ST.EditForm>
  );
};

export { PersonalForm };
