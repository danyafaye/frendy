import { FC } from 'react';

import { useFormik } from 'formik';

import { useAuth } from '@src/providers/AuthProvider';

import { useChangeUserPersonalInfoMutation } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { handleFormError } from '@utils/handleFormError';

import * as ST from '../../styled';

const PersonalForm: FC = () => {
  const { userInfo, updateUserInfoField } = useAuth();
  const [changeUserInfo] = useChangeUserPersonalInfoMutation();

  const toast = useToast();

  const personalInfoForm = useFormik({
    initialValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    },
    onSubmit: async (values) => {
      try {
        const { firstName, lastName } = values;
        const res = await changeUserInfo({ firstName, lastName });
        if ('error' in res) {
          handleFormError(res.error, personalInfoForm);
        } else {
          toast.success({ text: 'Информация успешно изменена' });
          updateUserInfoField('firstName', firstName);
          updateUserInfoField('lastName', lastName);
        }
      } catch (e) {
        throw e;
      }
    },
  });

  return (
    <ST.EditForm onSubmit={personalInfoForm.handleSubmit}>
      <Input
        inputLabel="Имя"
        name="firstName"
        onChange={personalInfoForm.handleChange}
        value={personalInfoForm.values.firstName}
        error={Boolean(personalInfoForm.errors.firstName)}
      />
      {personalInfoForm.errors && (
        <div style={{ color: 'red' }}>{personalInfoForm.errors.firstName}</div>
      )}
      <Input
        inputLabel="Фамилия"
        name="lastName"
        onChange={personalInfoForm.handleChange}
        value={personalInfoForm.values.lastName}
        error={Boolean(personalInfoForm.errors.lastName)}
      />
      {personalInfoForm.errors && (
        <div style={{ color: 'red' }}>{personalInfoForm.errors.lastName}</div>
      )}
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
