import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@src/providers/AuthProvider/AuthContext';
import { AUTH_REFRESH_TOKEN, AUTH_TOKEN } from '@src/constants/common';
import { LINKS } from '@src/links';
import { ErrorType } from '@src/@types/common';

import { useLoginMutation, useRegisterMutation } from '@api/AuthApi/AuthApi';
import { UsersDTO } from '@api/UsersApi';
import { useLazyGetPersonalInfoQuery } from '@api/UsersApi/UsersApi';

import { useToast } from '@hooks/useToast';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<UsersDTO>({
    avatar: '',
    createdAt: '',
    firstName: '',
    id: '',
    isConfirmedEmail: false,
    lastName: '',
    updatedAt: '',
    email: '',
  });

  const toast = useToast();

  const navigate = useNavigate();

  const [loginRequest] = useLoginMutation();
  const [registerRequest] = useRegisterMutation();
  const [getPersonalInfo] = useLazyGetPersonalInfoQuery();

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await loginRequest({ email, password });

      if ('data' in res) {
        localStorage.setItem(AUTH_TOKEN, res.data.accessToken);
        localStorage.setItem(AUTH_REFRESH_TOKEN, res.data.refreshToken);
        await getProfile();
        setIsAuth(true);
        navigate(LINKS.profile);
        toast.success({ text: 'Авторизация прошла успешно!' });
      } else {
        throw res.error;
      }
    },
    [loginRequest],
  );

  const registration = useCallback(
    async (email: string, firstName: string, lastName: string, password: string) => {
      const res = await registerRequest({
        email,
        password,
        firstName,
        lastName,
      });

      if ('data' in res) {
        localStorage.setItem(AUTH_TOKEN, res.data.accessToken);
        localStorage.setItem(AUTH_REFRESH_TOKEN, res.data.refreshToken);
        await getProfile();
        setIsAuth(true);
        navigate(LINKS.profile);
        toast.success({ text: 'Регистрация прошла успешно!' });
      } else {
        throw res.error;
      }
    },
    [registerRequest],
  );

  const logout = () => {
    try {
      setIsLoading(true);
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_REFRESH_TOKEN);
      setIsAuth(false);
      navigate(LINKS.auth);
      toast.success({ text: 'Выход прошел успешно!' });
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const res = await getPersonalInfo();
      if ('data' in res) {
        setUserInfo(res.data as UsersDTO);
      } else {
        toast.error({ text: (res.error as unknown as ErrorType).data.message });
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    if (accessToken) {
      setIsAuth(true);
      getProfile();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        login,
        registration,
        logout,
        userInfo,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
